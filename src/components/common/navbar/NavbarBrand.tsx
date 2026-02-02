import Link from "next/link";

export default function NavbarBrand() {
  return (
    <Link href="/" className="font-semibold text-black dark:text-zinc-50">
      <span className="tracking-tight text-2xl">GAH</span>
      <span className="text-amber-500 dark:text-gray-500 text-xl">.</span>
    </Link>
  );
}
