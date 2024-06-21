/* 
Title : Tipos de Testes
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Tipos de testes que podem ser executados com a ferramenta k6
Options : 
*/

# Tipos de testes
Avaliar os tipos de testes e quais são uma boa opção para o benchmark do Go Windows.

## Load Test
Simula vários usuários acessando o sistema ao mesmo tempo.

## Stress Test
Leva o sistema ao seu ponto de ruptura. Avalia o desempenho do sistema com cargas maiores que o normal.

## Spike Test
Aumenta e diminuí repentinamente a carga no sistema. Útil para identificar cenários em que o sistema tem um aumento repentino, além do tráfego normal. Avalia a capacidade do sistema de lidar com aumentos inesperados e como ele se recupera.

## Smoke Test
Testa se o script escrito funciona de acordo com o esperado. Deve ser realizado antes de testes mais aprofundados.

## Breakpoint Test
Testa a capacidade máxima de um sistema, aumentando gradualmente a carga para um valor alto até que o aplicativo comece a quebrar, é necessário ser interrompido manualmente.

## Soak Test
Testa como o sistema se saí em um período maior com vários usuários acessando ao mesmo tempo, útil para identificar vazamentos de memória e esgotamento de recursos que podem aparecer após períodos maiores e de uso contínuo.

# VUs
Cada usuário virtual usa 5MB de memória.