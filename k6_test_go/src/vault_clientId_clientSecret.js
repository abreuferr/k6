/* 
Title : clientId e o client_SECRET
Author : "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Como obter o clientId e o clientSecret de um senhasegura Go 
              previamente cadastrados no senhasegura Cofre.
Options : 
*/

// importando a bibliotecas do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Definindo as variáveis BASE_URL e BOOTSTRAP_TOKEN
const BASE_URL = 'https://10.66.39.55/api/client-manager';
const BOOTSTRAP_TOKEN = '018c5a0f-acb1-73e7-8994-85e0b76ff146'; //Vault token == BOOTSTRAP_TOKEN

// "client", "device" e "users" previamente cadastrados no senhasegura Cofre
export default function () {
  let registerUrl = `${BASE_URL}/register`;
  let registerPayload = JSON.stringify({
    // Corpo
    "client_alias": "go-windows",
    "client": {
      "binary_hash":"42cffe1e38d5444329badd26fc2a402d554abc6839de26d87f13cca72d2ea2db",
      "version": "3.32.0.24",
      "client_alias": "go-windows"
    },
    "device": {
      "architecture": "x64",
      "bios_info": "",
      "cpu_info": "",
      "domain": "senhasegura",
      "hardware_uuid": "ed01a9755d1e147b0d7e374320a92812",
      "hostname": "javascriptk6",
      "memory_info": "",
      "operational_system": "Windows 10",
      "vendor_model_info": ""
    },
    "users": [
      {
        "domain": "testes-go-win",
        "username": "User6"
      }
    ]
  });

  let registerParams = {
    // Cabeçalho
    headers: {
      'Content-Type': 'application/json',
      'Bootstrap-Token': BOOTSTRAP_TOKEN,
    },
  };

  // Enviar a requisição de dados
  let res = http.post(registerUrl, registerPayload, registerParams);

  // Verifica se o "clientID" e o "clientSecret" existem
  check(res, {
    'is status 200': (r) => r.status === 200,
    'clientId present': (r) => JSON.parse(r.body).credentials.client_id !== undefined,
    'clientSecret present': (r) => JSON.parse(r.body).credentials.client_secret !== undefined,
  });

  // Armazena os resultados nas variáveis "clientId" e "clientSecret"
  let responseData = JSON.parse(res.body);
  let clientId = responseData.credentials.client_id;
  let clientSecret = responseData.credentials.client_secret;

  // Exibir os valores de "clientId" e "clientSecret"
  console.log(`clientId: ${clientId}`);
  console.log(`clientSecret: ${clientSecret}`);
}

/*
Comando : k6 run k6_test_go/src/vault_clientId_clientSecret.js --insecure-skip-tls-verify
*/