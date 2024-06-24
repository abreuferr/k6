/* 
Title : Life Cycles 
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : 
Options : 
*/

// importa a biblioteca HTTP do k6.
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    //usuário virtual
    vus: 1,
    // duração do teste
    duration: '5s'
}

/* 
Estágio inicial
- importando as bibliotecas do K6
- definir as variáveis "vus" e "duration"
- carregar arquivos do sistema e arquivos locais
*/
console.log(' -- init stage --');

export default function (data) {
    console.log('-- VU stage --');
    sleep(1);
}

/* 
Estágio de configuração
- 
*/
export function setup() {
    console.log('-- setup stage --');
    sleep(10);
    const data = { foo: 'bar' };
    return data;
}

export function teardown(data) {
    console.log('-- Teardown stage --');
}

/*
INFO[0000]  -- init stage --                             source=console
INFO[0000]  -- init stage --                             source=console
INFO[0000] -- setup stage --                             source=console
INFO[0010] -- VU stage --                                source=console
INFO[0011] -- VU stage --                                source=console
INFO[0012] -- VU stage --                                source=console
INFO[0013] -- VU stage --                                source=console
INFO[0014] -- VU stage --                                source=console
INFO[0015]  -- init stage --                             source=console
INFO[0015] -- Teardown stage --                          source=console
INFO[0015]  -- init stage --                             source=console

     █ setup

     █ teardown

     data_received........: 0 B 0 B/s
     data_sent............: 0 B 0 B/s
     iteration_duration...: avg=2.14s min=32.3µs med=1s max=10s p(90)=4.6s p(95)=7.3s
     iterations...........: 5   0.333224/s
     vus..................: 1   min=0      max=1
     vus_max..............: 1   min=1      max=1

*/