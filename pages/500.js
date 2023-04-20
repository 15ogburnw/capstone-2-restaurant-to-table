import Link from "next/link";

export default function ServerErrorPage() {
  return (
    <>
      <h1>Oh No! Something went wrong!</h1>
      <Link href="/">Go back home</Link>
    </>
  );
}
