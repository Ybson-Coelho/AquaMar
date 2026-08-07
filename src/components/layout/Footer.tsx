export default function Footer() {
  return (
    <>
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-cyan-400">AquaMar</h3>
            <p className="text-white/60 text-sm mt-2">
              Experiência imersiva no universo marinho.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Navegação</h4>
            <ul className="text-white/60 text-sm space-y-2">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/animais">Animais</a>
              </li>
              <li>
                <a href="/cronograma">Cronograma</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-white/40 text-xs pb-6">
          © 2026 AquaMar
        </div>
      </footer>
    </>
  );
}
