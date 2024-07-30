/* 
Title : Token Request
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Como obter o Token do senhasegura Go a partir
              de um registro de um usuário/dispositivo.
Options : 
*/

// Importa as funções do epmLibrary.js
import { getClientIDandClientSecret, getAccessToken} from './library/epmLibrary.js';

// Configuração do K6
export let options = {
    scenarios: {
        unique_vus_each_iteration: {
            executor: 'per-vu-iterations',
            vus: 1,
            iterations: 1,
            maxDuration: '20m',
        },
    },
};

// Definição de variável
const BASE_URL = 'https://10.66.39.55';
const BOOTSTRAP_TOKEN = '018c5a0f-acb1-73e7-8994-85e0b76ff146';

/* 
Função Default()

Função principal
*/
export default function () {
    //Utilizado pela função getClientIDandClientSecret()
    let clientAlias = "epmDevice";
    let client = {
        "binary_hash": "FF54F551B6E829A964310F6C7AC649A2149448C07CF9E1300D5EE9FFFD4C33F5",
        "version": "3.32.0.33",
        "client_alias": clientAlias
    };
    let device = {
        "architecture": "x86_64",
        "bios_info": "",
        "cpu_info": "",
        "domain": "epmDevice",
        "hardware_uuid": "5d1e6178-b0ec-4a9b-b691-10cd5639812e",
        "hostname": "epmDevice",
        "memory_info": "",
        "operational_system": "Windows 10",
        "vendor_model_info": "Microsoft"
    };
    let users = [
        {
            "domain": "epmDevice",
            "username": "epmUser"
        }
    ];

    // Obtém clientId e clientSecret
    let { clientId, clientSecret } = getClientIDandClientSecret(BASE_URL, BOOTSTRAP_TOKEN, clientAlias, client, device, users);
    //console.log(`clientId.....: ${clientId}`);
    //console.log(`clientSecret.: ${clientSecret}`);

    // Obtém accessToken
    let accessToken = getAccessToken(BASE_URL, clientId, clientSecret);
    console.log(`accessToken..: ${accessToken}`);
}

/*
k6 run k6_test_go/src/vaultClientToken.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/vaultClientToken.js --insecure-skip-tls-verify
*/