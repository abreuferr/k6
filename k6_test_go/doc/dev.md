
# GIT

# Desenvolvimento

#### Certifique-se de estar na branch dev

```$ git checkout dev```

#### Sincronimo da branch DEV remota com a local

```$ git pull origin dev```

#### Resolva conflitos se houver

```$ git add <arquivo_resolvido>```

```$ git commit -m "Resolvendo conflitos da mesclagem"```

#### Opcional mas recomendado

```$ git push origin dev```

# Produção

#### Vá para a branch main

```$ git checkout main```

#### Opcional mas recomendado

```$ git pull origin main```

#### Mescle as alterações da branch dev

```$ git merge dev```

#### Suba as alterações para a branch main no repositório remoto

```$ git push origin main```

# Cabeçalho (Modelo)

```
/* 
Title : Credencials Check
Author : "Janaína de Jesus Nascimento" <jnascimento@senhasegura.com>
         "Caio Abreu Ferreira" <cferreira@senhasegura.com>
Description : Este programa tem por objetivo o de exibir a quantidade de 
              credenciais que estão associados a um usuário.=
Options : 
*/
```

# Funções

- Função utilizada para obter as credenciais de acesso
```
getClientCredentials(clientAlias, client, device, users)
	url
	body
	params
return { clientId, clientSecret }
```

- Função utilizada para obter o token de acesso
```
getAccessToken(clientId, clientSecret)
	url
	body
	params
return { accessToken }
```

- Função utilizada para obter as credenciais de acesso
```
getAllCredentials(domain, username, accessToken)
	url
	body
	params
return { credentials }
```

- Função utilizada para obter as políticas
```
getAllPolicies(domain, username, accessToken)
	url
	body
	params
return { policies }
```

- Função utilizada para obter a quantidade de credenciais associadas a um usuário
```
processAndCountCredentials(credentials)
return count;
```