/*
Title : HTTP Get (debug)
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Obtendo dados através da API do protocolo HTTP
Options : https://test-api.k6.io/
          https://k6.io/docs/using-k6/http-debugging/
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

3 - resultado da execução do JS

INFO[0000] Request:
GET /public/crocodiles/ HTTP/1.1
Host: test-api.k6.io
User-Agent: k6/0.51.0 (https://k6.io/)
Accept-Encoding: gzip

  group= iter=0 request_id=46d6dc65-51ea-43b2-565a-23afae2cb2ec scenario=default source=http-debug vu=1
INFO[0001] Response:
HTTP/1.1 200 OK
Content-Length: 609
Allow: GET, HEAD, OPTIONS
Connection: keep-alive
Content-Type: application/json
Date: Wed, 19 Jun 2024 16:39:38 GMT
Vary: Accept
X-Frame-Options: SAMEORIGIN

  group= iter=0 request_id=46d6dc65-51ea-43b2-565a-23afae2cb2ec scenario=default source=http-debug vu=1
INFO[0001] {"remote_ip":"18.208.91.74","remote_port":443,"url":"https://test-api.k6.io/public/crocodiles/","status":200,"status_text":"200 OK","proto":"HTTP/1.1","headers":{"X-Frame-Options":"SAMEORIGIN","Date":"Wed, 19 Jun 2024 16:39:38 GMT","Content-Type":"application/json","Content-Length":"609","Connection":"keep-alive","Vary":"Accept","Allow":"GET, HEAD, OPTIONS"},"cookies":{},"body":"[{\"id\":1,\"name\":\"Bert\",\"sex\":\"M\",\"date_of_birth\":\"2010-06-27\",\"age\":13},{\"id\":2,\"name\":\"Ed\",\"sex\":\"M\",\"date_of_birth\":\"1995-02-27\",\"age\":29},{\"id\":3,\"name\":\"Lyle the Crocodile\",\"sex\":\"M\",\"date_of_birth\":\"1985-03-03\",\"age\":39},{\"id\":4,\"name\":\"Solomon\",\"sex\":\"M\",\"date_of_birth\":\"1993-12-25\",\"age\":30},{\"id\":5,\"name\":\"The gharial\",\"sex\":\"F\",\"date_of_birth\":\"2004-06-28\",\"age\":19},{\"id\":6,\"name\":\"Sang Buaya\",\"sex\":\"F\",\"date_of_birth\":\"2006-01-28\",\"age\":18},{\"id\":7,\"name\":\"Sobek\",\"sex\":\"F\",\"date_of_birth\":\"1854-09-02\",\"age\":169},{\"id\":8,\"name\":\"Curious George\",\"sex\":\"M\",\"date_of_birth\":\"1981-01-03\",\"age\":43}]","timings":{"duration":151.084174,"blocked":414.285668,"looking_up":0,"connecting":138.426752,"tls_handshaking":139.421973,"sending":0.033904,"waiting":150.784743,"receiving":0.265527},"tls_version":"tls1.3","tls_cipher_suite":"TLS_AES_128_GCM_SHA256","ocsp":{"produced_at":0,"this_update":0,"next_update":0,"revoked_at":0,"revocation_reason":"","status":"unknown"},"error":"","error_code":0,"request":{"method":"GET","url":"https://test-api.k6.io/public/crocodiles/","headers":{"User-Agent":["k6/0.51.0 (https://k6.io/)"]},"body":"","cookies":{}}}  source=console
*/