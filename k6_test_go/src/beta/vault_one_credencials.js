/* 
Title : 
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : 
Options : 
*/

// Bibliotecas
import http from 'k6/http';
import { check } from 'k6';

// Função principal do teste, realiza o registro
export default function() {
    let bootstrapToken = '018c5a0f-acb1-73e7-8994-85e0b76ff146'; // Token de licença do client, obtido no cofre
    let url = 'https://10.66.39.55/api/client-manager/register'; // Endpoint
    let body = JSON.stringify({ // Contéudo do corpo para realizar o registro de dispositivo e usuário
        "client_alias": "go-windows",
        "client": {
            "binary_hash":"42cffe1e38d5444329badd26fc2a402d554abc6839de26d87f13cca72d2ea2db",
            "version": "3.32.0.24",
            "client_alias": "go-windows"
        },
        "device": {
            "architecture": "x64",
            "bios_info": "",
            "cpu_info": "",
            "domain": "senhasegura",
            "hardware_uuid": "ed01a8755d1e147b0d7e374320a92812",
            "hostname": "k6",
            "memory_info": "",
            "operational_system": "Windows 10",
            "vendor_model_info": ""
        },
        "users": [
            {
                "domain": "testes-go",
                "username": "jk6"
            }
        ]
    });
    let params = {
        headers: { // Passando o tipo de conteúdo "application/json" e o "bootstrapToken" no hearder
            'Content-Type': 'application/json',
            'Bootstrap-Token': `Bearer ${bootstrapToken}`
        }
    };

    let res = http.post(url, body, params); // Enviando a requisição para realizar o registro e armazenando na variável "res"

    // Verificando se a resposta foi ok
    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    let credentials = JSON.parse(res.body).credentials; // verificando a resposta do campo credentials e armazenando na variável "credentials"
    let client_id = credentials.client_id; // verificando a resposta do campo client_id e armazenando na variável "client_id"
    let client_secret = credentials.client_secret; // verificando a resposta do campo client_secret e armazenando na variável "client_secret"

    getToken(client_id, client_secret); // Pegando os valores das variáveis client_id e client_secret para gerar o bearer token

    console.log(`Client ID: ${client_id}, Client Secret: ${client_secret}`); // Mostrando os valores do client_id e client_secret na saída
};

// Função que irá gerar o bearer token
function getToken(client_id, client_secret) {
    let url = 'https://10.66.39.55/api/oauth2/token'; // Endpoint

    // Especificando o grant_type como credentials e passando o client_id e client_secret no body
    let body = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;

    // Definição do tipo de conteúdo, parâmetro necessário para realizar a requisição do token
    let params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };


    // Realização da requisição POST para obter o token de acesso
    let res = http.post(url, body, params);

    console.log(`Resposta do getToken: ${res.body}`); // Mostra a resposta da requisição, mostrando o token na saída 
 
    // Verificação do status da resposta
    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    // Extrai apenas o token de acesso da resposta do body
    let accessToken;
    try {
        accessToken = JSON.parse(res.body).access_token;
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter o token de acesso:", error.message);
        return;
    }

    if (!accessToken) {
        console.error("Token de acesso não encontrado na resposta.");
        return;
    }

    console.log(`Token de acesso: ${accessToken}`); // Mostra apenas o token de acesso "bearer token"
    useAccessToken(accessToken);
}

// Função para usar bearer token para realizar requisições
function useAccessToken(token) { 
    let url = 'https://10.66.39.55/api/client-manager/vault/credentials'; // Endpoint


    // Corpo da requisição, chama apenas a credencial especificada no body
    let body = JSON.stringify({
        "id": 1,
        "credential": null,
        "pageLength": 1,
        "pageNumber": 1,
        "macroId": null,
        "domain": "testes-go",
        "username": "jnascimento"
    });

    // Passa o tipo de conteúdo e o bearer token necessário para realizar a requisição
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };


    let res = http.post(url, body, params); // Realiza a requisição e armazena na varável "res"

    console.log(`Resposta da requisição: ${res.body}`); // Mostra a saída da requisição

    // Realizar uma checagem para verificar se foi bem sucedida a requisição
    check(res, {
        'is status 200': (r) => r.status === 200,
    });

}

/*
Executar comando:

k6 run --http-debug="full" vault_one_credencials.js --insecure-skip-tls-verify
*/