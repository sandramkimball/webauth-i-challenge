const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

//API/AUTH ENDPOINTS 
router.post('/register', (req, res)=> {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
  .then(saved=> {
      req.session.username = saved.username;
      res.status(201).json(saved);
  })
  .catch(error=> {
      console.log('Odin is disappointed', error);
      res.status(500).json(error);
  });
})

router.post('/login', (req, res)=> {
    let {username, password} = req.body;
    
    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            req.session.username = user.username;
            res.status(200).json({message:`${user.username} has returned!`})
        } else {
            res.status(401).json({message: 'You are not one of us, Outsider.'})
        }
    })
    .catch(err=> {
        console.log('FALSE GODS!', err)
        res.status(500).json(err);
    })
})

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err=>{
            res.status(200).json({message: 'You were but a ghost.'})
        })
    } else {
        res.status(200).json({message: 'Good travels to you.'})
    }
})

module.exports = router;