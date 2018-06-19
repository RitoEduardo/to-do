
const base = {
    description : {
        alias : 'd',
        desc : "Description of the Task to do"
    },
    complete : {
        alias : 'c', 
        default : true 
    },
    task : {
        alias : 't'
    }
};

//base.description.demand = true
//delete base.description.demand;
const argv = require('yargs').command("create","Create a new task", base )
                .command("reed","Read a task", base )
                .command("update","Update a task", base )
                .command("delete","Delete a task", base )
                .command("show","Show all tasks for pending", base )
                .help()
                .argv;

module.exports = {
    argv
}