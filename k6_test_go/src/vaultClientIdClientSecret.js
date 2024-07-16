/* 
Title : Exibir clientId e clientSecret
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Como obter o clientId e o clientSecret de um senhasegura Go 
              previamente cadastrados no senhasegura Cofre.
Options : 
*/

// Bibliotecas do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Declaração de variável
const BASE_URL = 'https://192.168.1.15';
const BOOTSTRAP_TOKEN = '0190bd74-17e5-73f3-a38a-266ce3d0a411';

/* 
Função getClientCredentials()

Função utilizada para obter os valores de clientID e clientSecret
*/
function getClientCredentials(clientAlias, client, device, users) {
    // URL da requisição
    let registerUrl = `${BASE_URL}/api/client-manager/register`;

    // Corpo da requisição
    let registerPayload = JSON.stringify({
        "client_alias": clientAlias,
        "client": client,
        "device": device,
        "users": users
    });

    // Cabeçalho da requisição
    let registerParams = {
        headers: {
            'Content-Type': 'application/json',
            'Bootstrap-Token': BOOTSTRAP_TOKEN,
        },
    };

    // Envio da requisição
    let res = http.post(registerUrl, registerPayload, registerParams);

    // Verificando a resposta da requisição
    check(res, {
        'clientID and clientSecret - is status 200': (r) => r.status === 200,
        'clientId present': (r) => JSON.parse(r.body).credentials.client_id !== undefined,
        'clientSecret present': (r) => JSON.parse(r.body).credentials.client_secret !== undefined,
    });

    // Armazena os resultados em variáveis
    let responseData = JSON.parse(res.body);
    let clientId = responseData.credentials.client_id;
    let clientSecret = responseData.credentials.client_secret;

    // Retorna para a função Default() com os valores de "clientId" e "clientSecret"
    return { clientId, clientSecret };
}

/* 
Função Default()

Função principal
*/
export default function () {
    let clientAlias = "epm-device-lab";
    let client = {
        "binary_hash": "FF54F551B6E829A964310F6C7AC649A2149448C07CF9E1300D5EE9FFFD4C33F5",
        "version": "3.32.0.33",
        "client_alias": clientAlias
    };
    let device = {
        "architecture": "x86_64",
        "bios_info": "",
        "cpu_info": "",
        "domain": "epm-device-lab",
        "hardware_uuid": "5d1e6178-b0ec-4a9b-b691-10cd5639812f",
        "hostname": "epm-device-lab",
        "memory_info": "",
        "operational_system": "Windows 10",
        "vendor_model_info": "Microsoft"
    };
    let users = [
        {
            "domain": "epm-device-lab",
            "username": "epm-user-lab"
        }
    ];

    // Chama a função getClientCredentials para obter clientId e clientSecret
    let { clientId, clientSecret } = getClientCredentials(clientAlias, client, device, users);
    console.log(`clientId.....: ${clientId}`);
    console.log(`clientSecret.: ${clientSecret}`);
}

/*
k6 run k6_test_go/src/lab/vaultClientIdClientSecret.js --insecure-skip-tls-verify

k6 run --http-debug="full"  k6_test_go/src/lab/vaultClientIdClientSecret.js --insecure-skip-tls-verify
*/