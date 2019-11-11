const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    let {username, password} = req.headers;

    if (username && password){
        Users.findBy({username})
        .first()
        .then(user=> {
            if (user && bcrypt.compareSync(password, user.password)){
                next()
            } else {
                res.stauts(401).json({message: 'Invalid, beast!'})
            }
        })
        .catch(err=> {
            console.log('login error: ', err);
            res.status(500).json({message: 'There was an error.'})
        })
    } else {
        res.status(400).json({message: 'State your name and password.'})
    }
}