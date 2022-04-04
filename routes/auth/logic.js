let credentials = require("amazon-sp-api/lib/credentials");
const fetch = require("node-fetch");
const QueryString = require("qs");
const AWS = require("aws-sdk");
const STS = new AWS.STS({
  region: "na",
  credentials: {
    accessKeyId: process.env.AWS_SELLING_PARTNER_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SELLING_PARTNER_SECRET_ACCESS_KEY,
  },
});
const SellingPartnerAPI = require("amazon-sp-api");
const { AmzRegister } = require("../../dist");

// getRefreshTokenByAuthCode is a function used to request a refresh token from a first
// time user

const clientSettings = {
  sellingPartnerAppClientId: process.env.SELLING_PARTNER_APP_CLIENT_ID,
  sellingPartnerAppClientSecret: process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
  awsAccessKeyId: process.env.AWS_SELLING_PARTNER_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SELLING_PARTNER_SECRET_ACCESS_KEY,
  awsSellingPartnerRole: process.env.AWS_SELLING_PARTNER_ROLE_ARN,
};

const register = new AmzRegister(clientSettings);

async function getRefreshToken(oAuth) {
  const refreshToken = await register.getRefreshToken(oAuth);
  return refreshToken;
}

async function getRefreshTokenByAuthCode(oAuth) {
  // oAuth = the code we got back from the client.
  let sellingPartner = new SellingPartnerAPI({
    region: "na",
    options: {
      only_grantless_operations: true,
    },
    credentials: {
      SELLING_PARTNER_APP_CLIENT_ID: process.env.SELLING_PARTNER_APP_CLIENT_ID,
      SELLING_PARTNER_APP_CLIENT_SECRET:
        process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
      AWS_SELLING_PARTNER_ACCESS_KEY_ID:
        process.env.AWS_SELLING_PARTNER_ACCESS_KEY_ID,
      AWS_SELLING_PARTNER_SECRET_ACCESS_KEY:
        process.env.AWS_SELLING_PARTNER_SECRET_ACCESS_KEY,
      AWS_SELLING_PARTNER_ROLE: process.env.AWS_SELLING_PARTNER_ROLE_ARN,
    },
  }); //create a new client
  return await sellingPartner.exchange(oAuth);
  /**
   *send the  OAuth we got from the user via the URI
   * pass it through the method to exchange it
   * for refresh token. we log it into the route
   */
}

// EVERY TIME WE WANT TO CALL THE API WE HAVE TO DO THIS:
// to create a new instance of the selling partner api
// that instance requests new access_token and role_credentials
// for accessing the api these tokens are only valid for 1 hour

//first I will refresh them menually using getters
// then use them in a new instance as inputs, preferebly use this method before calling the api

// let sellingPartner = new SellingPartnerAPI({
//     region:'na',
//     refresh_token:process.env.REFRESH_TOKEN,
//     options:{
//       auto_request_tokens:true
//     }
//   });

/*
   If our app cannot access the api without STS : assume role . 
   we will generate Access token and Role credentials 
   by creating an instance that doesn't request them menunally.
   */

const requestAccessToken = async () => {
  const body = {
    grant_type: "refresh_token",
    refresh_token: process.env.REFRESH_TOKEN,
    client_id: process.env.SELLING_PARTNER_APP_CLIENT_ID,
    client_secret: process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
  };

  const accessToken = await fetch("https://api.amazon.com/auth/o2/token", {
    method: "POST",
    body: QueryString.stringify(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
  if (accessToken.ok) {
    return await accessToken.json();
  } else {
    throw new Error(accessToken.statusText);
  }
};

module.exports = {
  getRefreshTokenByAuthCode,
  requestAccessToken,
  getRefreshToken,
};
