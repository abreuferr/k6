/* 
Title : Thresholds
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Thresholds: São utilizados para definir limites aceitáveis em relação as métricas de teste. 
              Caso não atenda as métricas especificadas o teste terminará com status de falha.
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/

// importa bibliotecas do k6
import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

// biblioteca utilizada para obter informações sobre a execução do k6
import exec from 'k6/execution';

export const options = {
    //quantidade usuário virtuais
    vus: 10,

    // duração do teste
    duration: '10s',
    
    //limites aceitáveis, para ver outras métricas que são aceitas veja a doc: "https://grafana.com/docs/k6/latest/using-k6/metrics/reference/"
    thresholds: {
        // o tempo de duração da requisição http em p(95) deve ser menor que 300ms, caso contrário haverá um erro.
        http_req_duration: ['p(95)<300'],

        // o tempo máximo de duração para uma requisição deve ser menor que 2 segundos.
        http_req_duration: ['max<2000'],

        // a quantidade de erros HTTP deve ser inferior a 3%.
        // ✓ http_req_failed................: 2.00%  ✓ 1        ✗ 49
        http_req_failed: ['rate<0.03'],

        // essa métrica define que devem ocorrer mais de 20 requisições.
        // ✓ http_reqs......................: 50     4.375327/s
        http_reqs: ['count>20'],

        // essa métrica defina que a quantidade de requisições por segundo deve ser maior que 4 para ser aceitável.
        http_reqs: ['rate>4'],

        // define que deve ter pelo menos 9 usuários ou mais para ser aceitável.
        // ✓ vus............................: 10     min=10     max=10
        vus: ['value>9'],

        // está métrica significa que caso uma requisição falhe é aceitável.
        // ✓ checks.........................: 98.00% ✓ 98       ✗ 2
        checks: ['rate>=0.98']
    }
}

export default function () {
    /* 
    realiza requisições GET e realiza duas verificações na resposta.
    ✗ status is 200
    ↳  97% — ✓ 45 / ✗ 1
    ✗ page is startpage
    ↳  97% — ✓ 45 / ✗ 1
    */
    const res = http.get('https://test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : '')); // simula que uma requisição falhou.

    // mostra a quantidade de iterações na saída.
    console.log(exec.scenario.iterationInTest);

    // Verifica a existencia de uma URL e verifica o conteúdo
    check(res, {
        // Verifica se a URL https://test.k6.io existe (200)
        'status is 200': (r) => r.status === 200,

        // Verifica se a string "Collection of simple web-pages" esta presente na URL https://test.k6.io/
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });
    sleep(2);
}
