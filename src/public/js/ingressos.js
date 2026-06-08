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
  Infantil: 29,
  Adulto: 59,
  VIP: 99,
};

const diaSelect = document.getElementById("dia");

Object.keys(events).forEach((dia) => {
  const option = document.createElement("option");

  option.value = dia;
  option.textContent = `Dia ${dia}`;

  diaSelect.appendChild(option);
});

function atualizarEventos() {
  const dia = diaSelect.value;

  const container = document.getElementById("eventos-dia");

  container.innerHTML = events[dia]
    .map(
      (evento) => `
        <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-3">
          <p class="font-semibold">
            ${evento.title}
          </p>

          <p class="text-cyan-300">
            ${evento.time}
          </p>
        </div>
      `,
    )
    .join("");
}

function atualizarTotal() {
  const tipo = document.getElementById("tipo").value;

  const quantidade = Number(document.getElementById("quantidade").value);

  document.getElementById("resumoTipo").textContent = tipo;

  document.getElementById("resumoQuantidade").textContent = quantidade;

  document.getElementById("total").textContent = `R$ ${
    precos[tipo] * quantidade
  }`;
}

diaSelect.addEventListener("change", atualizarEventos);

document.getElementById("tipo").addEventListener("change", atualizarTotal);

document.getElementById("quantidade").addEventListener("input", atualizarTotal);

atualizarEventos();
atualizarTotal();

document.getElementById("comprar").addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const tipo = document.getElementById("tipo").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const dia = diaSelect.value;

  if (!nome) {
    alert("Digite seu nome.");
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

  if (quantidade < 1) {
    alert("A quantidade mínima é 1 ingresso.");
    return;
  }

  if (quantidade > 10) {
    alert("Você pode comprar no máximo 10 ingressos por vez.");
    return;
  }

  const total = precos[tipo] * quantidade;

  const confirmar = confirm(
    `Confirmar compra?\n\n` +
      `Tipo: ${tipo}\n` +
      `Quantidade: ${quantidade}\n` +
      `Dia: ${dia}\n\n` +
      `Total: R$ ${total}`,
  );

  if (!confirmar) {
    return;
  }

  try {
    const resposta = await fetch("/api/ingressos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        tipo,
        quantidade,
        dia,
        eventos: events[dia],
      }),
    });

    if (!resposta.ok) {
      throw new Error();
    }

    const dados = await resposta.json();

    const resultado = document.getElementById("resultado");

    resultado.classList.remove("hidden");

    resultado.innerHTML = `
      <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
        Compra realizada
        <i data-lucide="party-popper"></i>
      </h3>

      <p>
        <strong>Código:</strong>
        ${dados.ingresso.codigo}
      </p>

      <p>
        <strong>Tipo:</strong>
        ${dados.ingresso.tipo}
      </p>

      <p>
        <strong>Quantidade:</strong>
        ${dados.ingresso.quantidade}
      </p>

      <p>
        <strong>Dia:</strong>
        ${dados.ingresso.dia}
      </p>
    `;

    lucide.createIcons();

    alert(
      `Compra realizada com sucesso!\n\n` + `Código: ${dados.ingresso.codigo}`,
    );

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1489, 785],
    });

    const img = new Image();

    img.onload = () => {
      pdf.addImage(img, "PNG", 0, 0, 1489, 785);

      pdf.setTextColor(255, 255, 255);

      pdf.setFontSize(42);

      pdf.text("INGRESSO OFICIAL", 90, 180);

      let y = 240;

      pdf.setFontSize(26);

      pdf.text(`Código: ${dados.ingresso.codigo}`, 90, y);

      y += 50;

      pdf.text(`Nome: ${dados.ingresso.nome}`, 90, y);

      y += 50;

      pdf.text(`Tipo: ${dados.ingresso.tipo}`, 90, y);

      y += 50;

      pdf.text(`Quantidade: ${dados.ingresso.quantidade}`, 90, y);

      y += 50;

      pdf.text(`Dia: ${dados.ingresso.dia}`, 90, y);

      y += 50;

      pdf.text(`Valor: R$ ${total}`, 90, y);

      pdf.setFontSize(32);

      pdf.text("PROGRAMAÇÃO", 800, 220);

      let eventY = 280;

      pdf.setFontSize(24);

      dados.ingresso.eventos.forEach((evento) => {
        pdf.roundedRect(800, eventY - 30, 500, 60, 10, 10);

        pdf.text(evento.title, 830, eventY);

        pdf.text(evento.time, 1180, eventY);

        eventY += 90;
      });

      pdf.setFontSize(18);

      pdf.text(`Emitido em ${new Date().toLocaleString("pt-BR")}`, 90, 700);

      pdf.save(`Ingresso-${dados.ingresso.codigo}.pdf`);
    };

    img.src = "/images/ingresso.png";

    img.src = "/images/ingresso.png";
  } catch (error) {
    alert("Não foi possível concluir a compra. Tente novamente.");
  }
});
