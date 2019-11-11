const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', (req, res)=> {
  let credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 8)  ;
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

})