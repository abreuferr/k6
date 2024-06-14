// Title : Status
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : 
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';

// realiza uma requisição GET para a API de testes.
export default function () {
    // manipulacao de variavel
    const res = http.get('https://test.k6.io');
    const res_wrong = http.get('https://test.k6.io/foo.html');

    // retorna o status da requisicao "res"
    // "INFO[0001] 200                                           source=console"
    console.log(res.status)

    // retorna o status da requisicao "res_wrong"
    //INFO[0001] 404                                           source=console
    console.log(res_wrong.status)

    // retorna o codigo html da requisicao
    console.log(res.body)
    sleep(1);
}