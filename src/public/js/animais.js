const animals = [
  {
    name: "Tubarão Branco",
    category: "shark",
    image: "images/animals/tubarao-branco.jpg",
    habitat: "Oceano aberto",
    size: "4 - 6m",
    desc: "Predador do topo da cadeia alimentar.",
  },
  {
    name: "Tubarão Martelo",
    category: "shark",
    image: "images/animals/tubarao-martelo.jpg",
    habitat: "Águas tropicais",
    size: "3 - 5m",
    desc: "Famoso pelo formato único da cabeça.",
  },
  {
    name: "Tubarão-de-Pontas-Negras",
    category: "shark",
    image: "images/animals/tubarao-pontas-negras.jpg",
    habitat: "Recifes de coral e águas costeiras",
    size: "1,5 - 2m",
    desc: "Reconhecido pelas pontas pretas em suas nadadeiras, é um nadador ágil que se alimenta de peixes, crustáceos e lulas.",
  },
  {
    name: "Peixe Palhaço",
    category: "fish",
    image: "images/animals/peixe-palhaco.webp",
    habitat: "Recifes de coral",
    size: "10 - 18cm",
    desc: "Pequeno e super colorido.",
  },
  {
    name: "Golfinho",
    category: "mammal",
    image: "images/animals/golfinho.webp",
    habitat: "Oceanos",
    size: "2 - 4m",
    desc: "Inteligente e social.",
  },
  {
    name: "Foca",
    category: "mammal",
    image: "images/animals/foca.jpg",
    habitat: "Oceanos frios e regiões costeiras",
    size: "1,2 - 3m",
    desc: "Mamífero marinho adaptado à vida aquática, alimenta-se principalmente de peixes, lulas e crustáceos.",
  },
  {
    name: "Tartaruga Marinha",
    category: "mammal",
    image: "images/animals/tartaruga-marinha.webp",
    habitat: "Oceanos tropicais",
    size: "1 - 2m",
    desc: "Viajante de longas distâncias.",
  },
  {
    name: "Coral Cerebral",
    category: "coral",
    image: "images/animals/coral-cerebral.jpg",
    habitat: "Recifes",
    size: "—",
    desc: "Essencial para o ecossistema marinho.",
  },
  {
    name: "Coral-Chifre-de-Veado",
    category: "coral",
    image: "images/animals/coral-chifre-de-veado.webp",
    habitat: "Recifes de coral em águas rasas",
    size: "Até 2m de largura",
    desc: "Coral de crescimento rápido com ramificações que lembram galhadas de veado, servindo de abrigo para diversas espécies marinhas.",
  },
];

const grid = document.getElementById("animals-grid");
const buttons = document.querySelectorAll(".filter-btn");

function render(filter = "all") {
  grid.innerHTML = "";

  animals
    .filter((a) => filter === "all" || a.category === filter)
    .forEach((animal) => {
      grid.innerHTML += `
        <div class="glass rounded-2xl overflow-hidden hover:scale-[1.02] transition">
          <img src="${animal.image}" class="w-full h-48 object-cover" />

          <div class="p-4 flex flex-col gap-2">
            <h3 class="text-xl font-bold">${animal.name}</h3>

            <p class="text-white/60 text-sm">${animal.desc}</p>

            <div class="text-xs text-cyan-300 mt-2 flex items-center gap-2">
              <i data-lucide="map-pin" class="w-4 h-4"></i>
              ${animal.habitat}

              <span class="mx-2">•</span>

              <i data-lucide="ruler" class="w-4 h-4"></i>
              ${animal.size}
            </div>
          </div>
        </div>
      `;
    });

  lucide.createIcons();
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("bg-cyan-400/20"));
    btn.classList.add("bg-cyan-400/20");

    render(btn.dataset.category);
  });
});

render();
