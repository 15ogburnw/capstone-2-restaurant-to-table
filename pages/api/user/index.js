import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req, res) => {
  const supabase = createServerSupabaseClient({
    req,
    res,
  });

  let {
    data: { user },
  } = await supabase.auth.getUser();

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

  if (req.method === "GET") {
    const { error, data } = await supabase
      .from("auth.users")
      .select("*")
      .eq("id", user.id);

    console.log("error:", error, "data:", data);
  }
};

export default handler;
