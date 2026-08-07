import { CalendarDays, Fish, Home } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-3 sm:px-6 py-4">
      <nav className="glass max-w-7xl mx-auto rounded-full px-4 sm:px-8 py-4 flex items-center justify-between">
        <a className="font-bold text-2xl sm:text-3xl" href="/">
          AquaMar
        </a>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
          <a href="/" className="hover:scale-[1.05] transition">
            <Home />
          </a>
          <a href="/cronograma" className="hover:scale-[1.05] transition">
            <CalendarDays />
          </a>
          <a href="/animais" className="hover:scale-[1.05] transition">
            <Fish />
          </a>
        </div>
      </nav>
    </header>
  );
}
