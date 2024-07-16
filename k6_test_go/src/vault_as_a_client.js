//Bibliotecas
import http from 'k6/http';
import { check } from 'k6';
//import { sleep } from 'k6';

// COnfiguração dos labes
export let options = {
    setupTimeout: '120s', // Aumenta o tempo limite de resposta para a função de setup
    scenarios: {
        unique_vus_each_iteration: {
            executor: 'per-vu-iterations',
            vus: 2, // número de virtual users
            iterations: 1, // cada VU fará exatamente uma iteração
            //maxDuration: '1m', // tempo máximo para execução, se necessário
        },
    },
};

// Função de setup para obter o token antes da execução dos VUs
export function setup() {

    const oauth2_url = 'https://10.66.39.55/api/oauth2/token'; // Endpoint
    const client_id = '177a58c6920eb26bce3185deb2d97438';
    const client_secret = '27a4f8c8b34f798d83884fa1e1439ed87ede838a4c742220f96d79e3ff10dbe5'; 
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

    let url = 'https://10.66.39.55/api/client-manager/client-update'; // Endpoint

    // Corpo da requisição, verificar na aba Body os parâmetros necessários
    let body = JSON.stringify({
        client_version: "1.2.3.3"
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        //timeout: '30s' 
    };

    // Realiza a requisição 
    let res = http.post(url, body, params);

    // console.log(`Resposta da requisição: ${res.body}`);

    // Verifica se a requisição foi bem sucedida
    check(res, {
        'is status client-update: 204': (r) => r.status === 204,
    });
// ok

    {
    let token = data.token; // Token obtido em setup
    let url = 'https://10.66.39.55/api/client-manager/params'; // Endpoint

    // Corpo da requisição, verificar na aba Body os parâmetros necessários
    let body = JSON.stringify({
        "username": `User${__VU}`,
        "domain": "labes-go-win"
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        //timeout: '3s' 
    };

    // Realiza a requisição 
    let res = http.post(url, body, params);

    //console.log(`Resposta da requisição: ${res.body}`);

    // Verifica se a requisição foi bem sucedida
    check(res, {
        'is status params: 200': (r) => r.status === 200,
    });

    {
    let token = data.token; // Token obtido em setup

    let url = 'https://10.66.39.55/api/client-manager/pedm/system-file-commands'; // Endpoint

    // Corpo da requisição, verificar na aba Body os parâmetros necessários
    let body = JSON.stringify({
        "domain": "labes-go-win",
        "username": `User${__VU}`
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        // timeout: '3s' 
    };

    // Realiza a requisição 
    let res = http.post(url, body, params);

    //console.log(`Resposta da requisição: ${res.body}`);

    // Verifica se a requisição foi bem sucedida
    check(res, {
        'is status system-file-commands: 200': (r) => r.status === 200,
    }); 

    {
    let token = data.token; // Token obtido em setup

    let url = 'https://10.66.39.55/api/client-manager/pedm/policies'; // Endpoint

    // Corpo da requisição, verificar na aba Body os parâmetros necessários
    let body = JSON.stringify({
        "action": "getAllPolicies", 
        "username": `User${__VU}`,
        "domain": "labes-go-win",
        "client_alias": "go-windows"
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        // timeout: '30s' 
    };

    // Realiza a requisição 
    let res = http.post(url, body, params);

    //console.log(`Resposta da requisição: ${res.body}`);

    // Verifica se a requisição foi bem sucedida
    check(res, {
        'is status policies: 200': (r) => r.status === 200,
    }); 
    {
        let token = data.token; // Token obtido em setup
    // Altere de acordo com o cenário
    /*
        Por padrão o client requisita 25 itens por página
        exemplo: let pageLength = 25;
        O valor da variável "Items" corresponde ao total de credenciais
    */

        //Ajustar para ser menor ou igual a 25 a varaável "pageLength"
        let Items = 10;
        let pageLength = 10;
        let totalPages = Math.ceil(Items / pageLength);
    
        let totalCredenciaisObtidas = 0;
    
        for (let page = 1; page <= totalPages; page++) {
            let url = 'https://10.66.39.55/api/client-manager/vault/credentials'; // Endpoint
            // Corpo da requisição
            let body = JSON.stringify({
                    "action": "getAllCredencials",
                    "credential": null,
                    "macroId": null,
                    "domain": "labes-go-win",
                    "username": `User${__VU}`,
                    "pageLength": pageLength,
                    "pageNumber": page
            });
    
           // console.log("body: ", body);
    
            let params = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
    
            // Realiza a requisição
            let res = http.post(url, body, params);
    
    
            let responseCredentials = JSON.parse(res.body).credentials || [];
            let numItems = responseCredentials.length;
            totalCredenciaisObtidas += numItems;
    
           // console.log(`VU ${__VU} - Requisição página ${page}`);
            if (!check(res, {'is status credenciais': (r) => r.status === 200})) {
                 //console.error(`Erro ao processar página ${page}. Status: ${res.status} | Response: ${res.body}`);
                break;
            }
    
            if (numItems < pageLength) {
                //console.log(`VU ${__VU} - Página ${page}: Recebeu ${numItems} credenciais, esperado era ${pageLength}.`);
                break; // 
            }
    
            //sleep(1); // Pausa entre requisições
        }
    
        console.log(`VU ${__VU} - Total de credenciais obtidas: ${totalCredenciaisObtidas}`);
    }
        }    
            }  
               }
                  }
                


/*
k6 run k6_lab_go/src/lab/vault_as_a_client.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_lab_go/src/lab/vault_as_a_client.js --insecure-skip-tls-verify
*/