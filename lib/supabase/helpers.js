export const getAuthRedirectURL = () => {
  let url;

  if (process.env.NODE_ENV === "development") url = "http://localhost:3000/";
  else {
    url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? //  site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL; // Automatically set by Vercel.
  }
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};
