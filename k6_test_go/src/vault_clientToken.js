/* 
Title : clientID e o clientSECRET
Author : "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Como obter o clientId e o clientSecret de um senhasegura Go 
              a partir de um registro de um usuário/dispositivo.
Options : 
*/

// Importando a bibliotecas do k6
import http from 'k6/http';
import { check, sleep } from 'k6';

// Definição de variável
const BASE_URL = 'https://10.66.39.55/api/client-manager';
const BOOTSTRAP_TOKEN = '018c5a0f-acb1-73e7-8994-85e0b76ff146';

/*
Função que a partir de um registro de um usuário/dispositivo 
retorna os valores de clientID e clientSec.
*/
export default function () {
  // URL da Requisição
  let registerUrl = `${BASE_URL}/register`;
  // Corpo da Requisição
  let registerPayload = JSON.stringify({
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

  // Cabeçalho da Requisição
  let registerParams = {
    headers: {
      'Content-Type': 'application/json',
      'Bootstrap-Token': BOOTSTRAP_TOKEN,
    },
  };

  // Envio da Requisição
  let res = http.post(registerUrl, registerPayload, registerParams);

  // Verifica se o "clientID" e o "clientSecret" existem
  check(res, {
    'clientID and clientSecret - is status 200': (r) => r.status === 200,
    'clientId present': (r) => JSON.parse(r.body).credentials.client_id !== undefined,
    'clientSecret present': (r) => JSON.parse(r.body).credentials.client_secret !== undefined,
  });

  // Armazena os resultados nas variáveis "clientId" e "clientSecret"
  let responseData = JSON.parse(res.body);
  let clientId = responseData.credentials.client_id;
  let clientSecret = responseData.credentials.client_secret;

  // Exibir os valores de "clientId" e "clientSecret"
  console.log(`clientId : ${clientId}`);
  console.log(`clientSecret : ${clientSecret}`);

  /* 
  Os valores das variáveis "clientId" e "clientSecret" são 
  transferidos para a Função "getToken"
  */
  getToken(clientId, clientSecret);
}

// Função que irá gerar o Bearer Token
function getToken(clientId, clientSecret) {

  // Definição de variável
  const BASE_URL = 'https://10.66.39.55/api';

  // URL da Requisição
  let tokenUrl = `${BASE_URL}/oauth2/token`;
  
  // Corpo da Requisição
  let tokenPayload = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

  // Cabeçalho da Requisição
  let tokenParams = {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      }
  };

  // Realização da requisição POST para obter o token de acesso
  let res = http.post(tokenUrl, tokenPayload, tokenParams);

  // Verificação do status da resposta
  check(res, {
      'accessToken - is status 200': (r) => r.status === 200,
  });

  // Extrai apenas o token de acesso da resposta do body
  let accessToken;
  try {
      accessToken = JSON.parse(res.body).access_token;
  } catch (error) {
      console.error("Erro ao analisar JSON da resposta ao obter o token de acesso:", error.message);
      return;
  }

  if (!accessToken) {
      console.error("Token de acesso não encontrado na resposta.");
      return;
  }
  
  // Retorna apenas o token 
  console.log(`clientToken : ${accessToken}`);
}

/*
Comando : k6 run k6_test_go/src/vault_clientToken.js --insecure-skip-tls-verify
*/