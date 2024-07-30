/* 
Title : EPM Client
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Simulação de um senhasegura EPM, credenciais e políticas
Options : 
*/

// Importa as funções do epmLibrary.js
import { 
            getClientIDandClientSecret,
            getAccessToken,
            getUpdate,
            getParams,
            countParams,
            getSystemFileCommands,
            countSystemFileCommands,
            getPolicies,
            countPolicies,
            getCredentials,
            countCredentials
        } from './library/epmLibrary.js';

/*
Variáveis Globais()
*/ 
const BASE_URL = 'https://10.66.39.55';
const BOOTSTRAP_TOKEN = '018c5a0f-acb1-73e7-8994-85e0b76ff146';

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

    // Utilizado pela função getCredentials()
    let domain = "epmDevice";
    let username = `epmUser${__VU}`;

    // Utilizado pela função getUpdate()
    let client_version = "3.32.0.33";

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
    let accessToken = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIzZjE2OTFkYjEzODcwYTMzOTFlYTRmNzMyMmRjMDVhNjAzMjBlM2YwOGQ0MGIxNzU4OGM3Yjg0MmQ5NmQ5MmEzIiwiZXhwIjoxNzIxOTM2OTE0LCJ0b2tlbl9pZCI6MTcsImlhdCI6MTcyMTkzMzMxNCwiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.Gc82uf4oISXFgn5qFDGxK7XdBlPDPf9hXAQCpQFnTdT89llev1QGEsV8QtDJajUe_OAa3csK53vF8Nm-kjJLUwe-MIfmvxoOpwt1ijuBaAomN4r8A_zTyCQ--hfZ9IL9cL6hhZShJgLMg-eHpywriFjpUnXlx1r3stEhQiaqX5La2Zu-F0jD9sY0WVrCdWILu1iCUDw0QIXQEVxxNqI8eV192P7nN9Qcz7kCMK_XQB3A-oZV0tomQqwfnYgqMsPiSVNfSuktwZF0mirhdDOvOnh825ac578HGu44V0JP13WpiLjJIws_AxHGyoTqo0g_Q2-koSZryjm_Wkz7TKRCnw";

    /*
        Update()
    */

    // Obter update 
    let update = getUpdate(BASE_URL, client_version, accessToken);
    //console.log(`Update..: ${JSON.stringify(update)}`);

    /*
        Parâmetros()
    */

    // Obter Parâmetros
    let params = getParams(BASE_URL, domain, username, accessToken);
    //console.log(`Parâmetros..: ${JSON.stringify(params, null, 2)}`);

    // Contar Parâmetros
    //let paramsCount = countParams(params);
    //console.log(`O usuário epmUser${__VU} possui o total de ${paramsCount} parâmetros`);

    /*
        Comandos do Sistema()
    */

    // Obter comandos do sistema
    let system = getSystemFileCommands(BASE_URL, domain, username, accessToken);
    //console.log(`System File Commands..: ${JSON.stringify(system, null, 2)}`);

    // Contar comandos do sistema
    //let systemCount = countSystemFileCommands(system);
    //console.log(`O usuário epmUser${__VU} possui o total de ${systemCount} comandos do sistema`);

    /*
        Políticas()
    */

    // Obter politicas
    let policies = getPolicies(BASE_URL, domain, username, accessToken);
    //console.log(`Politicas do usuário epmUser${__VU} ..: ${JSON.stringify(policies, null, 2)}`);

    // Contar politicas
    //let policiesCount = countPolicies(BASE_URL, domain, username, accessToken);
    //console.log(`O usuário epmUser${__VU} possui o total de ${policiesCount} politicas`);

    /*
        Credenciais()
    */

    // Obter credenciais
    let credentials = getCredentials(BASE_URL, domain, username, accessToken);
    //console.log(`Credenciais..: ${JSON.stringify(credentials, null, 2)}`);
   
    // Contar credenciais
    let credentialCount = countCredentials(credentials);
    console.log(`O usuário epmUser${__VU} possui o total de ${credentialCount} credenciais`);
}

/*
k6 run k6_test_go/src/epmClient.js --insecure-skip-tls-verify

k6 run --log-output=none k6_test_go/src/epmClient.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/epmClient.js --insecure-skip-tls-verify
*/