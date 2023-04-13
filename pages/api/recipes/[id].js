export default function RecipeById(req, res) {
  if (req.method === "POST") {
  } else if (req.method === "GET") {
    console.log("get");
  } else {
    res.status(400).json({ message: "method not allowed" });
  }
}
