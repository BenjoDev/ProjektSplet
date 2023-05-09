var express = require('express');
var router = express.Router();
var PhoneDataController = require('../controllers/PhoneDataController.js');

var express = require('express');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}


/*
 * GET
 */
router.get('/', PhoneDataController.list);

/*
 * GET
 */
router.get('/:id', PhoneDataController.show);

/*
 * POST
 */
router.post('/', PhoneDataController.create);

/*
 * PUT
 */
router.put('/:id', PhoneDataController.update);

/*
 * DELETE
 */
router.delete('/:id', PhoneDataController.remove);

module.exports = router;
