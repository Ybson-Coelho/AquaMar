const reservasIniciais = [
  {
    codigo: "AQM-7K8P2X",
    nome: "Ana Clara Souza",
    email: "anaclara@exemplo.com",
    telefone: "(11) 98765-4321",
    dia: "5",
    itens: [
      { tipo: "Adulto", quantidade: 2, precoUnitario: 59, subtotal: 118 },
    ],
    totalIngressos: 2,
    totalValor: 118,
    eventos: [
      { title: "Alimentação dos Tubarões", time: "10:00" },
      { title: "Apresentação Educativa", time: "15:00" },
    ],
    status: "pendente",
    criadoEm: new Date().toISOString(),
    pagoEm: null,
  },
  {
    codigo: "AQM-4W9L3M",
    nome: "Lucas Mendes",
    email: "lucas.mendes@exemplo.com",
    telefone: "(21) 99887-6655",
    dia: "3",
    itens: [
      { tipo: "Adulto", quantidade: 1, precoUnitario: 59, subtotal: 59 },
      { tipo: "Infantil", quantidade: 1, precoUnitario: 29, subtotal: 29 },
    ],
    totalIngressos: 2,
    totalValor: 88,
    eventos: [{ title: "Treinamento dos Golfinhos", time: "09:30" }],
    status: "concluida",
    criadoEm: new Date(Date.now() - 86400000).toISOString(),
    pagoEm: new Date().toISOString(),
  },
];

function obterReservas() {
  try {
    const raw = localStorage.getItem("aquamar_reservas");
    if (!raw) {
      localStorage.setItem(
        "aquamar_reservas",
        JSON.stringify(reservasIniciais),
      );
      return reservasIniciais;
    }
    return JSON.parse(raw);
  } catch (e) {
    return reservasIniciais;
  }
}

function salvarReservas(reservas) {
  localStorage.setItem("aquamar_reservas", JSON.stringify(reservas));
}

const inputCodigo = document.getElementById("inputCodigo");
const btnBuscar = document.getElementById("btnBuscar");
const resultadoValidacao = document.getElementById("resultadoValidacao");
const listaReservas = document.getElementById("listaReservas");
const buscaTexto = document.getElementById("buscaTexto");
const filtroBtns = document.querySelectorAll(".filtro-btn");

const contTodos = document.getElementById("cont-todos");
const contPendente = document.getElementById("cont-pendente");
const contConcluida = document.getElementById("cont-concluida");

let statusFiltroAtual = "todos";

function atualizarContadores() {
  const reservas = obterReservas();
  const pendentes = reservas.filter((r) => r.status === "pendente").length;
  const concluidas = reservas.filter((r) => r.status === "concluida").length;

  contTodos.textContent = reservas.length;
  contPendente.textContent = pendentes;
  contConcluida.textContent = concluidas;
}

function renderizarLista() {
  const reservas = obterReservas();
  const termo = buscaTexto.value.trim().toLowerCase();

  const filtradas = reservas.filter((r) => {
    const atendeStatus =
      statusFiltroAtual === "todos" || r.status === statusFiltroAtual;
    const atendeBusca =
      !termo ||
      r.codigo.toLowerCase().includes(termo) ||
      r.nome.toLowerCase().includes(termo);
    return atendeStatus && atendeBusca;
  });

  atualizarContadores();

  if (filtradas.length === 0) {
    listaReservas.innerHTML = `
      <p class="text-center py-6 text-white/50 text-sm">
        Nenhuma reserva encontrada.
      </p>
    `;
    return;
  }

  listaReservas.innerHTML = filtradas
    .map((r) => {
      const isConcluida = r.status === "concluida";
      const statusLabel = isConcluida
        ? "Concluída / Paga"
        : "Pendente de Pagamento";
      const statusClass = isConcluida
        ? "text-cyan-400 bg-cyan-500/20"
        : "text-amber-300 bg-amber-500/20";

      return `
        <div
          class="reserva-card p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:scale-[1.02] transition cursor-pointer"
          data-codigo="${r.codigo}"
        >
          <div class="flex items-center justify-between mb-1.5">
            <span class="font-bold text-cyan-300 tracking-wider">${r.codigo}</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full font-semibold ${statusClass}">
              ${statusLabel}
            </span>
          </div>

          <div class="text-sm text-white/90 font-medium">
            ${r.nome}
          </div>

          <div class="flex items-center justify-between text-xs text-white/60 mt-2">
            <span>Dia ${r.dia} • ${r.totalIngressos} ingresso(s)</span>
            <span class="text-cyan-400 font-bold">R$ ${r.totalValor}</span>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".reserva-card").forEach((card) => {
    card.addEventListener("click", () => {
      const codigo = card.dataset.codigo;
      inputCodigo.value = codigo;
      buscarCodigo(codigo);
    });
  });
}

function buscarCodigo(codigoParam) {
  const codigo = (codigoParam || inputCodigo.value).trim().toUpperCase();

  if (!codigo) {
    alert("Digite o código da reserva para consultar.");
    return;
  }

  const reservas = obterReservas();
  const reserva = reservas.find((r) => r.codigo === codigo);

  resultadoValidacao.classList.remove("hidden");

  if (!reserva) {
    resultadoValidacao.innerHTML = `
      <div class="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
        <p class="font-bold text-cyan-300 mb-1">Código Não Encontrado</p>
        <p class="text-sm text-white/60">
          Nenhuma reserva localizada com o código <strong>${codigo}</strong>. Verifique se o código foi digitado corretamente.
        </p>
      </div>
    `;
    return;
  }

  const isPendente = reserva.status === "pendente";
  const resumoItens = reserva.itens
    ? reserva.itens
        .map((i) => `${i.quantidade}x ${i.tipo} (R$ ${i.subtotal})`)
        .join(", ")
    : `${reserva.totalIngressos} ingresso(s)`;

  resultadoValidacao.innerHTML = `
    <div class="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-xs text-white/50 uppercase tracking-wider font-semibold">Reserva Localizada</span>
        <span class="text-xs px-3 py-1 rounded-full font-bold ${
          isPendente
            ? "text-amber-300 bg-amber-500/20"
            : "text-cyan-400 bg-cyan-500/20"
        }">
          ${isPendente ? "Pendente de Pagamento" : "Concluída / Paga"}
        </span>
      </div>

      <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
        <p class="text-xs text-white/50 mb-1">CÓDIGO DA RESERVA</p>
        <p class="text-3xl font-bold text-cyan-400 tracking-wider">${reserva.codigo}</p>
      </div>

      <div class="space-y-2 text-sm text-white/80 border-t border-white/10 pt-3">
        <p><strong>Titular:</strong> ${reserva.nome}</p>
        <p><strong>E-mail:</strong> ${reserva.email || "Não informado"}</p>
        <p><strong>Telefone:</strong> ${reserva.telefone || "Não informado"}</p>
        <p><strong>Data Agendada:</strong> Dia ${reserva.dia} deste mês</p>
        <p><strong>Ingressos:</strong> ${resumoItens}</p>
        <p class="text-base pt-1">
          <strong>Total a cobrar no local:</strong>
          <span class="text-cyan-400 font-bold">R$ ${reserva.totalValor}</span>
        </p>
        ${
          reserva.pagoEm
            ? `<p class="text-xs text-white/50 pt-1">Pago em: ${new Date(reserva.pagoEm).toLocaleString("pt-BR")}</p>`
            : ""
        }
      </div>

      ${
        isPendente
          ? `
        <button
          id="btnConfirmarPagamento"
          class="w-full mt-4 bg-cyan-400 text-slate-900 py-4 rounded-full font-bold hover:scale-105 transition cursor-pointer"
        >
          Confirmar Pagamento Presencial
        </button>
      `
          : `
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center text-sm text-cyan-300 font-semibold">
          Pagamento já confirmado. Acesso liberado para a visita!
        </div>
      `
      }
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const btnConfirmar = document.getElementById("btnConfirmarPagamento");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", () => {
      confirmarPagamento(reserva.codigo);
    });
  }
}

function confirmarPagamento(codigo) {
  const reservas = obterReservas();
  const index = reservas.findIndex((r) => r.codigo === codigo);

  if (index === -1) return;

  reservas[index].status = "concluida";
  reservas[index].pagoEm = new Date().toISOString();

  salvarReservas(reservas);

  alert(
    `Pagamento da reserva ${codigo} confirmado com sucesso!\nEntrada liberada.`,
  );

  buscarCodigo(codigo);
  renderizarLista();
}

btnBuscar.addEventListener("click", () => buscarCodigo());

inputCodigo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarCodigo();
  }
});

buscaTexto.addEventListener("input", renderizarLista);

filtroBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroBtns.forEach((b) => b.classList.remove("bg-cyan-400/20"));
    btn.classList.add("bg-cyan-400/20");

    statusFiltroAtual = btn.dataset.status;
    renderizarLista();
  });
});

renderizarLista();

if (window.lucide) {
  window.lucide.createIcons();
}
