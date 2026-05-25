const animais = [
    {
        nome: "Axolote",
        imagem: "images/animals/axolote.jpg",
        descricao:
            "O axolote é um anfíbio raro do México famoso por conseguir regenerar partes do corpo como patas, coração e até partes do cérebro.",
        habitat: "Lagos e canais de água doce no México",
        tamanho: "15 a 45 cm",
        status: "Em perigo crítico"
    },

    {
        nome: "Lontra",
        imagem: "images/animals/lontra.webp",
        descricao:
            "As lontras são mamíferos aquáticos extremamente inteligentes, brincalhões e conhecidas por usarem pedras como ferramentas.",
        habitat: "Rios, lagos e regiões costeiras",
        tamanho: "60 cm a 1,5 m",
        status: "Quase ameaçada"
    },

    {
        nome: "Coelho-do-Mar",
        imagem: "images/animals/coelho-do-mar.webp",
        descricao:
            "O coelho-do-mar é uma pequena lesma marinha colorida que viralizou pela aparência fofa parecida com um coelho.",
        habitat: "Oceanos tropicais e recifes",
        tamanho: "2 a 5 cm",
        status: "Pouco preocupante"
    },

    {
        nome: "Cavalo-Marinho",
        imagem: "images/animals/cavalo-marinho.webp",
        descricao:
            "Os cavalos-marinhos possuem um formato único e os machos carregam os filhotes em uma bolsa especial até o nascimento.",
        habitat: "Recifes, manguezais e águas rasas",
        tamanho: "2 a 35 cm",
        status: "Vulnerável"
    },

    {
        nome: "Tubarão-Limão",
        imagem: "images/animals/tubarao-limao.webp",
        descricao:
            "O tubarão-limão recebe esse nome pela coloração amarelada e é conhecido por sua calma comparado a outras espécies.",
        habitat: "Oceanos tropicais e áreas costeiras",
        tamanho: "2 a 3 metros",
        status: "Quase ameaçado"
    },

    {
        nome: "Água-viva",
        imagem: "images/animals/agua-viva.jpg",
        descricao:
            "As águas-vivas existem há milhões de anos e sobrevivem sem cérebro, coração ou ossos.",
        habitat: "Oceanos do mundo inteiro",
        tamanho: "1 cm a 2 metros",
        status: "Pouco preocupante"
    },

    {
        nome: "Tartaruga Marinha",
        imagem: "images/animals/tartaruga-marinha.webp",
        descricao:
            "As tartarugas marinhas percorrem milhares de quilômetros pelos oceanos e retornam à praia onde nasceram para colocar ovos.",
        habitat: "Oceanos tropicais e subtropicais",
        tamanho: "70 cm a 2 metros",
        status: "Em perigo"
    },

    {
        nome: "Leão-marinho",
        imagem: "images/animals/leao-marinho.webp",
        descricao:
            "Os leões-marinhos são mamíferos marinhos muito sociáveis, famosos pela inteligência e habilidade de nadar rapidamente.",
        habitat: "Costas rochosas e ilhas oceânicas",
        tamanho: "1,5 a 2,5 metros",
        status: "Pouco preocupante"
    }, {
        nome: "Polvo",
        imagem: "images/animals/polvo.jpg",
        descricao:
            "O polvo é um molusco marinho muito inteligente, conhecido por sua capacidade de camuflagem e pelos seus oito tentáculos.",
        habitat: "Oceanos e áreas rochosas submarinas",
        tamanho: "30 cm a 5 metros",
        status: "Pouco preocupante"
    }, {
        nome: "Beluga",
        imagem: "images/animals/beluga.webp",
        descricao:
            "A beluga é uma baleia branca conhecida por sua comunicação sonora e pela capacidade de viver em águas extremamente frias.",
        habitat: "Oceanos árticos e águas geladas",
        tamanho: "3 a 5,5 metros",
        status: "Quase ameaçada"
    },
];

const animalImg = document.getElementById("animal-img");
const animalName = document.getElementById("animal-name");
const animalDesc = document.getElementById("animal-desc");
const animalHabitat = document.getElementById("animal-habitat");
const animalSize = document.getElementById("animal-size");
const animalStatus = document.getElementById("animal-status");

let index = 0;

function mostrarAnimal() {
    animalImg.style.opacity = 0;

    setTimeout(() => {
        animalImg.src = animais[index].imagem;
        animalName.textContent = animais[index].nome;
        animalDesc.textContent = animais[index].descricao;
        animalHabitat.textContent = animais[index].habitat;
        animalSize.textContent = animais[index].tamanho;
        animalStatus.textContent = animais[index].status;

        animalImg.style.opacity = 1;
    }, 300);
}

mostrarAnimal();

setInterval(() => {
    index++;

    if (index >= animais.length) {
        index = 0;
    }

    mostrarAnimal();
}, 5000);

console.log(`Quantidade de animais: ${animais.length}`);