
const base = {
    description : {
        alias : 'd',
        desc : "Description of the Task to do"
    },
    completed : {
        alias : 'c'
    },
    id : {
        demand : true
    }
};

let extend = function(from, to){
    if (from == null || typeof from != "object") return from;
    if (from.constructor != Object && from.constructor != Array) return from;
    if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
        from.constructor == String || from.constructor == Number || from.constructor == Boolean)
        return new from.constructor(from);

    to = to || new from.constructor();

    for (var name in from){
        to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
    }
    return to;
}

const argv = require('yargs').command("create","Create a new task", ( (obj) => { 
                        obj.description.demand = true;
                        obj.completed.default = false;
                        delete obj.id.demand;
                        return obj; })( extend(base) ) )
                .command("read","Read a task", base )
                .command("update","Update a task", ( (obj) => { 
                    obj.completed.default = true; 
                    return obj; })( extend(base) ) )
                .command("delete","Delete a task", base )
                .command("show","Show all tasks for pending", ( (obj) => { 
                    delete obj.id; 
                    return obj; })( extend(base) ) )
                .help()
                .argv; 

module.exports = {
    argv
}