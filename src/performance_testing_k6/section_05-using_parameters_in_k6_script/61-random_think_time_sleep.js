/*
Title : Random “think” time (sleep)
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : utilização de variáveis de ambiente
Options : https://k6.io/docs/javascript-api/jslib/utils/randomintbetween/
*/

// importando a bibliotecas HTTP do k6.
import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    // usuários virtuais
    vus: 5,
    // duração das interações
    duration: '20s'
}

export default function () {
    http.get('https://test.k6.io');

    // exibição
    console.log('- VU stage -');

    // o tempo entre as interações é feita de forma aleatória/randômico
    // variando entre 1 e 5 segundos.
    sleep(randomIntBetween(1, 5));
}