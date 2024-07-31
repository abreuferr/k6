/* 
Title : Inserir usuários e dispositivos
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : O objetivo deste programa é o de inserir um usuário e dispositivo
Options : 
*/

// Bibliotecas do k6
import { check, sleep } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

// Definição de variável
const BASE_URL = 'https://192.168.1.15';
const BOOTSTRAP_TOKEN = '0190bd74-17e5-73f3-a38a-266ce3d0a411';

// Carregar o arquivo JSON
const epmInformation = new SharedArray('users with devices', function () {
    return JSON.parse(open('./data/UserDevice.json')).epm;
});

// Configuração do teste
export const options = {
    vus: 1, // Número de usuários virtuais
    iterations: epmInformation.length, // Número de iterações iguais ao número de dispositivos
};

/*
Função Default()

Função que realiza o registro de usuários e dispositivos.
*/
export default function() {
    // Obter o índice da iteração atual
    const idx = __ITER;

    // Selecionar o dispositivo baseado no índice da iteração
    const hostname = epmInformation[idx];

    console.log(hostname.hardware_uuid)
    console.log(hostname.hostname)
    console.log(hostname.username)

/*
    let url = `${BASE_URL}/api/client-manager/register`;

    let body = JSON.stringify({
        "client_alias": "epmClient",
        "client": {
            "binary_hash":"FF54F551B6E829A964310F6C7AC649A2149448C07CF9E1300D5EE9FFFD4C33F5",
            "version": "3.32.0.33",
            "client_alias": "epmClient"
        },
        "device": {
            "architecture": "x86_64",
            "bios_info": "",
            "cpu_info": "",
            "domain": "senhasegura.local",
            "hardware_uuid": "hardware_uuid",
            "hostname": "hostname",
            "memory_info": "",
            "operational_system": "Windows 10",
            "vendor_model_info": "Microsoft"
        },
        "users": [
            {
                "domain": "senhasegura.local",
                "username": "username"
            }
        ]
    });

    let params = {
        headers: { 
            'Content-Type': 'application/json',
            'Bootstrap-Token': BOOTSTRAP_TOKEN,
        }
    };

    let res = http.post(url, body, params);
    
    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    console.log(`Usuário epmUser${__VU} e dispositivo epmDevice${__VU} com UUID ${hardwareUUID}`);
*/
}

/*
k6 run k6_test_go/src/registerNUserNDevices_JSON.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/registerNUserNDevices_JSON.js --insecure-skip-tls-verify
*/