const SellingPartnerAPI = require('amazon-sp-api');


function authConfig() {
    return new SellingPartnerAPI({
        region: 'eu',
        options: {
            only_grantless_operations: true
        }
    });
}

module.exports = {
    authConfig
}
