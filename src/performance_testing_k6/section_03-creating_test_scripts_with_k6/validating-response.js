
// importa a biblioteca HTTP do k6.
import http from 'k6/http';
/* 
As chaves {} em volta do 'check' importa apenas a função check do módulo k6.
Usada para fazer verificações na resposta da requisição.
*/
import { check } from 'k6';

export default function () {
    // Realiza uma requisição GET para 'https://test.k6.io/' e armazena a resposta em 'res'.
    /* importante: use uma outra página para testar se o script está correto, 
       uma página por exemplo https://test.k6.io/contacts.php, 
       não deve retornar que é a página inicial pois ela não é, 
       ela é válida e retonará o código 200 mas não inclui o texto da página inicial.*/
    const res = http.get('https://test.k6.io/');
    check(res, {
        /*é importante ter atenção aos sinais de igual =, pois irá retonar uma resposta incorreta se tiver apenas um sinal de =,
         será um falso 200 pois não houve comparação e sim atribuição do valor 200. 
         O correto são três sinais de === para fazer uma comparação. */
        'status is 200': (r) => r.status === 200
    });
    // deve-se verificar se a página que retonou o código 200 contém o texto específico no corpo. O que confirma que é a página correta.
    check(res, {
        // esta parte 'r.body.includes' irá verificar se o corpo (body) da resposta contém o texto específico. Se contiver, mostrará 'page is startpage'.
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages') === true
    });

    // outra maneira é fazer a verificação em um unico bloco, por exemplo:
    /*
    check(res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
    });
    */
}

