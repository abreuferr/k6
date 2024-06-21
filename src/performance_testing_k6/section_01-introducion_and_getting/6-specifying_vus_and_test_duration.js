/* 
Title : Primeiro script
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Primeiro script com o K6
Options : 
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    //usuário virtual
    vus: 10,
    // duração do teste
    duration: '10s'
}

export default function () {
    // envia uma requisição do tipo GET para um determinado site
    http.get('https://test.k6.io');

    // espera um segundo até a próxima interação
    sleep(1);
}