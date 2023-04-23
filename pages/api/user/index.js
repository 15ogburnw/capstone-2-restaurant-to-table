import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  if (req.method === "GET") {
    try {
      let {
        data: { user },
      } = await supabaseServerClient.auth.getUser();
      if (!user) return res.json(404).json({ message: "User not found" });

      user = {
        name: user.name ?? null,
        email: user.email,
      };
      res.status(200).json({ user });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again later" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
};

export default handler;
