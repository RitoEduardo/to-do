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
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error("No se pudo guardar", err);
    });
}

const fnSearchIndex = (haulage) => {
    let index = listTo.length;
    _id = listTo[index - 1]['id'] + haulage;
    if (read(_id)) {
        return fnSearchIndex(++haulage)
    }
    return _id;
}

const fnValidateCompleted = (value) => {

    switch (value) {
        case "true":
        case true:
            return true;
        case "false":
        case false:
            return false;
    }
    return undefined;
}

const create = (description, complete = false, id = 0) => {
    loadDB();
    let _id = 1;
    if (id) { //Declaro el ID
        _id = id;
        let task = read(id);
        if (task) {
            throw new Error("ID is Already Assigned");
        }
    } else if (listTo.length) {
        _id = fnSearchIndex(1);
    }
    let task = {
        id: _id,
        description,
        completed: fnValidateCompleted(complete)
    }
    listTo.push(task);
    saveDB()
    return task;
};

const read = (id) => {
    loadDB();
    let index = listTo.findIndex(task => task.id === id);
    if (index > -1)
        return listTo[index]
    else
        return undefined;
}

const update = (id, description, completed = true) => {
    loadDB();
    let task = read(id);
    if (task) {
        task.completed = completed;
        if (description) {
            task.description = description;
        }
        saveDB();
        return task;
    }
    throw new Error("Tarea no encontrada");
}

const deleteTask = (id) => {
    loadDB();
    let index = listTo.findIndex(task => task.id === id);
    if (index != -1) {
        let resp = listTo.splice(index, 1);
        saveDB();
        return true;
    }
    return false;
}

const getList = (filter = false, completed) => {
    loadDB();
    if (filter) {
        _completed = fnValidateCompleted(completed);
        let listC = listTo.filter(task => task.completed == _completed);
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