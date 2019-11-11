const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find, 
    findBy,
    findById,
};

function add(user){
    return db('users')
    .inster(user, 'id')
    .then(ids=> {
        const [id] = ids;
        return findById(id)
    });
}

function find(){
    return db('users')
    .select('id', 'username');
}

function findBy(filter){
    return db('users')
    .select('id', 'username', 'password')
    .where(filter);
}
function findById(id){
    return db('users')
    .select('id', 'username')
    .where({id})
    .first();
}
