//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv
const todo = require('./to-do/to-do')
const color = require('colors');

switch (argv._[0]) {
    case 'create':
        var resp = todo.create( argv.description );
        console.log("Crear una nueva tarea", resp );    
        break;
    case 'read':
        var resp = todo.read( argv.id );
        console.log("Leer una tarea", resp );    
        break;
    case 'update':
        var resp = todo.update( argv.id );
        console.log("Actualizar una tarea", resp );
        break;
    case 'delete':
        var resp = todo.deleteTask( argv.id );
        console.log("Eliminar una tarea", resp );    
        break;
    case 'show':
        console.log("Mostrar todas las tareas por hacer", argv.complete );    
        let list = todo.getList( argv.complete );
        for( let task of list ){
            console.log(" ================  TASK ============== ".green);
            console.log(" Description : " + task.description );
            console.log(" Status : "+ task.complete );
            console.log(" Id : "+ task.id );
        }
        break;
    default:
        console.log("El comando no es reconocido");    
        break;
}
