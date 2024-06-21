
import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

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
const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJlYmFiYmY1ODkzZTUzOTY0Y2M0MTExMTJjMzFlMGRkYjdkN2E1ZjZhNDNmNjZjMGJiYmU4MmEzZGM4MTVmZmM1IiwiZXhwIjoxNzE3NzgyODYzLCJ0b2tlbl9pZCI6MjksImlhdCI6MTcxNzc3OTI2MywiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.hH-J1bhqQ7rbdgb5aixkn7XcsjZBKg6Dw8QzclWtE0QkumlCYEzayccsQoygvdvm8e_2WJqzMj0KHdymyJe9aReNTHMsiB-k8-AGVrSFjfLaX0ZiJHzYaWvG7V8vl4edsFYxJXZKODmhByDP8pBxiPcnv3k0dtimuEcNfBlOsh70xYsTaJhWn96Na7wvgtGDEglErNAil8bMIMlMBH5Ul38efG59XI6nFkHXEYDD2eczcFfa1TSoFluaL0z22FRcmzt4vbcxGgoIKqC7kFMOj1RK8pvZQeTQAf5zBSPmilP45Lkqg4s5lWbWxpx-2bZoVmOlvvXki4viOY7avt9dew'; // Substitua pelo token de acesso

// Função principal do teste
export default function() {
    // Verifica se o token foi encontrado
    if (!token) {
        throw new Error("Token de acesso não definido. Certifique-se de que a variável 'token' está configurada corretamente.");
    }

    let url = 'https://10.66.39.55/api/client-manager/vault/credentials'; // Substitua pelo endpoint da sua API


    // Corpo da requisição obtido na aba Body do postman (Subsititua de acordo com o endpoint usado)
    let body = JSON.stringify({
        "action": "getAllCredencials", 
        "domain": "testes-go",
        "username": "jnascimento"
        //"client_alias": "go-windows"
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
    console.log('-- VU stage --');
    sleep(randomIntBetween(1,5)); // Segundos de espera até a próxima requisição
}

/*
Executar comando:

k6 run --http-debug="full" setup.js --insecure-skip-tls-verify
*/