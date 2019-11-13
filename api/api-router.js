const router = require('express').Router();
const bcrypt = require('bcryptjs');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res)=> {
    res.json({api: 'To Valhalla!', session: req.session})
})

router.post('/hash', (req, res)=> {
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 8);
    res.status(200).json({password, hash})
});

module.exports = router;