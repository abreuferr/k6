//Bibliotecas
import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
// Configuração dos testes
export let options = {
    setupTimeout: '120s', // Aumenta o tempo limite de resposta para a função de setup
    scenarios: {
        unique_vus_each_iteration: {
            executor: 'per-vu-iterations',
            vus: 10, // número de virtual users
            iterations: 1, // cada VU fará exatamente uma iteração
            //maxDuration: '1m', // tempo máximo para execução, se necessário
        },
    },
};

const messages = [];
// Função de setup para obter o token antes da execução dos VUs
export function setup() {

    const oauth2_url = 'https://10.66.39.55/api/oauth2/token'; // Endpoint
    const client_id = '33d7eed2a2138b762c308469356155cb';
    const client_secret = '8c62dbc3312a59fba2ffcf964dbada32d4e0db3b423ac0d1d95b171f5ced83b7'; 
    const scope = 'orac_api'; 

    // Parâmetros da requisição POST para obter o token
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

    // Realiza a requisição POST para obter o token de acesso
    let res = http.post(oauth2_url, payload, params);

    // Verificação detalhada da resposta
    console.log(`Status da resposta de obtenção do token: ${res.status}`);
    //console.log(`Corpo da resposta de obtenção do token: ${res.body}`);

    let successful = check(res, {
        'is status token: 200': (r) => r.status === 200,
    });

    if (!successful) {
        throw new Error('Falha na obtenção do token. Verifique o status e o corpo da resposta.');
    }

    let accessToken;
    try {
        accessToken = JSON.parse(res.body).access_token;
    } catch (error) {
        console.error("Erro ao analisar JSON da resposta ao obter o token de acesso:", error.message);
        throw error;  // Mostra o erro antes da execução do setup, e interrope a execução
    }

    if (!accessToken) {
        throw new Error("Token de acesso não encontrado na resposta.");
    }

    //console.log(`Token de acesso obtido: ${accessToken}`);

    // Retorna o token para ser usado na função default
    return { token: accessToken };
}

// Função para realizar a requisição autenticada usando o token
export default function(data) {
    let token = data.token; // Token obtido em setup

    let Items = 700;
    let pageLength = 25;
    let totalPages = Math.ceil(Items / pageLength);

    //let totalCredenciaisObtidas = 0;

    for (let page = 1; page <= totalPages; page++) {
        // Corpo da requisição
        if (page ===totalPages) {
            pageLength = Items - (page - 1) * pageLength;  // Ajusta para a quantidade restante de itens na última página
        }

        let url = 'https://10.66.39.55/api/client-manager/vault/credentials'; // Endpoint  
        let body = JSON.stringify({
                "action": "getAllCredencials",
                "credential": null,
                "macroId": null,
                "domain": "testes-go-win",
                "username": `User${__VU}`,
                "pageLength": pageLength,
                "pageNumber": page
        });

       // console.log("body: ", body);

        let params = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: '60s'  // Ajuste o tempo limite conforme necessário
        };

        // Realiza a requisição
        let res = http.post(url, body, params);

        // Verifica se a requisição foi realizada com sucesso
        let success = check(res, {
            'is status 200': (r) => r.status === 200,
        });

        if (success) {
            messages.push(`VU ${__VU} - Usuário completou com sucesso.`);
        } else {
            messages.push(`VU ${__VU} - Usuário falhou.`);
        }
    }
}

export function handleSummary(data) {
    // Junta todas as mensagens em uma única string
    const resultMessage = messages.join('\n');
    
    // Consolida a quantidade de usuários que terminaram com sucesso
    const totalSuccessfulUsers = messages.filter(msg => msg.includes('Usuário completou com sucesso')).length;
    
    // Adiciona a mensagem de total de usuários ao final
    const summary = `Número total de usuários que concluíram com sucesso: ${totalSuccessfulUsers}\n${resultMessage}`;
    
    // Usando um módulo auxiliar para criar o sumário em um formato amigável
    return {
        'stdout': textSummary(data, { indent: ' ', enableColors: true }),
        'resultados.txt': summary  // Escreve a string consolidada no arquivo `resultados.txt`
    };
}

/*
Executar comando:

k6 run --http-debug="full" vault_as_a_client.js --insecure-skip-tls-verify

*/
