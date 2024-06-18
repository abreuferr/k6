/* 
Title : Soak Test
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Testa como o sistema se saí em um período maior com vários usuários acessando ao mesmo tempo, 
útil para identificar vazamentos de memória e esgotamento de recursos que podem aparecer após períodos maiores e de uso contínuo.
Options : https://www.udemy.com/share/109KKU3@_qDcx1bxacvVc_FBZVt9x_-QCPnIfWNlQ2LGowlyqB3VLryCfCbgULGx0_j9_sQJlQ==/
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
// importa biblioteca para esperar antes de executar a próxima requisição, isso ajuda a simular o comportamento de usuários reais.
import { sleep } from 'k6';

/*
São executadas três fases neste teste.
1. a primeira carga aumenta gradualmente de 0 para 1000 usuários ao longo de 48 minutos.
2. a segunda carga permanece constante em 1000 usuários durante 8h.
3. a terceira carga é reduzida gradualmente de 1000 para 0 usuários ao longo de 48 minutos.

A primeira e terceira fase devem ser 10% da duração total do teste.
*/

// importante: não é indicado enviar grandes volumes de cargas para a API de teste do k6, é apenas um exemplo.
export const options = {
    stages: [
        {
            // duração do teste
            duration: '5m',
            // target = virtual users
            target: 1000
        },

        // Parte principal do teste, onde o problema pode aparecer somente depois de um logo
        // período de teste, espaço em disco rígido, vazamento de memória.
        {
            // duração do teste
            duration: '8h',
            // target = virtual users
            target: 1000
        },

        {
            // duração do teste
            duration: '5m',
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