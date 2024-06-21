/*
Title : Random string function
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : geração de uma string de forma aleatória/randômica
Options : https://k6.io/docs/javascript-api/jslib/utils/randomstring/
*/

// importando a bibliotecas HTTP do k6.
import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    // usuários virtuais
    vus: 5,
    // duração das interações
    duration: '20s'
}

export default function () {

    const credentials = {
        // randomString(8) = string randômica de 08 caracteres
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8),
    }

    // exibição do conteúdo da variável "credentials"
    console.log(credentials);

    // cadastrar um usuário
    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}

/*
INFO[0001] {"username":"test_tfzaayfu","password":"secret_gxbwmytx"}  source=console
INFO[0001] {"username":"test_lcweprlk","password":"secret_tzodabdl"}  source=console
INFO[0001] {"username":"test_sooxtjhr","password":"secret_mhnlekcm"}  source=console
INFO[0001] {"username":"test_dvzrlsuk","password":"secret_zlizcmxw"}  source=console
INFO[0001] {"username":"test_xbewskei","password":"secret_pxxjiygq"}  source=console
*/