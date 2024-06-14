/*
Title : HTTP Get
Author : "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Obtendo registro, ${crocodileId}, através da API do protocolo HTTP
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
          https://k6.io/docs/using-k6/http-debugging/
*/

// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    // URL de acesso a API
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    // Definindo valores para as variáveis/constantes
    const crocodiles = res.json();
    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    //console.log(res.json().name);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile name ': (r) => r.json().name === crocodileName
    });
}