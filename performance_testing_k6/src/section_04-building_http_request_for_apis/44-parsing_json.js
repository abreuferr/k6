/*
Title : Parsing JSON
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Obtendo registro, ${crocodileId} = 7, através da API do protocolo HTTP
Options : 
*/

// importando a bibliotecas HTTP do k6.
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    //console.log(res);
    /*
    Retorna a informação de TODOS os registros.

    INFO[0001] {"remote_ip":"3.235.210.138","remote_port":443,"url":"https://test-api.k6.io/public/crocodiles/","status":200,"status_text":"200 OK","proto":"HTTP/1.1","headers":{"Allow":"GET, HEAD, OPTIONS","X-Frame-Options":"SAMEORIGIN","Date":"Wed, 19 Jun 2024 16:54:53 GMT","Content-Type":"application/json","Content-Length":"609","Connection":"keep-alive","Vary":"Accept"},"cookies":{},"body":"[{\"id\":1,\"name\":\"Bert\",\"sex\":\"M\",\"date_of_birth\":\"2010-06-27\",\"age\":13},{\"id\":2,\"name\":\"Ed\",\"sex\":\"M\",\"date_of_birth\":\"1995-02-27\",\"age\":29},{\"id\":3,\"name\":\"Lyle the Crocodile\",\"sex\":\"M\",\"date_of_birth\":\"1985-03-03\",\"age\":39},{\"id\":4,\"name\":\"Solomon\",\"sex\":\"M\",\"date_of_birth\":\"1993-12-25\",\"age\":30},{\"id\":5,\"name\":\"The gharial\",\"sex\":\"F\",\"date_of_birth\":\"2004-06-28\",\"age\":19},{\"id\":6,\"name\":\"Sang Buaya\",\"sex\":\"F\",\"date_of_birth\":\"2006-01-28\",\"age\":18},{\"id\":7,\"name\":\"Sobek\",\"sex\":\"F\",\"date_of_birth\":\"1854-09-02\",\"age\":169},{\"id\":8,\"name\":\"Curious George\",\"sex\":\"M\",\"date_of_birth\":\"1981-01-03\",\"age\":43}]","timings":{"duration":537.572177,"blocked":304.630098,"looking_up":0,"connecting":138.656528,"tls_handshaking":139.348054,"sending":0.067544,"waiting":537.299687,"receiving":0.204946},"tls_version":"tls1.3","tls_cipher_suite":"TLS_AES_128_GCM_SHA256","ocsp":{"produced_at":0,"this_update":0,"next_update":0,"revoked_at":0,"revocation_reason":"","status":"unknown"},"error":"","error_code":0,"request":{"method":"GET","url":"https://test-api.k6.io/public/crocodiles/","headers":{"User-Agent":["k6/0.51.0 (https://k6.io/)"]},"body":"","cookies":{}}}  source=console
    */
    
    res = http.get('https://test-api.k6.io/public/crocodiles/7/');
    //console.log(res);

    /*
    Retorna a informação somente do registro 7.

    INFO[0003] {"remote_ip":"3.235.210.138","remote_port":443,"url":"https://test-api.k6.io/public/crocodiles/7/","status":200,"status_text":"200 OK","proto":"HTTP/1.1","headers":{"X-Frame-Options":"SAMEORIGIN","Date":"Wed, 19 Jun 2024 16:56:11 GMT","Content-Type":"application/json","Content-Length":"72","Connection":"keep-alive","Vary":"Accept","Allow":"GET, HEAD, OPTIONS"},"cookies":{},"body":"{\"id\":7,\"name\":\"Sobek\",\"sex\":\"F\",\"date_of_birth\":\"1854-09-02\",\"age\":169}","timings":{"duration":155.705463,"blocked":0.006427,"looking_up":0,"connecting":0,"tls_handshaking":0,"sending":0.031232,"waiting":155.563275,"receiving":0.110956},"tls_version":"tls1.3","tls_cipher_suite":"TLS_AES_128_GCM_SHA256","ocsp":{"produced_at":0,"this_update":0,"next_update":0,"revoked_at":0,"revocation_reason":"","status":"unknown"},"error":"","error_code":0,"request":{"method":"GET","url":"https://test-api.k6.io/public/crocodiles/7/","headers":{"User-Agent":["k6/0.51.0 (https://k6.io/)"]},"body":"","cookies":{}}}  source=console
    */
   
    // Retorna um JSON, um objeto JavaScript
    console.log(res.json().name);
    /*
    {"id":7,"name":"Sobek","sex":"F","date_of_birth":"1854-09-02","age":169}  group= iter=0 request_id=3cab51b7-9fa1-4792-6b15-3126e2a33109 scenario=default source=http-debug vu=1
    */

    // 

    check(res, {
        /*
        Verificar se o registro existe ${crocodileId}=7, se sim, retorna o código 200
            ✓ status is 20

        Verificar se o registro existe ${crocodileId}=700, se sim, retorna o código 200
            ✗ status is 200
            ↳  0% — ✓ 0 / ✗ 1
        */
        'status is 200': (r) => r.status === 200,

        /* 
        Verifica se o registro ${crocodileId}=7 possui o name 'Sobek'
            ✓ Crocodile is Sobek
        Verifica se o registro ${crocodileId}=6 possui o name 'Sobek'
            {"id":6,"name":"Sang Buaya","sex":"F","date_of_birth":"2006-01-28","age":18}  group= iter=0 request_id=93742432-0eae-4957-64cd-b400519a6991 scenario=default source=http-debug vu=1
            INFO[0005] Sang Buaya                                    source=console

            ✓ status is 200
            ✗ Crocodile is Sobek
            ↳  0% — ✓ 0 / ✗ 1     ✗ Crocodile is Sobek
        */
        'Crocodile is Sobek': (r) => r.json().name === 'Sobek'
    });
}