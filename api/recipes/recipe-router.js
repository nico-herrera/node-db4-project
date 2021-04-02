const router = require('express').Router();
const Middleware = require('./recipe-middleware')


router.get('/:id', Middleware.checkId, (req, res) => {
    res.status(200).json(req.recipe)
})

module.exports = router;