/* 
Title : Custom Metrics
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : São utilizados para definir limites aceitáveis em relação as métricas de teste. 
              Caso não atenda as métricas especificadas o teste terminará com status de falha.
Options : https://k6.io/docs/using-k6/metrics/create-custom-metrics/
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics'; // Contador

export const options = {
    //quantidade usuário virtuais
    vus: 10,

    // duração do teste
    duration: '10s',

    // Condições para que o teste possa ser executado de forma satisfatória
    thresholds: {
        // o tempo de duração da requisição http em p(95) deve ser menor que 300ms, caso contrário haverá um erro
        http_req_duration: ['p(95)<300'],

        // definir valor mínimo da variável my_counter
        //  ✓ my_counter.....................: 50     4.361593/s. Deu certo pois o valor mínimo são 10 interações
        my_counter: ['count>10']
    }
}

// definindo a variável
let myCounter = new Counter('my_counter');

export default function () {
    // realiza requisições GET e realiza duas verificações na resposta.
    const res = http.get('https://test.k6.io/'); 

    /* 
    realiza a função de iteração
        ✓ my_counter.....................: 50     4.258093/s
    foram realizadas 50 interações, contador.
    */

    myCounter.add(1); // realizar incremento no contador
    sleep(2);
}