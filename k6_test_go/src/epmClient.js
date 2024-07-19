/* 
Title : EPM Client
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Simulação de um senhasegura EPM, credenciais e políticas
Options : 
*/

// Bibliotecas do k6 
import http from 'k6/http';
import { check } from 'k6';

// Configuração do K6
export let options = {
    scenarios: {
        unique_vus_each_iteration: {
            executor: 'per-vu-iterations',
            vus: 2,
            iterations: 1,
            maxDuration: '20m',
        },
    },
};

// Definição de variável
const BASE_URL = 'https://10.66.39.55';

/* 
Função getAllCredentials()

Função utilizada para obter a(s) credencial(is) de acesso
*/
function getAllCredentials(domain, username, accessToken) {
    // URL da requisição
    let credentialsUrl = `${BASE_URL}/api/client-manager/vault/credentials`;

    // Corpo da Requisição
    let credentialsPayload = JSON.stringify({
        "action": "getAllCredencials",
        "domain": domain,
        "username": username
    });

    // Cabeçalho da Requisição
    let credentialsParams = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    // Envio da requisição para obter a(s) credencial(is) de acesso
    let res = http.post(credentialsUrl, credentialsPayload, credentialsParams);

    // Verificando a resposta da requisição
    check(res, {
        'getAllCredentials - is status 200': (r) => r.status === 200,
    });

    // Verifica a(s) credencial(is) de acesso retornada(s)
    let credentials;
    try {
        credentials = JSON.parse(res.body);
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter as credenciais:", error.message);
        return;
    }

    // Retorna para a função Default() com a(s) credencial(is)
    return credentials;
}

/* 
Função getAllPolicies()

Função utilizada para obter a(s) credencial(is) de acesso
*/
function getAllPolicies(domain, username, accessToken) {
    // URL da requisição
    let url = `${BASE_URL}/api/client-manager/pedm/policies`;

    // Corpo da Requisição
    let body = JSON.stringify({
        "action": "getAllPolicies",
        "domain": domain,
        "username": username,
        "client_alias": "go-windows"
    });

    // Cabeçalho da Requisição
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    // Envio da requisição para obter a(s) politica(s) de acesso
    let res = http.post(url, body, params);

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

    // Utilizado pela função getAllCredentials()
    let domain = "epmDevice";
    let username = "epmUser";

    /*
    O aplicativo ¨vaultClientToken.js" deve ser executado para
    obter o accessToken.
    */
    let accessToken = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIwYjA0YTNlMmY5NjQxNWI4ZGJiYmYzMDY1NjlmYzlmZjIyMjE0MGMyNzFhY2M3ZWRiZmI5NjI2YzMyNGU3OTkyIiwiZXhwIjoxNzIxMjQ2MzMwLCJ0b2tlbl9pZCI6MTcsImlhdCI6MTcyMTI0MjczMCwiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.osByBBwibV6Pnn-Z-AcaVAOjSmWYDBO8vT7LU1vKf42DdxoDcZXFRPh_vWUMelLUuaTBmJlbX-efxzA_8d38IGLCIMD2EjZpaB72kB8UotjgQgU3Hj_OutNlVOQhgqx19L4qvB7tjYTu83iZJdnD2wPy0CsI3voKtS5V1dMB1Yl1UN8BEo09w3s2N_3oRMFaK8QgzS5UUmm2rAQ2W5XcfQqilDKDFlRRyltMy8p2Tzx6oWTEYF2l-3j7tK1c8_syFDdfxDwKPOSxx986Qq9V5QQ7iV3G7OHTHbEEzFdZ-F3rLQaqtZRKc1fNAAKVEPOx2253JV-byuTnZrMAsHQNrA";

    // Obter credenciais
    let credentials = getAllCredentials(domain, username, accessToken);
    console.log(`credentials..: ${JSON.stringify(credentials, null, 2)}`);

    // Obter politicas
    let policies = getAllPolicies(domain, username, accessToken);
    console.log(`Politicas..: ${JSON.stringify(policies, null, 2)}`);
}

/*
k6 run k6_test_go/src/epmClient.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/epmClient.js --insecure-skip-tls-verify
*/