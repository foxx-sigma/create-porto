import Link from "next/link";

const Header = () => {
  return (
    <header
      className="
        sticky top-0 z-50
        bg-zinc-900/70
        backdrop-blur-md
        border-b border-white/10
        text-white
      "
    >
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        
        <Link href="/" className=" text-4xl font-sans font-bold tracking-wide">
          aesr
        </Link>

        <ul className="flex space-x-6 text-sm font-medium text-zinc-200">
          <li>
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/portofolio"
              className="hover:text-white transition-colors"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="hover:text-white transition-colors"
            >
              Blog
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
};

export default Header;
