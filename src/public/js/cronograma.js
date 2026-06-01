const date = new Date();

const month = date.getMonth();
const year = date.getFullYear();

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const events = {
  3: [
    {
      title: "Treinamento dos Golfinhos",
      time: "09:30",
    },
  ],

  5: [
    {
      title: "Alimentação dos Tubarões",
      time: "10:00",
    },
    {
      title: "Apresentação Educativa",
      time: "15:00",
    },
  ],

  7: [
    {
      title: "Visita aos Bastidores",
      time: "11:00",
    },
  ],

  10: [
    {
      title: "Mergulho com Biólogos",
      time: "14:30",
    },
  ],

  12: [
    {
      title: "Visita Guiada",
      time: "14:00",
    },
    {
      title: "Palestra sobre Corais",
      time: "16:00",
    },
    {
      title: "Workshop Vida Marinha",
      time: "18:00",
    },
  ],

  15: [
    {
      title: "Sessão Interativa com Arraias",
      time: "10:30",
    },
  ],

  18: [
    {
      title: "Show das Arraias",
      time: "11:00",
    },
    {
      title: "Alimentação Noturna dos Peixes",
      time: "19:00",
    },
  ],

  20: [
    {
      title: "Exibição de Tartarugas Marinhas",
      time: "13:00",
    },
  ],

  22: [
    {
      title: "Tour Fotográfico Subaquático",
      time: "15:30",
    },
  ],

  25: [
    {
      title: "Mergulho Interativo",
      time: "15:00",
    },
    {
      title: "Experiência Noturna no Aquário",
      time: "20:00",
    },
  ],

  28: [
    {
      title: "Encerramento do Mês Marinho",
      time: "17:00",
    },
  ],
};

const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days-container");
const eventContainer = document.getElementById("event-container");

monthYear.textContent = `${months[month]} ${year}`;

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

weekDays.forEach((day) => {
  const element = document.createElement("div");

  element.textContent = day;
  element.className = "font-bold text-cyan-300 mb-2";

  daysContainer.appendChild(element);
});

const firstDay = new Date(year, month, 1).getDay();

for (let i = 0; i < firstDay; i++) {
  const empty = document.createElement("div");
  daysContainer.appendChild(empty);
}

const daysInMonth = new Date(year, month + 1, 0).getDate();

for (let day = 1; day <= daysInMonth; day++) {
  const dayElement = document.createElement("button");

  dayElement.textContent = day;

  dayElement.className =
    "aspect-square flex items-center justify-center rounded-lg sm:rounded-xl bg-cyan-500/10 hover:bg-cyan-500/30 transition cursor-pointer text-xs sm:text-sm md:text-base";

  if (events[day]) {
    dayElement.classList.add("border", "border-cyan-400");
  }

  dayElement.addEventListener("click", () => {
    showEvents(day);
  });

  daysContainer.appendChild(dayElement);
}

function showEvents(day) {
  const dayEvents = events[day];

  if (!dayEvents) {
    eventContainer.innerHTML = `
      <div>
        <h3 class="text-xl font-bold mb-2">Dia ${day}</h3>
        <p class="text-gray-300">
          Nenhuma atividade programada.
        </p>
      </div>
    `;
    return;
  }

  eventContainer.innerHTML = `
    <h3 class="text-xl font-bold mb-4">
      Dia ${day}
    </h3>

    <div class="space-y-4">
      ${dayEvents
        .map(
          (event) => `
          <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <p class="font-semibold">${event.title}</p>
            <p class="text-sm text-cyan-300">${event.time}</p>
          </div>
        `,
        )
        .join("")}
    </div>
  `;
}
