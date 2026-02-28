import Link from "next/link";

export function Header() {
  return (
    <header className="w-full bg-gray-900 text-white py-4">
      <div className="container-fluid mx-auto flex items-center justify-between">
        <span className="text-xl font-bold  ">Rick & Morty</span>
        <nav>
          <ul className="flex gap-6 text-sm">
            <li>
              <Link href="/" className="hover:text-green-400 transition-colors">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
