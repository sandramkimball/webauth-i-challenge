
module.exports = (req, res, next) => {
    // next();
    if (req.session ){
       next();
    } else {
        res.status(401).json({you: 'You are cast out.'})
    }
};