/* 
Title : Policie Request
Author : "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Faz uma requisição de acesso a uma política
Options : 
*/

// Importando bibliotecas do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração das opções do k6
export let options = {
    //setupTimeout: '240s', // Aumenta o tempo limite para a função de setup
    scenarios: {
        unique_vus_each_iteration: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1,
        },
    },
};

// Definição de variável
const BASE_URL = 'https://10.66.39.55/api/client-manager';
const BOOTSTRAP_TOKEN = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJlYmFiYmY1ODkzZTUzOTY0Y2M0MTExMTJjMzFlMGRkYjdkN2E1ZjZhNDNmNjZjMGJiYmU4MmEzZGM4MTVmZmM1IiwiZXhwIjoxNzE5ODU3NTQxLCJ0b2tlbl9pZCI6MjksImlhdCI6MTcxOTg1Mzk0MSwiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.po8PCWxnpJyH5NFyiscDlm72Mei--9KCqsbgfRJPlufpyDkF-VvJZwxdZQaWHpke2kpFMDDbD0qWD1QtjruCoeRkyZUyLieuURd4enjSHGutCdONat30cI4mTZXpDb7bc27TR-12p0Scj3yB03igX8ehB2rZwRv58ImDGWspwBFeKtvThGiRsQIuYUOymQ2vSHyymmOP8g3LyPGtTvYQa4xtQL_aCn7NU3kjtj_zA7FeyCKpd1VevVPlpCWk3i0VRoYSgOutL7BuyOZF0B-fiUlJBbZyNnLnG9cpLpIwqMbljzafIeXcRiMVHgBm_dIdPWHl3QHMENxLEV4msyzZiA';

// Função principal do teste
export default function() {
    // Verifica se o token foi encontrado
    if (!BOOTSTRAP_TOKEN) {
        throw new Error("Token de acesso não definido. Certifique-se de que a variável 'token' está configurada corretamente.");
    }

    // URL da Requisição
    let policieUrl = `${BASE_URL}/pedm/policies`;

    // Corpo da Requisição
    let policieBody = JSON.stringify({
        "action": "getAllPolicies", 
        "domain": "testes-go",
        "username": "jnascimento",
        "client_alias": "go-windows"
    });

    // Cabeçalho da Requisição
    let policieParams = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BOOTSTRAP_TOKEN}`
        }
    };

    // Envio da Requisição
    let res = http.post(policieUrl, policieBody, policieParams);

    // Mostra a resposta da requisição na saída
    console.log(`Resposta da requisição: ${res.body}`);

    //Verifica se a requisição foi bem sucedida
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
    // TODO: Pesquisar como neste intervalo ocorrer mais de uma requisição simultânea (udemy k6)
    
    sleep(4); // Segundos de espera até a próxima requisição
}

/*
k6 run k6_test_go/src/requests.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/requests.js --insecure-skip-tls-verify
*/