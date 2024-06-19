/*
Title : Response Header
Author : "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Obtendo o Header da resposta a uma requisição
Options : https://k6.io/docs/using-k6/http-debugging/
*/

// importando bibliotecas do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    console.log(res.headers);
    // INFO[0001] {"Allow":"GET, HEAD, OPTIONS","X-Frame-Options":"SAMEORIGIN","Date":"Fri, 07 Jun 2024 21:28:26 GMT","Content-Type":"application/json","Content-Length":"70","Connection":"keep-alive","Vary":"Accept"}  source=console

    console.log(res.headers.Allow);
    // INFO[0001] GET, HEAD, OPTIONS

    console.log(res.headers['Content-Type']);
    //INFO[0001] application/json

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile name': (r) => r.json().name === crocodileName
    });

}