/* 
Title : Making HTTP Requests with K6
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description :
Options : 
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';

export default function () {
    // armazenando o resultado http.get na variável res
    const res = http.get('https://test.k6.io/');

    // INFO[0001] 200 - existe a url "res"
    // INFO[0001] 404 - não existe a url "res"
    console.log(res.status);

    // exibe o código html da url "res"
    console.log(res.body)
}