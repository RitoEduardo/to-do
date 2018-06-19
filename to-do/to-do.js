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

const create = (description) => {
    loadDB();
    let index = listTo.length;
    if( index ){
        id = listTo[index-1]['id'] + 1;
    }else{
        id = 1;
    }
    let task = {
        id, 
        description,
        complete : false
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

const update = ( id, complete = true ) => {
    loadDB();
    let task = read( id );
    if( task ){
        task.complete = true;
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

const getList = ( complete = false ) => {
    loadDB();
    if( complete && complete !== "false" ){
        let listC = listTo.filter( task => task.complete === true );
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