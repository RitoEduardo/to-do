//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv
const todo = require('./to-do/to-do')
const color = require('colors');

switch (argv._[0]) {
    case 'create':
        var resp = todo.create( argv.description , argv.completed === "false" ? false : argv.completed, Number( argv.id ) );
        console.log( resp );    
        break;
    case 'read':
        var resp = todo.read( argv.id );
        console.log( resp );    
        break;
    case 'update':
        var resp = todo.update( argv.id , argv.description , argv.completed === "false" ? false : argv.completed );
        console.log( resp );
        break;
    case 'delete':
        var resp = todo.deleteTask( argv.id );
        console.log( resp );    
        break;
    case 'show':
        let list = todo.getList( argv.completed );   
        for( let task of list ){
            console.log(" ================  TASK ============== ".green);
            console.log(" Description : " + task.description );
            console.log(" Completed : "+ task.completed );
            console.log(" Id : "+ task.id );
        }
        break;
    default:
        console.log("El comando no es reconocido");    
        break;
}
