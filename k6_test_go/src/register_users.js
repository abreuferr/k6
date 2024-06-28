/* 
Title : Cadastrar usuários em massa
Author : "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Esse programa tem por objetivo o de cadastrar
              usuários em massa
Options : 
*/

// Importando bibliotecas do k6
import http from 'k6/http';
import { check } from 'k6';

// Definindo Usuário Virtual e Interação
export let options = {
    vus: 1,
    iterations: 1
};

// Definição de variável
const BASE_URL = 'https://10.66.39.55/api/client-manager/register';
const BOOTSTRAP_TOKEN = '018c5a0f-acb1-73e7-8994-85e0b76ff146';

/*
Função principal e realiza o registro dos usuários
*/
export default function() {
    const TotalUsers = 2081; // Número de usuários já cadastrados
    const TotalUsersRegister = 2100; // Qtdade de usuários a serem cadastrados
    const UsersParaCriar = TotalUsersRegister - TotalUsers; // Qtdade de usuários a serem cadastrados
    const UsersCriadosPorIteracao = UsersParaCriar / options.vus; // Usuários a serem criados por VU, assumindo divisão igual

    // URL da Requisição
    let registerUrl = `${BASE_URL}/register`;

    for (let i = 0; i < UsersCriadosPorIteracao; i++) { // A cada iteração será acrescentado um usuário até completar o "TotalUsersRegister"
        /* Calcula o ID do usuário incrementando a partir do total de usuários já existentes.
        Usuários são distribuídos entre os VUs. Para cada VU, o ID inicial é ajustado com base
        no número de usuários que cada VU deve criar (UsersCriadosPorIteracao). '__VU - 1' ajusta o VU para começar de 0.
        'i' garante que cada usuário criado no loop tenha um ID único. 
        '+1' garante que a contagem de IDs comece corretamente após o último usuário existente. */
        let userID = TotalUsers + ( UsersCriadosPorIteracao * (__VU - 1)) + i + 1;

        // a cada iteração altera o número no final do "User"
        let username = `User${userID}`;

        // Corpo da Requisição
        let registerPayload = JSON.stringify({
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
                "hardware_uuid": "ed01a9755d1e147b0d7e374320a92812",
                "hostname": "javascriptk6",
                "memory_info": "",
                "operational_system": "Windows 10",
                "vendor_model_info": ""
            },
            "users": [
                {
                    "domain": "testes-go-win",
                    "username": username // Variável que se altera a cada execução, e cria um User novo
                }
            ]
        });

        // Cabeçalho da Requisição
        let registerParams = {
            headers: { 
                'Content-Type': 'application/json',
                'Bootstrap-Token': BOOTSTRAP_TOKEN,
            }
        };

        // Envio da Requisição
        //let res = http.post(registerUrl, registerPayload, registerParams);
            
        // Verificando a resposta da requisição
        check(res, {
            'is status 200': (r) => r.status === 200,
        });

        // Armazena os resultados em variáveis
        let credentials = JSON.parse(res.body).credentials;
        let clientId = credentials.client_id;
        let clientSecret = credentials.client_secret;

        // Chamada da função getToken
        getToken(clientId, clientSecret);

        //console.log(`Client ID: ${clientId}, Client Secret: ${clientSecret}`);
        console.log(`Criado usuário de ID: ${userID}`);
    };
}

/*
Função utilizada para obter o Bearer Token.
*/
function getToken(client_id, client_secret) {
    // Definição de variável
    const BASE_URL = 'https://10.66.39.55/api';

    // URL da Requisição
    let tokenUrl = `${BASE_URL}/oauth2/token`;

    // Corpo da Requisição
    let tokenPayload = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    // Cabeçalho da Requisição
    let tokenParams = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    // Realização da requisição POST para obter o token de acesso
    let res = http.post(tokenUrl, tokenPayload, tokenParams);

    // Verificando se retornou o token na resposta completa
    //console.log(`Resposta do getToken: ${res.body}`);

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
    // Retorna apenas o token 
    //console.log(`Token de acesso: ${accessToken}`);
}

/*
Executar comando:

k6 run --http-debug="full" register.js --insecure-skip-tls-verify

*/