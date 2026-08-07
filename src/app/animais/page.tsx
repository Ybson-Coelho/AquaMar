import AnimalGrid from "@/components/layout/AnimalGrid";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Animais() {
  return (
    <>
      <Header />

      <main className="pt-28 max-w-7xl mx-auto px-4 sm:px-8">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Animais do <span className="text-sky-400">Aquário</span>
          </h1>
          <p className="text-white/60 mt-3">
            Explore espécies, filtros e informações rápidas
          </p>
        </section>

        <AnimalGrid />
      </main>

      <Footer />
    </>
  );
}
