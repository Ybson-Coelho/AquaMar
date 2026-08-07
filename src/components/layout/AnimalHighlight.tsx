"use client";

import { useEffect, useState } from "react";

const animais = [
  {
    nome: "Axolote",
    imagem: "/images/animals/axolote.jpg",
    descricao:
      "O axolote é um anfíbio raro do México famoso por conseguir regenerar partes do corpo como patas, coração e até partes do cérebro.",
    habitat: "Lagos de água doce no México",
    tamanho: "15 a 45 cm",
    status: "Em perigo crítico",
  },

  {
    nome: "Lontra",
    imagem: "/images/animals/lontra.webp",
    descricao:
      "As lontras são mamíferos aquáticos extremamente inteligentes, brincalhões e conhecidas por usarem pedras como ferramentas.",
    habitat: "Rios, lagos e regiões costeiras",
    tamanho: "60 cm a 1,5 m",
    status: "Quase ameaçada",
  },

  {
    nome: "Coelho-do-Mar",
    imagem: "/images/animals/coelho-do-mar.webp",
    descricao:
      "O coelho-do-mar é uma pequena lesma marinha colorida que viralizou pela aparência fofa parecida com um coelho.",
    habitat: "Oceanos tropicais e recifes",
    tamanho: "2 a 5 cm",
    status: "Pouco preocupante",
  },

  // ...restante dos animais
];

export default function AnimalHighlight() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const animal = animais[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1 >= animais.length ? 0 : prev + 1));

        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="glass rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-8 py-8 sm:py-14 gap-8 lg:gap-16 mb-10">
      <div className="flex justify-center">
        <img
          src={animal.imagem}
          alt={animal.nome}
          className={`
            w-80 h-80 object-cover rounded-3xl
            transition-opacity duration-300
            ${fade ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>

      <div className="flex flex-col gap-5">
        <span className="glass px-4 py-1 rounded-full text-sky-400 w-fit">
          Animal em destaque
        </span>

        <h2 className="text-4xl font-bold">{animal.nome}</h2>

        <p className="text-white/60">{animal.descricao}</p>

        <ul className="flex flex-col gap-3">
          <li>
            <strong>Habitat:</strong> {animal.habitat}
          </li>

          <li>
            <strong>Tamanho:</strong> {animal.tamanho}
          </li>

          <li>
            <strong>Status:</strong> {animal.status}
          </li>
        </ul>
      </div>
    </section>
  );
}
