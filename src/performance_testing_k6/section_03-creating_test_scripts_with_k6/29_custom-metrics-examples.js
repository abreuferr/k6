/* 
Title : Custom Metrics
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : São utilizados para definir limites aceitáveis em relação as métricas de teste. 
              Caso não atenda as métricas especificadas o teste terminará com status de falha.
Options : Exemplo de respostas que podem ser utilizadas para criar métricas personalizadas, 
          doc: "https://k6.io/docs/javascript-api/k6-http/response/"
*/

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

    // Condições para que o teste possa ser executado de forma satisfatória
    thresholds: {
        // o tempo de duração da requisição http em p(95) deve ser menor que 300ms, caso contrário haverá um erro.
        http_req_duration: ['p(95)<300'],
        my_counter: ['count>10'],
        // o p(99) não aparecerá no relatório por padrão, caso a métrica não seja atendida irá retornar um erro.
        // ERRO[0014] thresholds on metrics 'response_time_news_page' have been crossed
        response_time_news_page: ['p(95)<160', 'p(99)<200']
    }
}

// definindo a variável "myCounter"
let myCounter = new Counter('my_counter');
// definindo a variável "newsPageResponseTrend"
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function () {
    // realiza requisições GET e realiza duas verificações na resposta.
    let res = http.get('https://test.k6.io/'); 

    // incremento na variável "myCounter"
    myCounter.add(1);

    // espera 01s para a próxima requisição
    sleep(1);

    res = http.get('https://test.k6.io/news.php'); 
    newsPageResponseTrend.add(res.timings.duration);

    // espera 01s para a próxima requisição
    sleep(1);
}

/*
   ✓ http_req_duration..............: avg=150.52ms   min=138.06ms   med=140.89ms   max=278.23ms   p(90)=145.3ms    p(95)=275.74ms  
       { expected_response:true }...: avg=150.52ms   min=138.06ms   med=140.89ms   max=278.23ms   p(90)=145.3ms    p(95)=275.74ms  
   ✓ my_counter.....................: 50     4.128543/s
   ✓ response_time_news_page........: avg=140.923759 min=138.060015 med=140.220915 max=147.716279 p(90)=143.619597 p(95)=144.605742
*/