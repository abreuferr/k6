/* 
Title : Policies Request
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Faz uma requisição de acesso a(s) politica(s)
Options : 
*/

// Bibliotecas do k6 
import http from 'k6/http';
import { check } from 'k6';

// Definição de variável
const BASE_URL = 'https://10.66.39.55';
const BOOTSTRAP_TOKEN = '018c5a0f-acb1-73e7-8994-85e0b76ff146';

/*
Função getClientPolicies()

Função utilizada para obter os valores de clientID e clientSecret
*/
function getClientPolicies(clientAlias, client, device, users) {
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
Função getAccessToken()

Função utilizada para obter o valor de accessToken
*/
function getAccessToken(clientId, clientSecret) {
    // URL da requisição
    let tokenUrl = `${BASE_URL}/api/oauth2/token`;

    // Corpo da requisição
    let tokenPayload = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    // Cabeçalho da requisição
    let tokenParams = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    // Envio da requisição
    let res = http.post(tokenUrl, tokenPayload, tokenParams);

    // Verificando a resposta da requisição
    check(res, {
        'accessToken - is status 200': (r) => r.status === 200,
    });

    // Verifica o token retornado
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

    // Retorna para a função Default() com o valor de "accessToken"
    return accessToken;
}

/* 
Função getAllPolicies()

Função utilizada para obter a(s) credencial(is) de acesso
*/
function getAllPolicies(domain, username, accessToken) {
    // URL da requisição
    let policiesUrl = `${BASE_URL}/api/client-manager/pedm/policies`;

    // Corpo da Requisição
    let policiesPayload = JSON.stringify({
        "action": "getAllPolicies",
        "domain": domain,
        "username": username,
        "client_alias": "go-windows"
    });

    // Cabeçalho da Requisição
    let policiesParams = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    // Envio da requisição para obter a(s) politica(s) de acesso
    let res = http.post(policiesUrl, policiesPayload, policiesParams);

    // Verificando a resposta da requisição
    check(res, {
        'getAllPolicies - is status 200': (r) => r.status === 200,
    });

    // Verifica a(s) credencial(is) de acesso retornada(s)
    let policies;
    try {
        policies = JSON.parse(res.body);
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter as credenciais:", error.message);
        return;
    }

    // Retorna para a função Default() com a(s) credencial(is)
    return policies;
}

/* 
Função Default()

Função principal
*/
export default function () {
    //Utilizado pela função getClientCredentials()
    let clientAlias = "epm-device1-lab";
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

    // Utilizado pela função getAllPolicies()
    let domain = "epm-device-lab";
    let username = "epm-user-lab";

    // Obtém clientId e clientSecret
    let { clientId, clientSecret } = getClientPolicies(clientAlias, client, device, users);
    console.log(`clientId.....: ${clientId}`);
    console.log(`clientSecret.: ${clientSecret}`);

    // Obtém accessToken
    let accessToken = getAccessToken(clientId, clientSecret);
    console.log(`accessToken..: ${accessToken}`);

    // Obtém todas as credenciais
    let policies = getAllPolicies(domain, username, accessToken);
    console.log(`Politicas..: ${JSON.stringify(policies, null, 2)}`);
}

/*
k6 run k6_test_go/src/lab/vaultShowPolicies.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/lab/vaultShowPolicies.js --insecure-skip-tls-verify
*/