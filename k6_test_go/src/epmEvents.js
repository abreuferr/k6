/* 
Title : EPM Events
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Simulação de um senhasegura EPM, credenciais e políticas
Options : 
*/

// Importa as funções do epmLibrary.js
import { 
            postEvent
       } from './library/epmLibrary.js';

/*
Variáveis Globais()
*/ 
const BASE_URL = 'https://10.66.39.55';
const BOOTSTRAP_TOKEN = '018c5a0f-acb1-73e7-8994-85e0b76ff146';

const fileContents = JSON.parse(open('./Description/description.json'));

//console.log(JSON.stringify(descriptionData)); 

// Configuração do teste K6
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


/* 
Função Default()

Função principal que realiza as requisições equivalente ao EPM Client.
*/
export default function () {

    /*
        Variáveis Locais()
    */ 

    // Valores utilizados pela função getClientCredentials() e getAccessToken()
    let clientAlias = "go-windows";
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

    // Utilizado pela função getCredentials()
    let domain = "epmDevice";
    //let username = "epmUser2100";
    let username = `epmUser${__VU}`;

    // Utilizado pela função getUpdate()
    let client_version = "3.32.0.33";

    // utilizado pela função postEvents()
    let ip = "::123";
    let input_mode = "array";
    /*
        Autenticação()
    */    

    // Obtém o clientId e clientSecret
    //let { clientId, clientSecret } = getClientIDandClientSecret(BASE_URL, BOOTSTRAP_TOKEN, clientAlias, client, device, users);
    //console.log(`clientId.....: ${clientId}`);
    //console.log(`clientSecret.: ${clientSecret}`);

    // Obtém o accessToken
    //let accessToken = getAccessToken(BASE_URL, clientId, clientSecret);
    //console.log(`accessToken..: ${accessToken}`);

    let accessToken = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIzZjE2OTFkYjEzODcwYTMzOTFlYTRmNzMyMmRjMDVhNjAzMjBlM2YwOGQ0MGIxNzU4OGM3Yjg0MmQ5NmQ5MmEzIiwiZXhwIjoxNzIyOTY4MjM3LCJ0b2tlbl9pZCI6MTcsImlhdCI6MTcyMjk2NDYzNywiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.JIzT26h06AsK0lHnQISkdyD9fAMdAzAlbMzQIjZNypG7OtWn-g1N7HCJs3r3dwePJ-zoesSSpnZv2jfMSq3fZlcuIv0cKZ8Cng2qpYYgFnQOCYjwjdH1H6eSMKZlXbwdWmx_zUEWQFtCKE--j0piwTclZtXFm8xH5Tskb8sG_D1lQXanRZ0XfbG-sx7BQ2VEui0y_uIjfDO_b1dtgSJp97MAyKZNHNmOSoEfblniVyHiY3EAIOHHOK3ItGpoDUSJcAh977DhuigXdrwz-d20_WMHl1g4x9dVAzxK_bvAJQLqsDOA9gQoezpgX0WOMI6at2X2VsEl7SB3B9aOE20OJQ";


    let event = postEvent(BASE_URL,input_mode,fileContents,accessToken);
    console.log(`Eventos do usuário epmUser${__VU} ..: ${JSON.stringify(event, null, 2)}`);
}

/*
/usr/local/bin/k6 run k6_test_go/src/epmEvents.js --insecure-skip-tls-verify

k6 run k6_test_go/src/epmEvents.js --insecure-skip-tls-verify

k6 run --log-output=none k6_test_go/src/epmClient.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/epmClient.js --insecure-skip-tls-verify
*/