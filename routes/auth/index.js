const router = require('express').Router();
const logic = require('./logic');

/**
 *
 this is the '/auth' route,
 which means that every http request
 with the route of '/auth'
 will end up HERE.
 */

router.post('/token', async (req, res) => {
    const refreshToken = await logic.getRefreshTokenByAuthCode()
    res.json(200)
})

module.exports = router;
