const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', (req, res)=> {
  let credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 8);
  credentials.password = hash;

  Users.add(credentials)
  .then(saved=> {
      res.status(201).json(saved);
  })
  .catch(error=> {
      res.status(500)/json(error);
  });
})

router.post('./login', (req, res)=> {
    let {username, password} = req.body;
    
    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({message:`He has returned! Welcome, ${user.username}!`})
        } else {
            res.status(401).json({message: 'Username or password is incorrect.'})
        }
    })
    .catch(err=> {
        console.log('FALSE GODS!', err)
        res.status(500).json(err);
    })
})

module.exports = router;