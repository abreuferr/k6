/* 
Title : Inserir usuários e dispositivos
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : O objetivo deste programa é o de inserir um usuário e dispositivo
Options : 
*/

// Bibliotecas do k6
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
    iterations: epmInformation.length, // Número de iterações iguais ao número de registros
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
}

/*
k6 run k6_test_go/src/registerNUserNDevices_JSON.js --insecure-skip-tls-verify

k6 run --http-debug="full" k6_test_go/src/registerNUserNDevices_JSON.js --insecure-skip-tls-verify
*/