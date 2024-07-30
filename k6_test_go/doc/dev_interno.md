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