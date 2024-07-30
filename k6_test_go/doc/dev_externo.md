# Funções

## Autenticação

#### Função utilizada para obter as credenciais de acesso
```
getClientIDandClientSecret(BASE_URL, BOOTSTRAP_TOKEN, clientAlias, client, device, users)
return { clientId, clientSecret }
```

#### Função utilizada para obter o token de acesso
```
getAccessToken(BASE_URL, clientId, clientSecret)
return { accessToken }
```
## Credencial

#### Função utilizada para obter as credenciais de acesso
```
getCredentials(BASE_URL, domain, username, accessToken)
return { credentials }
```
## Política

#### Função utilizada para obter as políticas
```
getPolicies(BASE_URL, domain, username, accessToken)
return { policies }
```

#### Função utilizada para obter a quantidade de políticas associadas a um usuário
```
countPolicies(policies)
return countPolicies;
```

## Parâmetro

#### Função utilizada para coletar os parâmetros utilizados pelo senhasegura EPM Client.
```
getParams(domain, username, accessToken)
return { data }
```
#### Função conta a quantidade de parâmetros que retorna na resposta.
```
function countParams(params)
return { data }
```

#### Função conta a quantidade de parâmetros que retorna na resposta.
```
getPoliciescountParams(params)
return countParams
```
## File Commands

#### Função que realiza uma requisição para obter os comandos do sistema.
```
getSystemFileCommands(domain, username, accessToken)
return { data }
```
#### Função conta a quantidade de comandos do sistema retornam.
```
countSystemFileCommands(domain, username, accessToken)
return { data }
```

## Geral

#### Função referente a atualização do cliente
```
countSystemFileCommands(system_file_commands)
return { count }
```
