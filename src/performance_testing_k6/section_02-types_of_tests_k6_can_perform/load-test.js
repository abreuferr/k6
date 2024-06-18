/* 
Title : Load Test
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Simula vários usuários acessando o sistema ao mesmo tempo.
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/ 

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
// importa biblioteca para esperar antes de executar a próxima requisição, isso ajuda a simular o comportamento de usuários reais.
import { sleep } from 'k6';

/*
São executadas três fases neste teste.
1. a primeira carga aumenta gradualmente de 0 para 10 usuários ao longo de 5 segundos.
2. a segunda carga permanece constante em 10 usuários durante 30 segundos.
3. a terceira carga é reduzida gradualmente de 10 para 0 usuários ao longo de 5 segundos.

A primeira e terceira fase devem ser 10% da duração total do teste.
*/

export const options = {
    stages: [
        {
            // duração do teste
            duration: '5s',
            // target = virtual users
            target: 10
        },
        {
            // duração do teste
            duration: '30s',
            // target = virtual users
            target: 10
        },
        {
            // duração do teste
            duration: '5s',
            // target = virtual users
            target: 0
        }
    ]
}

// realiza requisições GET e espera por alguns segundos para fazer a próxima requisição.
export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contacts.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}