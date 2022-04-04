const router = require('express').Router();

/**
 * in this file we gather all our routes,
 * like ('/auth') for example, in order
 * to send the requests to their right paths.
 */


router.use('/auth', require('./auth'));

router.use('/marketplace', require('./marketplace'));

router.use('/fba', require('./fba'));



module.exports = router;
