import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";
import { getSuggesticTokens } from "@/lib/suggestic";

const afterCallback = async (req, res, session) => {
  const payload = {
    userId: session.user.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  session.user.supabase = {
    accessToken: jwt.sign(payload, process.env.SUPABASE_JWT_SECRET),
  };

  const suggestic = await getSuggesticTokens();

  session.user.suggestic = {
    accessToken: suggestic.accessToken,
    refreshToken: suggestic.refreshToken,
  };

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
