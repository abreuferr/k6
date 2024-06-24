/* 
Title : 
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : 
Options : 
*/

import http from 'k6/http';
import { check } from 'k6';

export default function() {
    let bootstrapToken = '018c5a0f-acb1-73e7-8994-85e0b76ff146'; 
    let url = 'https://10.66.39.55/api/client-manager/register';
    let body = JSON.stringify({
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
        headers: {
            'Content-Type': 'application/json',
            'Bootstrap-Token': `Bearer ${bootstrapToken}` 
        }
    };

    let res = http.post(url, body, params);

    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    let credentials = JSON.parse(res.body).credentials;
    let client_id = credentials.client_id;
    let client_secret = credentials.client_secret;

    getToken(client_id, client_secret);

    console.log(`Client ID: ${client_id}, Client Secret: ${client_secret}`);
};

function getToken(client_id, client_secret) {
    let url = 'https://10.66.39.55/api/oauth2/token';

    let body = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;

    let params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    let res = http.post(url, body, params);

    console.log(`Resposta do getToken: ${res.body}`);

    check(res, {
        'is status 200': (r) => r.status === 200,
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

    console.log(`Token de acesso: ${accessToken}`);
    useAccessToken(accessToken);
}

function useAccessToken(token) {
    let url = 'https://10.66.39.55/api/client-manager/vault/credentials';

    let body = JSON.stringify({
        "action": "getAllCredencials", 
        "domain": "testes-go",
        "username": "jnascimento"
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    let res = http.post(url, body, params);

    console.log(`Resposta da requisição: ${res.body}`);

    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}

/*
Executar comando:

k6 run --http-debug="full" vault_all_credencials.js --insecure-skip-tls-verify

*/