// environment.ts
export const environment = {
  production: false,
  auth: {
    clientID: 'I67fLdffMBUg0VceI5Uv7nDnrxosWXAT',
    domain: 'dev-ohvjdegt.eu.auth0.com', // e.g., https://you.auth0.com/
    audience: 'https://booksy-api.herokuapp.com/', // e.g., http://localhost:3001
    redirect: 'http://localhost:3000/callback',
    scope: 'openid profile email'
  }
};