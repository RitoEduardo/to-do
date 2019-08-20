//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv
const todo = require('./to-do/to-do')
const color = require('colors');

fnPrintTask = (task) => {
    console.log(color.yellow(" description : "), color.green(task.description));
    console.log(color.yellow(" completed : "), task.completed ? color.blue(task.completed) : color.gray(task.completed));
    console.log(color.yellow(" id : "), color.red(task.id));
}

switch (argv._[0]) {
    case 'create':
        var resp = todo.create(argv.description, argv.completed === "false" ? false : argv.completed, Number(argv.id));
        fnPrintTask(resp);
        break;
    case 'read':
        var resp = todo.read(argv.id);
        if (resp) {
            fnPrintTask(resp);
        } else {
            console.log(`No se encontro id:${ argv.id }`.red)
        }
        break;
    case 'update':
        var resp = todo.update(argv.id, argv.description, argv.completed === "false" ? false : argv.completed);
        fnPrintTask(resp);
        break;
    case 'delete':
        var resp = todo.deleteTask(argv.id);
        if (resp) {
            console.log(`Se elimino el id:${ argv.id }`.blue)
        } else {
            console.log(`No se encontro id:${ argv.id }`.red)
        }
        break;
    case 'show':
        let list = todo.getList(argv.completed !== undefined ? true : false, argv.completed);
        for (let task of list) {
            console.log(" ================  TASK ============== ".cyan);
            fnPrintTask(task);
        }
        break;
    default:
        console.log("El comando no es reconocido".red);
        break;
}