/*
Title : HTTP Get
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
Description : Obtendo dados através da API do protocolo HTTP
Options : https://k6.io/docs/using-k6/http-debugging/
*/

// importando a bibliotecas HTTP do k6.
import http from 'k6/http';

export default function () {
    // Requisição do tipo GET em uma API(https://test-api.k6.io/public/crocodiles/)
    const res = http.get('https://test-api.k6.io/public/crocodiles/');

    // Exibir o resultado da requisição GET
    console.log(res);
}

/*
1 - O comando abaixo pode ser utilizado para o debug da resposta da requisição HTTP
    $ k6 run --http-debug example.js
    $ k6 run --http-debug=full example.js

2 - equivalência
    console.log(res) = --http-debug
*/