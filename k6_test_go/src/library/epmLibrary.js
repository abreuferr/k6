/* 
Title : EPM Library
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Biblioteca de funções utilizadas pelo simulador senhasegura EPM Client Windows
Options : 
*/

// Bibliotecas do k6 
import http from 'k6/http';
import { check } from 'k6';

/*
Função getClientIDandClientSecret()

Função utilizada para obter os valores de clientID e clientSecret.
*/
export function getClientIDandClientSecret(BASE_URL, BOOTSTRAP_TOKEN, clientAlias, client, device, users) {

    // URL da requisição
    let url = `${BASE_URL}/api/client-manager/register`;

    // Corpo da Requisição
    let body = JSON.stringify({
        "client_alias": clientAlias,
        "client": client,
        "device": device,
        "users": users
    });

    // Cabeçalho da Requisição
    let params = {
        responseTimeout: '100s',
        headers: {
            'Content-Type': 'application/json',
            'Bootstrap-Token': BOOTSTRAP_TOKEN,
        },
    };

    // Envio da requisição
    let res = http.post(url, body, params);

    check(res, {
        'clientID and clientSecret | status 200 |': (r) => r.status === 200,
        'clientId                  | present    |': (r) => JSON.parse(r.body).credentials.client_id !== undefined,
        'clientSecret              | present    |': (r) => JSON.parse(r.body).credentials.client_secret !== undefined,
    });

    let responseData = JSON.parse(res.body);
    let clientId = responseData.credentials.client_id;
    let clientSecret = responseData.credentials.client_secret;

    // Retorna para a função Default()
    return { clientId, clientSecret };
}

/* 
Função getAccessToken()

Função utilizada para obter o valor de accessToken.
*/
export function getAccessToken(BASE_URL, clientId, clientSecret) {

    // URL da requisição
    let url = `${BASE_URL}/api/oauth2/token`;

    // Corpo da Requisição
    let body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

    // Cabeçalho da Requisição
    let params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    // Envio da requisição
    let res = http.post(url, body, params);

    check(res, {
        'accessToken               | status 200 |': (r) => r.status === 200,
    });

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

    // Retorna para a função Default()
    return accessToken;
}

/* Função getUpdate()

Esta função realiza uma requisição para o cofre e verifica se há atualizações para o EPM Client.
*/
export function getUpdate(BASE_URL, client_version, accessToken) {

    // URL da requisição
    let url = `${BASE_URL}/api/client-manager/client-update`;

    // Corpo da Requisição
    let body = JSON.stringify({
        client_version: client_version 
    });

    // Cabeçalho da Requisição
    let params = {
        responseTimeout: '100s',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    // Envio da requisição
    let res = http.post(url, body, params);

    check(res, {
        'Update                    | status 204 |': (r) => r.status === 204,
    });


    let data;
    try {
        data = JSON.parse(res.body);
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter update:", error.message);
        return;
    }

    // Retorna para a função Default()
    return data;
}

/*
Função getParams()

Função utilizada para requisitar os parâmetros do sistema.
*/
export function getParams(BASE_URL, domain, username, accessToken) {

    // URL da requisição
    let url = `${BASE_URL}/api/client-manager/params`;

    // Corpo da Requisição
    let body = JSON.stringify({
        "domain": domain,
        "username": username
    });

    // Cabeçalho da Requisição
    let params = {
        responseTimeout: '100s',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    // Envio da requisição
    let res = http.post(url, body, params);

    check(res, {
        'Parâmetros                | status 200 |': (r) => r.status === 200,
    });

    let data;
    try {
        data = JSON.parse(res.body);
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter parâmetros:", error.message);
        return;
    }

    // Retorna para a função Default()
    return data;
}

/*
Função countParams()

Função conta a quantidade de parâmetros que retorna na resposta.
*/
export function countParams(params) {

    let jsonResponse = params;
    let countParams = 0;
    let listParams = [];

    if (jsonResponse.params && jsonResponse.params.hasOwnProperty('EnableModuleCredentials')) {
        countParams++;
        listParams.push("EnableModuleCredentials");
    }

    // Retorna para a função Default()
    return countParams;
}

/*
Função getSystemFileCommands()

Função utilizada para requisitar os comandos do sistema.
*/
export function getSystemFileCommands(BASE_URL, domain, username, accessToken) {

    // URL da requisição
    let url = `${BASE_URL}/api/client-manager/pedm/system-file-commands`;

    // Corpo da Requisição
    let body = JSON.stringify({
        "action": "getAllCredencials",
        "domain": domain,
        "username": username
    });

    // Cabeçalho da Requisição
    let params = {
        responseTimeout: '100s',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    // Envio da requisição
    let res = http.post(url, body, params);

    check(res, {
        'Comandos do Sistema       | status 200 |': (r) => r.status === 200,
    });

    let data;
    try {
        data = JSON.parse(res.body);
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter os comandos:", error.message);
        return;
    }

    // Retorna para a função Default()
    return data;
}

/*
Função countSystemFileCommands()

Função conta a quantidade de comandos do sistema.
*/
export function countSystemFileCommands(system_file_commands) {

    let jsonResponse = system_file_commands;
    let count = 0;
    let listSystem = [];

    if (Array.isArray(jsonResponse.system_file_commands)) {
        count = jsonResponse.system_file_commands.length;
        listSystem = jsonResponse.system_file_commands.slice(); 
    }

    // Retorna para a função Default()
    return count;
}

/* 
Função getPolicies()

Função utilizada para requisitar as políticas.
*/
export function getPolicies(BASE_URL, domain, username, accessToken) {

    // URL da requisição
    let url = `${BASE_URL}/api/client-manager/pedm/policies`;

    // Corpo da Requisição
    let body = JSON.stringify({
        "action": "getPolicies",
        "domain": domain,
        "username": username,
        "client_alias": "go-windows"
    });

    // Cabeçalho da Requisição
    let params = {
        responseTimeout: '100s',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    // Envio da requisição
    let res = http.post(url, body, params);

    check(res, {
        'Políticas                 | status 200 |': (r) => r.status === 200,
    });

    let data;
    try {
        data = JSON.parse(res.body);
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter políticas:", error.message);
        return;
    }

    // Remover dados não utilizados
    delete data.code;
    delete data.response;

    // Retorna para a função Default()
    return data;
}

/* 
Função CountPolicies()

Função utilizada para obter a quantidade de políticas.
*/
export function countPolicies(policies) {

    let jsonResponse = policies; 
    let countPolicies = 0;
    let accessList = [];
    
    if (jsonResponse.application_lists && jsonResponse.application_lists.allow_list) {
        jsonResponse.application_lists.allow_list.forEach(item => {
            if (item.rule && Array.isArray(item.rule)) {
                item.rule.forEach(policies => {
                    if (policies.criteria) {
                        countPolicies++;
                        accessList.push(policies.criteria);
                    }
                });
            }
        });
    }

    // Retorna para a função Default()
    return countPolicies;
}

/* 
Função getCredentials()

Função utilizada requisitar as credenciais.
*/
export function getCredentials(BASE_URL, domain, username, accessToken) {

    // URL da requisição
    let url = `${BASE_URL}/api/client-manager/vault/credentials`;

    // Corpo da Requisição
    let body = JSON.stringify({
        "action": "getCredentials",
        "domain": domain,
        "username": username
    });

    // Cabeçalho da Requisição
    let params = {
        responseTimeout: '100s',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    };

    // Envio da requisição
    let res = http.post(url, body, params);

    check(res, {
        'Credenciais               | status 200 |': (r) => r.status === 200,
    });

    let data;
    try {
        data = JSON.parse(res.body);
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter as credenciais:", error.message);
        return;
    }

    // Remove dados não utilizados na resposta do json.
    delete data.code;
    delete data.response;

    // Retorna para a função Default()
    return data;
}

/*
Função countCredentials()

Função utilizada para contar a quantidade de credenciais retornadas.
*/
export function countCredentials(credentials) {

    let jsonResponse = credentials;
    let count = 0;
    let usernames = [];

    // Verifica se "credentials" existe e se é um array
    if (jsonResponse.credentials && Array.isArray(jsonResponse.credentials)) {
        jsonResponse.credentials.forEach((credential) => {
            if (credential.Username) {
                count++;
                usernames.push(credential.Username);
            }
        });
    }

    // Retorna para a função Default()
    return count;
}