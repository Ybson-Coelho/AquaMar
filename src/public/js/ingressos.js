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

const precos = {
  Adulto: 59,
  Infantil: 29,
  Meia: 29,
  VIP: 99,
};

const quantidades = {
  Adulto: 1,
  Infantil: 0,
  Meia: 0,
  VIP: 0,
};

const diaSelect = document.getElementById("dia");
const eventosContainer = document.getElementById("eventos-dia");
const resumoItens = document.getElementById("resumoItens");
const resumoQuantidade = document.getElementById("resumoQuantidade");
const totalEl = document.getElementById("total");
const btnComprar = document.getElementById("comprar");

const resultado = document.getElementById("resultado");
const resCodigo = document.getElementById("resCodigo");
const resumoConfirmacao = document.getElementById("resumoConfirmacao");
const btnCopiar = document.getElementById("btnCopiar");
const btnPdf = document.getElementById("btnPdf");

let ultimaReserva = null;

function inicializarDias() {
  const urlParams = new URLSearchParams(window.location.search);
  const diaParam = urlParams.get("dia");

  diaSelect.innerHTML = "";
  Object.keys(events).forEach((dia) => {
    const option = document.createElement("option");
    option.value = dia;
    option.textContent = `Dia ${dia}`;
    if (diaParam && String(dia) === String(diaParam)) {
      option.selected = true;
    }
    diaSelect.appendChild(option);
  });
}

function atualizarEventos() {
  const dia = diaSelect.value;
  const eventos = events[dia] || [];

  if (eventos.length === 0) {
    eventosContainer.innerHTML = `
      <p class="text-white/50 text-sm">Nenhum evento especial nesta data.</p>
    `;
    return;
  }

  eventosContainer.innerHTML = eventos
    .map(
      (evento) => `
        <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-3">
          <p class="font-semibold">${evento.title}</p>
          <p class="text-cyan-300 text-sm mt-0.5">${evento.time}</p>
        </div>
      `,
    )
    .join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function atualizarTotal() {
  let total = 0;
  let totalQtd = 0;
  let itensHtml = "";

  Object.entries(quantidades).forEach(([tipo, qtd]) => {
    if (qtd > 0) {
      const subtotal = precos[tipo] * qtd;
      total += subtotal;
      totalQtd += qtd;

      const nomeTipo =
        tipo === "Meia" ? "Meia-Entrada" : tipo === "VIP" ? "Passe VIP" : tipo;

      itensHtml += `
        <div class="flex justify-between text-sm">
          <span>${qtd}x ${nomeTipo}</span>
          <span class="text-cyan-300 font-semibold">R$ ${subtotal}</span>
        </div>
      `;
    }
  });

  if (totalQtd === 0) {
    itensHtml = `<p class="text-xs text-white/50">Nenhum ingresso selecionado.</p>`;
  }

  resumoItens.innerHTML = itensHtml;
  resumoQuantidade.textContent = totalQtd;
  totalEl.textContent = `R$ ${total}`;
}

document.querySelectorAll(".qtd-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tipo = btn.dataset.tipo;
    const action = btn.dataset.action;

    if (action === "aumentar") {
      const totalAtual = Object.values(quantidades).reduce((a, b) => a + b, 0);
      if (totalAtual >= 10) {
        alert("Você pode reservar no máximo 10 ingressos por vez.");
        return;
      }
      quantidades[tipo]++;
    } else if (action === "diminuir") {
      if (quantidades[tipo] > 0) {
        quantidades[tipo]--;
      }
    }

    const spanQtd = document.getElementById(`qtd-${tipo}`);
    if (spanQtd) {
      spanQtd.textContent = quantidades[tipo];
    }

    atualizarTotal();
  });
});

diaSelect.addEventListener("change", atualizarEventos);

function gerarCodigoUnico(reservas) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "";
  let existe = true;

  while (existe) {
    let rand = "";
    for (let i = 0; i < 6; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    codigo = `AQM-${rand}`;
    existe = reservas.some((r) => r.codigo === codigo);
  }

  return codigo;
}

btnComprar.addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const dia = diaSelect.value;

  if (!nome) {
    alert("Digite seu nome completo.");
    return;
  }

  if (nome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres.");
    return;
  }

  if (!email) {
    alert("Digite seu e-mail.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Digite um e-mail válido.");
    return;
  }

  if (!telefone || telefone.length < 8) {
    alert("Digite um número de telefone válido com DDD.");
    return;
  }

  const totalQtd = Object.values(quantidades).reduce((a, b) => a + b, 0);
  if (totalQtd < 1) {
    alert("A quantidade mínima é 1 ingresso.");
    return;
  }

  let totalValor = 0;
  const itens = [];
  Object.entries(quantidades).forEach(([tipo, qtd]) => {
    if (qtd > 0) {
      const subtotal = precos[tipo] * qtd;
      totalValor += subtotal;
      itens.push({
        tipo:
          tipo === "Meia"
            ? "Meia-Entrada"
            : tipo === "VIP"
              ? "Passe VIP"
              : tipo,
        quantidade: qtd,
        precoUnitario: precos[tipo],
        subtotal,
      });
    }
  });

  const resumoTextoItens = itens
    .map((i) => `${i.quantidade}x ${i.tipo}`)
    .join(", ");

  const confirmar = confirm(
    `Confirmar pré-reserva?\n\n` +
      `Nome: ${nome}\n` +
      `Ingressos: ${resumoTextoItens}\n` +
      `Dia: ${dia}\n` +
      `Total a pagar no local: R$ ${totalValor}\n\n` +
      `Lembre-se: o pagamento é realizado somente presencialmente no Aquário Aquamar.`,
  );

  if (!confirmar) {
    return;
  }

  let reservas = [];
  try {
    const raw = localStorage.getItem("aquamar_reservas");
    if (raw) reservas = JSON.parse(raw);
  } catch (e) {
    reservas = [];
  }

  const codigo = gerarCodigoUnico(reservas);

  const novaReserva = {
    codigo,
    nome,
    email,
    telefone,
    dia,
    itens,
    totalIngressos: totalQtd,
    totalValor,
    eventos: events[dia] || [],
    status: "pendente",
    criadoEm: new Date().toISOString(),
    pagoEm: null,
  };

  reservas.unshift(novaReserva);
  localStorage.setItem("aquamar_reservas", JSON.stringify(reservas));
  ultimaReserva = novaReserva;

  resultado.classList.remove("hidden");
  resCodigo.textContent = codigo;

  resumoConfirmacao.innerHTML = `
    <p><strong>Titular:</strong> ${nome}</p>
    <p><strong>Data:</strong> Dia ${dia} deste mês</p>
    <p><strong>Ingressos:</strong> ${resumoTextoItens}</p>
    <p><strong>Valor na bilheteria:</strong> <span class="text-cyan-400 font-bold">R$ ${totalValor}</span></p>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  resultado.scrollIntoView({ behavior: "smooth", block: "nearest" });

  alert(
    `Reserva gerada com sucesso!\n\n` +
      `Código: ${codigo}\n\n` +
      `Apresente este código na bilheteria do Aquário Aquamar para efetuar o pagamento e retirar suas pulseiras de entrada.`,
  );
});

btnCopiar.addEventListener("click", () => {
  if (!ultimaReserva) return;

  navigator.clipboard.writeText(ultimaReserva.codigo).then(() => {
    btnCopiar.textContent = "Código Copiado!";
    setTimeout(() => {
      btnCopiar.textContent = "Copiar Código";
    }, 2500);
  });
});

btnPdf.addEventListener("click", () => {
  if (!ultimaReserva) return;

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.setFillColor(3, 20, 33);
    pdf.rect(0, 0, 210, 297, "F");

    pdf.setFillColor(12, 51, 80);
    pdf.roundedRect(15, 15, 180, 30, 4, 4, "F");

    pdf.setTextColor(34, 211, 238);
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    pdf.text("AQUAMAR", 25, 28);

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text("Comprovante de Reserva - Pagamento Presencial", 25, 37);

    pdf.setFillColor(12, 51, 80);
    pdf.setDrawColor(34, 211, 238);
    pdf.setLineWidth(0.6);
    pdf.roundedRect(15, 52, 180, 28, 4, 4, "FD");

    pdf.setFontSize(9);
    pdf.setTextColor(34, 211, 238);
    pdf.text("CÓDIGO DA SUA RESERVA", 25, 62);

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(255, 255, 255);
    pdf.text(ultimaReserva.codigo, 25, 73);

    pdf.setFillColor(18, 40, 60);
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.2);
    pdf.roundedRect(15, 86, 180, 24, 3, 3, "FD");

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(34, 211, 238);
    pdf.text("ATENÇÃO - PAGAMENTO SOMENTE PRESENCIAL", 20, 94);

    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(220, 230, 240);
    pdf.text(
      "O código não é um ingresso pago. Ele representa uma reserva ou atendimento prévio.",
      20,
      100,
    );
    pdf.text(
      "O pagamento será realizado SOMENTE presencialmente no Aquário Aquamar na bilheteria.",
      20,
      105,
    );

    pdf.setFillColor(12, 51, 80);
    pdf.roundedRect(15, 116, 180, 75, 4, 4, "F");

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(34, 211, 238);
    pdf.text("DETALHES DA VISITA", 25, 127);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(220, 230, 240);
    pdf.text(`Titular: ${ultimaReserva.nome}`, 25, 137);
    pdf.text(`E-mail: ${ultimaReserva.email}`, 25, 144);
    pdf.text(`Telefone: ${ultimaReserva.telefone}`, 25, 151);
    pdf.text(`Data: Dia ${ultimaReserva.dia} deste mês`, 25, 158);

    let currY = 166;
    pdf.text("Ingressos:", 25, currY);
    currY += 6;
    ultimaReserva.itens.forEach((it) => {
      pdf.text(
        `  • ${it.quantidade}x ${it.tipo} - R$ ${it.subtotal}`,
        25,
        currY,
      );
      currY += 6;
    });

    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(34, 211, 238);
    pdf.text(
      `Total a pagar no local: R$ ${ultimaReserva.totalValor}`,
      25,
      currY + 4,
    );

    if (ultimaReserva.eventos && ultimaReserva.eventos.length > 0) {
      pdf.setFillColor(12, 51, 80);
      pdf.roundedRect(15, 198, 180, 45, 4, 4, "F");

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(34, 211, 238);
      pdf.text("PROGRAMAÇÃO DA DATA", 25, 209);

      let evY = 217;
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(255, 255, 255);
      ultimaReserva.eventos.forEach((ev) => {
        pdf.text(`• ${ev.title} (${ev.time})`, 28, evY);
        evY += 6;
      });
    }

    pdf.setFontSize(8);
    pdf.setTextColor(180, 200, 215);
    pdf.text(
      `AquaMar • 09h - 22h todos os dias • Emitido em ${new Date().toLocaleString("pt-BR")}`,
      105,
      280,
      { align: "center" },
    );

    pdf.save(`Reserva-AquaMar-${ultimaReserva.codigo}.pdf`);
  } catch (e) {
    console.error("Erro ao gerar PDF:", e);
    alert("Seu código de reserva está confirmado e salvo!");
  }
});

inicializarDias();
atualizarEventos();
atualizarTotal();

if (window.lucide) {
  window.lucide.createIcons();
}
