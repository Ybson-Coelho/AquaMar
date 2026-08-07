"use client";

import { useState } from "react";
import { MapPin, Ruler } from "lucide-react";

const animals = [
  {
    name: "Tubarão Branco",
    category: "shark",
    image: "/images/animals/tubarao-branco.jpg",
    habitat: "Oceano aberto",
    size: "4 - 6m",
    desc: "Predador do topo da cadeia alimentar.",
  },
  {
    name: "Tubarão Martelo",
    category: "shark",
    image: "/images/animals/tubarao-martelo.jpg",
    habitat: "Águas tropicais",
    size: "3 - 5m",
    desc: "Famoso pelo formato único da cabeça.",
  },
  {
    name: "Tubarão-de-Pontas-Negras",
    category: "shark",
    image: "/images/animals/tubarao-pontas-negras.jpg",
    habitat: "Recifes de coral e águas costeiras",
    size: "1,5 - 2m",
    desc: "Reconhecido pelas pontas pretas em suas nadadeiras.",
  },
  {
    name: "Peixe Palhaço",
    category: "fish",
    image: "/images/animals/peixe-palhaco.webp",
    habitat: "Recifes de coral",
    size: "10 - 18cm",
    desc: "Pequeno e super colorido.",
  },
  {
    name: "Golfinho",
    category: "mammal",
    image: "/images/animals/golfinho.webp",
    habitat: "Oceanos",
    size: "2 - 4m",
    desc: "Inteligente e social.",
  },
  {
    name: "Coral Cerebral",
    category: "coral",
    image: "/images/animals/coral-cerebral.jpg",
    habitat: "Recifes",
    size: "—",
    desc: "Essencial para o ecossistema marinho.",
  },
];

const categories = [
  {
    id: "all",
    label: "Todos",
  },
  {
    id: "shark",
    label: "Tubarões",
  },
  {
    id: "fish",
    label: "Peixes",
  },
  {
    id: "mammal",
    label: "Mamíferos",
  },
  {
    id: "coral",
    label: "Corais",
  },
];

export default function AnimalGrid() {
  const [filter, setFilter] = useState("all");

  const filteredAnimals = animals.filter(
    (animal) => filter === "all" || animal.category === filter,
  );

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`filter-btn px-5 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-cyan-400/20 hover:text-cyan-300 ${filter === category.id ? "bg-cyan-400/20 text-cyan-300 shadow-lg shadow-cyan-400/20" : "glass"}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <article
            key={animal.name}
            className="glass rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-cyan-400/40"
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
            />

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-bold">{animal.name}</h3>

              <p className="text-white/60 text-sm">{animal.desc}</p>

              <div className="text-xs text-cyan-300 mt-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />

                {animal.habitat}

                <span className="mx-2">•</span>

                <Ruler className="w-4 h-4" />

                {animal.size}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
