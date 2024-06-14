// Title : Thresholds
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : São utilizados para definir limites aceitáveis em relação as métricas de teste. 
//              Caso não atenda as métricas especificadas o teste terminará com status de falha.
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
    //quantidade usuário virtuais
    vus: 10,

    // duração do teste
    duration: '10s',
    
    thresholds: {
        // o tempo de duração da requisição http em p(95) deve ser menor que 300ms, caso contrário haverá um erro.
        http_req_duration: ['p(95)<300'],

        // definir valor mínimo da variável my_counter
        // ✗ my_counter.....................: 50     4.361593/s. Deu errado pois o valor mínimo são 50 interações (prático)
        my_counter: ['count>10']
    }
}

// definindo a variável
let myCounter = new Counter('my_counter');

export default function () {
    // realiza requisições GET e realiza duas verificações na resposta.
    const res = http.get('https://test.k6.io/'); 

    // realiza a função de iteração
    // ✓ my_counter.....................: 50     4.258093/s
    // foram realizadas 50 interações, contador.
    myCounter.add(1);
    sleep(2);
}