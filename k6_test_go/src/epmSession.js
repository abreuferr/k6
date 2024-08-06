/* 
Title : EPM Client
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Simulação de um senhasegura EPM, credenciais e políticas
Options : 
*/

// Importa as funções do epmLibrary.js
import { 
            startSession,
            uploadSession,
            finishSession
        } from './library/epmLibrary.js';

import { SharedArray } from 'k6/data';
/*
Variáveis Globais()
*/ 
const BASE_URL = 'https://10.66.39.55';
const BOOTSTRAP_TOKEN = '018c5a0f-acb1-73e7-8994-85e0b76ff146';

const fileInfo = new SharedArray('fileInfo', function () {
    return JSON.parse(open('./Session/64cebee3-fa22-4ce0-b085-3e34ad1b4bba.guac-info.json'));
});

//console.log(JSON.stringify(fileInfo)); 

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

// Conta os pedaços
let processedChunks = {};

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

    // Utilizado por ambas as funções uploadSession() e finishSession()
    let ip = "10.10.10.10";


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

    let accessToken = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIzZjE2OTFkYjEzODcwYTMzOTFlYTRmNzMyMmRjMDVhNjAzMjBlM2YwOGQ0MGIxNzU4OGM3Yjg0MmQ5NmQ5MmEzIiwiZXhwIjoxNzIyOTc3MTI2LCJ0b2tlbl9pZCI6MTcsImlhdCI6MTcyMjk3MzUyNiwiaXNzIjoic2VuaGFzZWd1cmEtYXBpLWF1dGgifQ.sBpLHjFuvRs2h2tELCp3FXNljPc2fxoEQsQyC_BIV_2jFSfFbaX7utu8C6KegOU0R4lmDuc1hTsGOzkX5shf-HItJ3lehZOuY1eO7FlUpdhFQigkRiCUowfHKO-JbGeeM7kzd05OY2Fg2SpncQF_A5wcimrhaaPaLfRVpA-sURcRxAjZ1qbVCVd0kR7OBiKzbHuh0pR3-qiG1PgS-uR-PIzN7SXTjZ2DKcMCW7RjyxlxLQW8v2Uti93MoFNioyI3YDAO3LzpIBRWrnqfIe6Z62sSC7Nr5UGTIuUFVs1-HCF_vu5fpcfjIM1d6o0yYowx3iEDcwQEjm2BFrkMvdux3w";

    /*let session_id = startSession(BASE_URL,username, domain, clientAlias, ip, started_at, accessToken);
    //console.log(`Start Session..: ${JSON.stringify(start, null, 2)}`);
    //console.log(`O usuário epmUser${__VU} possui o session_id ${session_id}`);

    //let upload = uploadSession(BASE_URL,username, domain, clientAlias, session_id, file_chunk,content,ip,md5,input_log, accessToken);
    //console.log(`Upload Session..: ${JSON.stringify(upload)}`);
    //console.log(`O usuário epmUser${__VU} possui o session_id ${session_id}`);*/

    /*let finish = finishSession(BASE_URL, username, domain, clientAlias, cmd, ip, session_id, finished_at, exited_at, accessToken);
    //console.log(`Finish Session..: ${JSON.stringify(finish, null, 2)}`);
    //console.log(`O usuário epmUser${__VU} possui o session_id ${session_id}`);*/

    let session_id = startSession(BASE_URL, username, domain, clientAlias, ip, accessToken);
    console.log(`Start session: ${JSON.stringify(session_id, null, 2)}`);

    fileInfo.forEach(fileChunkDetails => {
        const uniqueID = `${fileChunkDetails.file_chunk}`;
        if (!processedChunks[uniqueID]) {
            uploadSession(BASE_URL, fileChunkDetails.username, fileChunkDetails.domain, fileChunkDetails.client_alias, session_id, fileChunkDetails.file_chunk, fileChunkDetails.content, fileChunkDetails.ip, fileChunkDetails.md5, fileChunkDetails.input_log, accessToken);
            processedChunks[uniqueID] = true; // Marca como processado
        } else {
            console.log(`Chunk ${uniqueID} skipped because it has already been uploaded.`);
        }
    });

    // Utilizado pela função finishSession()
    let cmd = "?test";
    let finished_at = "2024-08-05 13:50:00";
    let exited_at = "2024-08-5 14:06:10";

    let finish = finishSession(BASE_URL, username, domain, clientAlias, cmd, ip, session_id, finished_at, exited_at, accessToken);
}

/*
/usr/local/bin/k6 run k6_test_go/src/epmSession.js --insecure-skip-tls-verify

k6 run k6_test_go/src/epmSession.js --insecure-skip-tls-verify

k6 run --log-output=none k6_test_go/src/epmClient.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/epmClient.js --insecure-skip-tls-verify
*/