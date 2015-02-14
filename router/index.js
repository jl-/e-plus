var router = require('express').Router();
var render = require('../render');

router.route('/')
    .get(function(req,res){
        res.render('index', {
            content: render.index
        });
    });

module.exports = router;