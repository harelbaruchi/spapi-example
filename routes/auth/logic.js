const spConfig = require("../../configurations") // Instance selling partner access

async function getRefreshTokenByAuthCode(oAuth) {
    // oAuth = the code we got back from the client.
    return await spConfig.authConfig().exchange(oAuth) // result = refresh token.
}

module.exports = {
    getRefreshTokenByAuthCode
}
