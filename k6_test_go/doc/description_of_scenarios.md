/* 
Title : Testes
Author : "Caio Abreu Ferreira" <abreuferr@gmail.com>
Description : Descrição dos cenários de testes
Options : 
*/

# Descrição dos cenários de testes

## Requisitos

Para os testes iniciais iremos utilizar o que a documentação sugere para um melhor desempenho, e aumentar ou diminuir os recursos de acordo com o resultado dos testes.

- VM senhasegura
    - 8 CPUs
    - 16 Memória ram

- Link da documentação: [Virtual Appliances - Requirements](https://docs.senhasegura.io/docs/installation-virtual-appliances)

- 700 credenciais

## Endpoint

O Endpoint base sempre tem estas informações e depois os parâmetros do endpoint são adicionados.
- https://10.66.39.55/api/client-manager

Por exemplo no vault se adiciona "vault/credentials" no final, ficando assim:
- https://10.66.39.55/api/client-manager/vault/credentials

## Sincronismo de credenciais

- **Endpoint**: https://10.66.39.55/api/client-manager/vault/credentials

Após obter o **client_id** e **client_secret** e gerar o **Bearer token**, ele pode ser utilizado nas próximas requisições.

Realizar 30 requisições e apenas 30 iterações e após serem feitas uma única vez cada requisição deve retornar quais requisições foram concluídas e quantas falharam e após falhar não tentar refazer a mesma requisição com o mesmo usuário virtual e passar para o próximo.

O objetivo é que caso o usuário 1 não consiga realizar a requisição passe para o usuário 2 e assim por diante, e contabilize quantos dos 30 usuários conseguiram e não conseguiram realizar a requisição com sucesso.

# Dimensionar quantidade de hardware/recursos
Utilizando usuários virtuais conseguimos simular está qunatidade de workstations fazendo requisições ao mesmo tempo para o cofre senhasegura e determinar a quantidade de recursos necessário de acordo com a quantidade de usuários.

## Quantidade de workstations/usuários
- 100
- 200
- 500
- 1000
- 1000

# Quais funcionalidades serão testadas?

- Elevação de privilégio
- Listas de acesso
- Bloqueio de processos
- Controle de processos pais e filhos
- Go Shell  (gestão de comandos no prompt controlado)
- Processo de instalação em lote
- Gravação de Sessão

## Para aumentar e diminuir o número de credenciais

Na planilha modelo com os dados dos dispositivos e credenciais preenchidos, altere na seção "Informações da credencial" na coluna "Situação*" coloque "Ativo" para ativar credenciais ou "Inativa" para inativar credenciais. Caso a credencial não exista ela será adicionada, e caso já exista será apenas atualizada com o novo status.

Passo a passo para importar os dados da planilha:

1. Acesse o cofre
2. No menu de módulos clique em "Dispositivos"
3. Em "Dispositivos" clique na opção "Importação em lote"
4. No menu de ações clique em "Importar"
5. Clique em "Planilha de dispositivos"
6. Clique em "Importar dados"

## Monitorar logs no servidor

```
tail -f /var/log/messages /var/log/syslog | ccze -A
```

##  Variáveis Kong

Ao declarar variáveis no kong verifique o tipo de conteúdo, caso seja um número não adicione aspas, exemplo:
```
KONG_NGINX_WORKER_PROCESSES=1
```

E caso seja uma string use aspas, exemplo:

```
KONG_NGINX_WORKER_PROCESSES=auto
```