/*
Title : HTTP Get
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
3 - resultado da execução do JS
INFO[0001] {"remote_ip":"18.208.91.74","remote_port":443,"url":"https://test-api.k6.io/public/crocodiles/","status":200,"status_text":"200 OK","proto":"HTTP/1.1","headers":{"Date":"Wed, 19 Jun 2024 14:47:59 GMT","Content-Type":"application/json","Content-Length":"609","Connection":"keep-alive","Vary":"Accept","Allow":"GET, HEAD, OPTIONS","X-Frame-Options":"SAMEORIGIN"},"cookies":{},"body":"[{\"id\":1,\"name\":\"Bert\",\"sex\":\"M\",\"date_of_birth\":\"2010-06-27\",\"age\":13},{\"id\":2,\"name\":\"Ed\",\"sex\":\"M\",\"date_of_birth\":\"1995-02-27\",\"age\":29},{\"id\":3,\"name\":\"Lyle the Crocodile\",\"sex\":\"M\",\"date_of_birth\":\"1985-03-03\",\"age\":39},{\"id\":4,\"name\":\"Solomon\",\"sex\":\"M\",\"date_of_birth\":\"1993-12-25\",\"age\":30},{\"id\":5,\"name\":\"The gharial\",\"sex\":\"F\",\"date_of_birth\":\"2004-06-28\",\"age\":19},{\"id\":6,\"name\":\"Sang Buaya\",\"sex\":\"F\",\"date_of_birth\":\"2006-01-28\",\"age\":18},{\"id\":7,\"name\":\"Sobek\",\"sex\":\"F\",\"date_of_birth\":\"1854-09-02\",\"age\":169},{\"id\":8,\"name\":\"Curious George\",\"sex\":\"M\",\"date_of_birth\":\"1981-01-03\",\"age\":43}]","timings":{"duration":364.373315,"blocked":411.169905,"looking_up":0,"connecting":138.887198,"tls_handshaking":143.647614,"sending":0.047599,"waiting":364.086588,"receiving":0.239128},"tls_version":"tls1.3","tls_cipher_suite":"TLS_AES_128_GCM_SHA256","ocsp":{"produced_at":0,"this_update":0,"next_update":0,"revoked_at":0,"revocation_reason":"","status":"unknown"},"error":"","error_code":0,"request":{"method":"GET","url":"https://test-api.k6.io/public/crocodiles/","headers":{"User-Agent":["k6/0.51.0 (https://k6.io/)"]},"body":"","cookies":{}}}  source=console
*/