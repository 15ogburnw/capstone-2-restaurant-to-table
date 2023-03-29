import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";


const afterCallback = async (req, res, session) => {
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  session.user.supabase = {
    accessToken: jwt.sign(payload, process.env.SUPABASE_JWT_SECRET),
  };

  // creating a query to get user access tokens for external API Suggestic
  const query = `
  mutation {
      login(userId:${process.env.SUGGESTIC_USER_ID}){
      accessToken
      refreshToken
  }
  }   
`;
  // awaiting the query, then adding the access token and refresh token to the db
  const resp = await fetch(process.env.SUGGESTIC_DOMAIN, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: process.env.SUGGESTIC_API_KEY,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data.login);
  console.log(resp);

  // session.user.suggestic = {
  //   accessToken: suggestic.accessToken,
  //   refreshToken: suggestic.refreshToken,
  // };

  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
