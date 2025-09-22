import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-56 p-6 border-r bg-muted min-h-screen flex flex-col gap-4">
      <div className="font-bold text-lg mb-8">ACME App</div>
      <nav className="flex flex-col gap-2 text-[15px]">
        <Link href="/">Dashboard</Link>
        <Link href="/about">About</Link>
      </nav>
    </aside>
  );
}