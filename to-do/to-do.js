const fs = require('fs');

let listTo = [];

const loadDB = () => {
    try {
        listTo = require('../db/data.json');    
    } catch (error) {
        listTo = [];
    }
}

const saveDB = () => {
    let data = JSON.stringify(listTo);
    fs.writeFile( './db/data.json', data, (err) => {
        if (err) throw err;
    });
}

const create = (description, complete = false, id = 0 ) => {
    loadDB();
    var _id = 1;
    if( id ){
        _id = id;
        let task = read( id );
        if( task ){
            return "ID is Already Assigned";
        }
    }else{
        let index = listTo.length;   
        if( index ){
            _id = listTo[index-1]['id'] + 1;
        }
    }
    let task = {
        id : _id, 
        description,
        completed : Boolean(complete)
    }
    listTo.push( task );
    saveDB()
    return task;
};

const read = ( id ) => {
    loadDB();
    let index = listTo.findIndex( task => task.id === id );    
    if( index > -1 )
        return listTo[index]
    else
        return undefined;
}

const update = ( id, description, completed = true ) => {
    
    loadDB();
    let task = read( id );
    if( task ){
        task.completed = completed;
        if( description ){
            task.description = description;
        }
        saveDB();
        return task;
    }
    return " Tarea no encontrada";
}

const deleteTask = ( id ) => {
    loadDB();
    let index = listTo.findIndex( task => task.id === id );    
    let resp = listTo.splice( index, 1 );
    if( resp.length ){
        saveDB();
        return true;
    }
    return false;
}

const getList = ( completed = false ) => {
    loadDB();
    if( completed && completed !== "false" ){
        let listC = listTo.filter( task => task.completed === true );
        return listC;
    }
    return listTo;
}

module.exports = {
    create,
    read,
    update,
    deleteTask,
    getList
}