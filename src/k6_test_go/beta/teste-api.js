//Bibliotecas
import http from 'k6/http';
import { check } from 'k6';

// COnfiguração dos testes
export let options = {
    setupTimeout: '240s', // Aumenta o tempo limite de resposta para a função de setup
    scenarios: {
        unique_vus_each_iteration: {
            executor: 'per-vu-iterations',
            vus: 1, // número de virtual users
            iterations: 1, // cada VU fará exatamente uma iteração
            //maxDuration: '1m', // tempo máximo para execução, se necessário
        },
    },
};

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
    //console.log(`Status da resposta de obtenção do token: ${res.status}`);
   // console.log(`Corpo da resposta de obtenção do token: ${res.body}`);

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
       // console.error("Erro ao analisar JSON da resposta ao obter o token de acesso:", error.message);
        throw error;   // Mostra o erro antes da execução do setup, e interrope a execução
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

    for (let page = 1; page <= totalPages; page++) {
        let url = 'https://10.66.39.55/api/client-manager/vault/credentials'; // Endpoint
        // Corpo da requisição
        let body = JSON.stringify({
                "action": "getAllCredencials",
                "credential": null,
                "macroId": null,
                "domain": "testes-go-win",
                "username": "User",
                "pageLength": pageLength,
                "pageNumber": page
        });

        console.log("body: ", body);

            let params = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            // Realiza a requisição
            let res = http.post(url, body, params);
            console.log("resposta:",res.body)
           // console.log(`Requisição página ${page}: ${res.body}`);

            }
        }
    
 /* 
conta de 0 até 25 fecha a requisição
conta de 26 até 50 fecha a requisição
total 50

conta de 25 em 25 
enquanto o valor for positivo

 */

