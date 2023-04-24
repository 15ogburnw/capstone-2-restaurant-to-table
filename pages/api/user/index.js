import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabase = createServerSupabaseClient({
    req,
    res,
  });
  const forbiddenMethods = ["GET", "POST", "HEAD", "PUT"];
  let {
    data: { user },
  } = await supabase.auth.getUser();
  //   TODO: MOVED POST TO LOGIN ENDPOINT, NEED TO ADD A PATCH ENDPOINT HERE FOR UPDATING USERS
  //   TODO: PROBABLY ALSO NEED TO DO SOME MORE SECURING OF THESE ROUTES IN MIDDLEWARE (APPLIES TO ALL API ENDPOINTS)

  /**
   * Api routes for updating and deleting info on the current user. I don't need a GET
   * request because I have useUser through supabase, and my POST auth logic is in a different endpoint .
   */

  if (req.method === "DELETE") {
    // const [error, data, resp] =
    //   ({ error, data } =
    //   resp =
    //     await supabase.from("auth.users").delete().eq(id, user.id));

    // console.log(resp, error, data);
    // const [res, error, user] =
    //   ({ error, data: user } =
    //   res =
    //     await supabase.auth.loginWithPassword(req.body?.login));

    // if (response.error) await res.status(response.error.status).json({ error: response.error.message });

    // if(response.statusText==="OK")

    await res.status(200).json({ success: "User successfully deleted" });
  }

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
