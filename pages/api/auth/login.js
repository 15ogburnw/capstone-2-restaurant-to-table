// TODO: NEED TO MAKE SURE THIS IS ADDING A USER TO MY OTHER USERS DATABASE WITH THE CUSTOM TRIGGER

const handler = async (req, res) => {
  const supabase = await createServerSupabaseClient({
    req,
    res,
  });

  if (!supabase) {
    throw new Error(
      "Something went wrong creating the client! Please try again"
    ).code(500);
  }

  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed!" });
  }

  if (req.method === "POST") {
    const { error, data: user } = await supabase?.auth.loginWithPassword(
      req.body?.login
    );
    if (error) return new Error("Login Failed, please try again").code(400);
    else
      return res
        .status(200)
        .json({ message: "User successfully created", user });
  }

  throw new Error("Server Error").code(500);
};

export default handler;
