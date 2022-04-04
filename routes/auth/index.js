const router = require("express").Router();
const { json } = require("body-parser");
const logic = require("./logic");

/**
 *
 this is the '/auth' route,
 which means that every http request
 with the route of '/auth'
 will end up HERE.
 */
//to obtain the refresh token from a USER insert the query:
//(the path is /auth/token)
// {
//"oAuth": "spapiOauthToken-example"
//}
//a reminder : this token is sent to us from the front app

/**
 * newToken is making use of the amzRegister service to test if the package is ready to publish
 */
try {
  router.post("/newToken", async (req, res) => {
    const refreshToken = await logic.getRefreshToken(req.body.oAuth);
    res.json(200);
    console.log(refreshToken);
  });
} catch (error) {
  console.log(error);
}

try {
  router.post("/token", async (req, res) => {
    const refreshToken = await logic.getRefreshTokenByAuthCode(req.body.oAuth);
    res.json(200);
    console.log(refreshToken);
  });
} catch (error) {
  console.log(error);
}

router.get("/accessKeys", async (req, res) => {
  const temporaryKeys = await logic.requestAccessToken();
  res.json(200);
  console.log(temporaryKeys);
});

router.get("/stsTokens", async (req, res) => {
  const temporarySTSKeys = await logic.refreshRoleCredentials();
  res.json(200);
  console.log(temporarySTSKeys);
});

module.exports = router;
