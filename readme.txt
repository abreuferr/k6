1 - Git

# log
#
$ git log
$ git log --oneline

# ir até um determinado commit
#
$ git log --oneline # obter o ID do commit
$ git checkout <ID_COMMIT> # ir até um determi
$ git log --oneline # log
$ git checkout main # ir até o último commit (main)
$ git log --oneline # log

# reverter um determinado commit
#
$ git log --oneline # obter o ID do commit
$ git revert <ID_COMMIT> # reverter um determinado commit
$ git log --oneline # log

# reinicializar a partir de um determinado commit
#
# OS COMMITS FUTUROS SERÃO APAGADOS
#
$ git log --oneline # obter o ID do commit
$ git reset <ID_COMMIT> # reverter um determinado commit
$ git log --oneline # log
