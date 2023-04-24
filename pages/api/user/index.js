import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  let user;

  switch (req.method) {
    // TODO: FOR NOW THIS WILL WORK BUT I NEED TO EXPAND IT TO DECIDE WHAT EXTRA USER INFO I WANT.
    //NEED TO ALSO MAKE SURE THIS IS ADDING A USER TO MY OTHER USERS DATABASE WITH THE CUSTOM TRIGGER
    // PROBABLY ALSO NEED TO DO SOME MORE SECURING OF THESE ROUTES IN MIDDLEWARE
    // THIS WILL ALSO NEED TO BE ADAPTED TO ACCOMODATE

    /**
     * Api routes for updating, adding, and deleting info on the current user. I don't need a get
     * request because I have useUser through supabase.
     */

    case "POST":
      let {
        data: {
          user: { name, email },
        },
      } = await supabaseServerClient.auth.getUser();
      if (!name || !email)
        return res.status(404).json({ error: "User not found" });
      else res.status(201).json({ user });

    case "DELETE":
      let {
        data: { user },
      } = await supabaseServerClient.auth.getUser();

      if (!user) return res.status(404).json({ error: "User not found" });
      else {
        res
          .status()
          .json({ message: "Something went wrong, please try again later" });
      }

    default:
      res.status(400).json({ message: "Method not allowed" });
  }

  res.status(500).send();
};

export default handler;
