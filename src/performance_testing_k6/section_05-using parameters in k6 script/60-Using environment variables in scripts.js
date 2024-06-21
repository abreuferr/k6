/*
Title : Using environment variables in scripts
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : utilização de variáveis de ambiente
Options : https://k6.io/docs/using-k6/environment-variables/
*/

// importando a bibliotecas HTTP do k6.
import http from 'k6/http';

export default function () {

    console.log(__ENV.BASE_URL);

    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}

/*
k6 -e BASE_URL=https://test-api.k6.io run env-var.js 
*/