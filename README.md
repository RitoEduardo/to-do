# to-do

Instalar dependencias:

```
npm install
```

Probar el programa:

```
node app --help
```

Ejemplos:

```
node app create --id=3 -d="Craer programa"
node app create -d "Pasear al perro"
node app read -i 3
node app update -i 1 --completed=true
node app delete -i 5
```

Mostrar todas la lista de tareas:

```
node app show
```