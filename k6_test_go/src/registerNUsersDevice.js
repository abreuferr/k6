/*
Title : Inserir vários usuários em um dispositivo
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : O objetivo deste programa é o de inserir vários usuários em um único dispositivo.
Options : 
*/

// Biblioteca do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Definição de variável
const BASE_URL = 'https://192.168.1.15';
const BOOTSTRAP_TOKEN = '0190bd74-17e5-73f3-a38a-266ce3d0a411';

/*
Função createRegisterPayload()

Função para criar o payload de registro com múltiplos usuários
*/
function createRegisterPayload(userCount) {
    let users = [];
    for (let i = 1; i <= userCount; i++) {
        users.push({
            "domain": "epm-device-lab",
            "username": `epm-user${i}-lab`
        });
    }
    return JSON.stringify({
        "client_alias": "epm-device-lab",
        "client": {
            "binary_hash": "FF54F551B6E829A964310F6C7AC649A2149448C07CF9E1300D5EE9FFFD4C33F5",
            "version": "3.32.0.33",
            "client_alias": "epm-device-lab"
        },
        "device": {
            "architecture": "x86_64",
            "bios_info": "",
            "cpu_info": "",
            "domain": "epm-device-lab",
            "hardware_uuid": "5d1e6178-b0ec-4a9b-b691-10cd5639812e",
            "hostname": "epm-device-lab",
            "memory_info": "",
            "operational_system": "Windows 10",
            "vendor_model_info": "Microsoft"
        },
        "users": users
    });
}

/*
Função Default()

Função que realiza o registro dos usuários.
*/
export default function() {
    // Quantidade de usuários a serem cadastrados
    let userCount = 5;

    // URL da Requisição
    let registerUrl = `${BASE_URL}/api/client-manager/register`;

    // Corpo da Requisição
    let registerPayload = createRegisterPayload(userCount);

    // Cabeçalho da Requisição
    let registerParams = {
        headers: { 
            'Content-Type': 'application/json',
            'Bootstrap-Token': BOOTSTRAP_TOKEN,
        }
    };

    // Envio da Requisição
    let res = http.post(registerUrl, registerPayload, registerParams);

    // Usuários inseridos com sucesso
    console.log(`Criados ${userCount} usuários no dispositivo`);
    sleep(1);
}

/*
k6 run k6_test_go/src/lab/registerNUsersDevice.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/lab/registerNUsersDevice.js --insecure-skip-tls-verify
*/