// Title : Thresholds
// Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
// Description : São utilizados para definir limites aceitáveis em relação as métricas de teste. 
//              Caso não atenda as métricas especificadas o teste terminará com status de falha.
// Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/

// Exemplo de respostas que podem ser utilizadas para criar métricas personalizadas, doc: "https://grafana.com/docs/k6/latest/javascript-api/k6-http/response/"

// testar criação com está métrica "Response.timings.tls_handshaking"

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep } from 'k6';
// métricas personalizadas que podem ser adicionadas (Counter, Gauge, Rate e Trend). 
// Mais informações na doc: "https://grafana.com/docs/k6/latest/javascript-api/k6-metrics/"
import { Counter, Trend } from 'k6/metrics';

export const options = {

    //quantidade usuário virtuais
    vus: 10,

    // duração do teste
    duration: '10s',

    thresholds: {
        // o tempo de duração da requisição http em p(95) deve ser menor que 300ms, caso contrário haverá um erro.
        http_req_duration: ['p(95)<300'],
        my_counter: ['count>10'],
        response_time_news_page: ['p(95)<160', 'p(99)<100'] // o p(99) não aparecerá no relatório por padrão, caso a métrica não seja atendida irá retornar um erro.
    }
}

// definindo a variável
let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function () {
    // realiza requisições GET e realiza duas verificações na resposta.
    let res = http.get('https://test.k6.io/'); 
    // realiza a função de iteração 
    myCounter.add(1);
    sleep(1);

    res = http.get('https://test.k6.io/news.php'); 
    newsPageResponseTrend.add(res.timings.duration);
    sleep(1);
}
