/* 
Title : 
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : 
Options : 
*/

import http from 'k6/http';
import { check } from 'k6';

export let options = {
    setupTimeout: '240s', 
    scenarios: {
        unique_vus_each_iteration: {
            executor: 'per-vu-iterations',
            vus: 1, 
            iterations: 1, 
            //maxDuration: '1m', // tempo máximo para execução, se necessário
        },
    },
};

export function setup() {

    const oauth2_url = 'https://10.66.39.55/api/oauth2/token'; 
    const client_id = '5131c36dd8a93ac4b89ddcfff5ebdb2a'; 
    const client_secret = '2aca2732b79cec311157e7618e3de3b7f00754a9c9cb4cbded8d79482b196d38'; 
    const scope = 'orac_api'; 

    const payload = {
        grant_type: 'client_credentials',
        client_id: client_id,
        client_secret: client_secret,
        scope: scope,
    };

    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }
      //  timeout: '20s' // Aumenta o tempo limite da requisição para n segundos
    };

    let res = http.post(oauth2_url, payload, params);

    console.log(`Status da resposta de obtenção do token: ${res.status}`);
    console.log(`Corpo da resposta de obtenção do token: ${res.body}`);

    let successful = check(res, {
        'is status 200': (r) => r.status === 200,
    });

    if (!successful) {
        throw new Error('Falha na obtenção do token. Verifique o status e o corpo da resposta.');
    }

    let accessToken;
    try {
        accessToken = JSON.parse(res.body).access_token;
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter o token de acesso:", error.message);
        throw error; 
    }

    if (!accessToken) {
        throw new Error("Token de acesso não encontrado na resposta.");
    }

    console.log(`Token de acesso obtido: ${accessToken}`);
    
    return { token: accessToken };
}


export default function(data) {
    let token = data.token;

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
        },
        timeout: '30s' 
    };

    let res = http.post(url, body, params);

    console.log(`Resposta da requisição: ${res.body}`);

    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}
