import AnimalHighlight from "@/components/layout/AnimalHighlight";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Fish, MapPin, Mic, Waves } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section className="relative grid grid-cols-1 lg:grid-cols-2 items-center px-5 sm:px-8 pt-28 sm:pt-36 pb-16 max-w-7xl mx-auto gap-10 lg:gap-20">
          <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
            <div className="glass rounded-full px-4 sm:px-5 py-1.5 inline-flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <p className="uppercase tracking-[0.3em] text-sky-400 text-xs sm:text-sm">
                Experiência Aquática
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Explore o <span className="text-sky-400">Universo Marinho</span>
            </h1>

            <p className="text-white/60 text-base sm:text-lg max-w-xl">
              Explore espécies marinhas incríveis, apresentações especiais e
              experiências únicas no AquaMar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="/ingressos"
                className="bg-cyan-400 text-slate-900 px-8 py-4 rounded-full font-bold hover:scale-105 transition text-center w-full sm:w-auto"
              >
                Comprar Ingressos
              </a>

              <a
                href="/cronograma"
                className="glass px-8 py-4 rounded-full font-semibold hover:scale-105 transition text-center w-full sm:w-auto"
              >
                Ver Cronograma
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src="images/logo.png"
              className="logo-float w-56 sm:w-72 md:w-80 lg:w-[28rem]"
            />
          </div>
        </section>

        <AnimalHighlight />

        <section className="glass rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-14 mb-10">
          <div className="mb-8 text-center lg:text-left">
            <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs sm:text-sm">
              Atividades
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Experiências do AquaMar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Fish />
                Alimentação
              </div>
              <p className="text-sm text-white/60 mt-2">
                Veja os animais sendo alimentados ao vivo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Waves />
                Mergulho
              </div>
              <p className="text-sm text-white/60 mt-2">
                Experiência interativa com instrutores.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Mic />
                Shows
              </div>
              <p className="text-sm text-white/60 mt-2">
                Apresentações com vida marinha.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <MapPin />
                Visita Guiada
              </div>
              <p className="text-sm text-white/60 mt-2">
                Tour completo com especialistas.
              </p>
            </div>
          </div>
        </section>

        <section className="glass rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-14 mb-10">
          <div className="mb-8 text-center lg:text-left">
            <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs sm:text-sm">
              Feedback
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              O que dizem os visitantes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition">
              <p className="text-white/70">
                “Experiência surreal, parece o oceano real.”
              </p>
              <p className="text-cyan-300 mt-3 text-sm font-semibold">
                Marina Sena
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition">
              <p className="text-white/70">“Meu filho amou os tubarões!”</p>
              <p className="text-cyan-300 mt-3 text-sm font-semibold">
                Carlinhos Maia
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition">
              <p className="text-white/70">“Muito educativo e lindo.”</p>
              <p className="text-cyan-300 mt-3 text-sm font-semibold">
                Sabrina Carpenter
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
