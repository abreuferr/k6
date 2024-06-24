/* 
Title : Tags
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Utilização de tags
Options : "https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/"
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';

export const options = {
    // Condições para que o teste possa ser executado de forma satisfatória
    thresholds: {
        // o tempo de duração da requisição http em p(95) deve ser menor que 300ms, caso contrário haverá um erro.
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000']
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/8e6423ec-6fdc-424c-960b-2b5d54748a14'); 
    http.get('https://run.mocky.io/v3/a796a193-ceb8-4df5-8a50-3438a4cf90d4?mocky-delay=100ms'); 
}

/* 
✓ http_req_duration..............: avg=261.69ms min=212ms    med=261.69ms max=311.37ms p(90)=301.43ms p(95)=306.4ms 
    { expected_response:true }...: avg=261.69ms min=212ms    med=261.69ms max=311.37ms p(90)=301.43ms p(95)=306.4ms 
  ✓ { status:200 }...............: avg=212ms    min=212ms    med=212ms    max=212ms    p(90)=212ms    p(95)=212ms   
  ✓ { status:201 }...............: avg=311.37ms min=311.37ms med=311.37ms max=311.37ms p(90)=311.37ms p(95)=311.37ms
*/