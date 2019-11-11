const router = require('./express').Router();
const bcrypt = require('bcryptjs');

const authRouter = require('../auth/auth-router.js');

router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.json({api: 'Charge into victory, mates!'})
});

router.post('/hash', (req, res)=> {
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 8);
    res.status(200).json({password, hash})
});

module.exports = router;