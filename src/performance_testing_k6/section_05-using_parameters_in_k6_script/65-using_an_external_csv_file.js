/*
Title : Using an external CSV file
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Visualizar os dados que estão armazenados em um arquivo CSV
Options : https://k6.io/docs/examples/data-parameterization/#from-a-csv-file
          https://www.papaparse.com/
*/

// importando a bibliotecas do k6.
// papaparse é uma biblioteca de terceiros cujo objetivo é o de ler e converter arquivos CSV em JSON
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

/* 
Matriz compartilhada. A matriz é compartilhada com todos os usuários virtuais. Essa
matriz é compartilhada com todos os usuários.
Essa tecnologia é utilizada para evitar problema de memória.
*/

// Dados obtidos do arquivo "65-users.csv" e armazenados no array "userCredentials"
const userCredentials = new SharedArray('users with credentials', function () {
    return papaparse.parse(open('./65-users.csv'), { header: true }).data;
});

export default function () {
    // exibir as informações que estão armazenados em um arquivo CSV
    userCredentials.forEach((item) => console.log(item.username));
}

/*
INFO[0000] test_xjzqabet                                 source=console
INFO[0000] test_rdsdvgou                                 source=console
INFO[0000] test_fgoornir                                 source=console
INFO[0000] test_unmbxmms                                 source=console
INFO[0000] test_szhrluli                                 source=console
INFO[0000] test_wtdwuouo                                 source=console
INFO[0000] test_bdzlleqx                                 source=console
INFO[0000] test_hbmcpcpp                                 source=console
INFO[0000] test_vzvlnqzm                                 source=console
*/