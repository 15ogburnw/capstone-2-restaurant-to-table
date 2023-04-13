import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  if (req.method === "GET") {
    try {
      const {
        data: { user },
      } = await supabaseServerClient.auth.getUser();
      return res.status(200).json({
        user: {
          name: user.name ?? null,
          email: user.email,
        },
      });
    } catch (e) {
      res.status(404).json({ message: "couldn't find user" });
    }
  }
};

export default handler;
