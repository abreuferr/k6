
import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração das opções do k6
export let options = {
    //setupTimeout: '240s', // Aumenta o tempo limite para a função de setup
    scenarios: {
        unique_vus_each_iteration: {
            executor: 'per-vu-iterations',
            vus: 5, // usuários virtuais
            iterations: 5, // cada VU fará exatamente uma iteração
        },
    },
};

// Bearer Token obtido com a execução do script "register.js"
const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJlYmFiYmY1ODkzZTUzOTY0Y2M0MTExMTJjMzFlMGRkYjdkN2E1ZjZhNDNmNjZjMGJiYmU4MmEzZGM4MTVmZmM1IiwiZXhwIjoxNzE3NzY3Mjc3LCJ0b2tlbl9pZCI6MjksImlhdCI6MTcxNzc2MzY3NywiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.H0OPXjhQDdkk6pUiubcHZjnhSxmq2rSo6MWfd5Wa0WCe8o5y_afAU4x6AHnBG0ZNqQ5M4WVy57TW-MjkHArmzXGxmLpeNSezPxfbqqrKViuc2Tb-3jIvf_57hgwGTCcTFaY_BjPo8gOAtXpi4CM-QBgVlXGikwJwHBuVJXlwcHJj76CP1DNHu6tyW2y3k6n79CazHI4KaOrNFX_98YxHLroxMOjtNRq9exyyh6DO9PXVnLZJyN5pkifCBc9iStZyoS7Lek9zbZoBCxNXW7LrG4M7luny7VI8iUmQ1Dt-U85sKHWkBVxrzCknacPBafP4TL7T_AyVhUtDQNNL2okfLQ'; // Substitua pelo seu token de acesso real

// Função principal do teste
export default function() {
    // Verifica se o token foi encontrado
    if (!token) {
        throw new Error("Token de acesso não definido. Certifique-se de que a variável 'token' está configurada corretamente.");
    }

    let url = 'https://10.66.39.55/api/client-manager/pedm/policies'; // Substitua pelo endpoint da sua API


    // Corpo da requisição obtido na aba Body do postman (Subsititua de acordo com o endpoint usado)
    let body = JSON.stringify({
        "action": "getAllPolicies", 
        "domain": "testes-go",
        "username": "jnascimento",
        "client_alias": "go-windows"
    });

    let params = {
        // Passa o tipo de conteúdo e o bearer token necessário para realizar a requisição
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    // Realiza a requisição POST
    let res = http.post(url, body, params);

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
Executar comando:

k6 run --http-debug="full" requests.js --insecure-skip-tls-verify
*/