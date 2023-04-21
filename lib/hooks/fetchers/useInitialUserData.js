import useSWR from "swr";

export default async function useCompleteUserInfo() {
  const INITIAL = { data: { user: {} } };
  const fetcher = (request, init) =>
    fetch(request, init).then((res) => res.json());
  let { data: savedRecipes, error } = useSWR(
    "/api/user/saved-recipes",
    fetcher
  );
}
