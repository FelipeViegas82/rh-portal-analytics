// Estado da aplicação
let colaboradores = [];
let listaFiltrada = [];

// Elementos da interface
const tbody = document.getElementById("tbodyColaboradores");
const inputBusca = document.getElementById("inputBusca");
const selectDepto = document.getElementById("selectDepto");
const selectStatus = document.getElementById("selectStatus");
const selectGenero = document.getElementById("selectGenero");
const btnLimpar = document.getElementById("btnLimpar");

const kpiTotal = document.getElementById("kpiTotal");
const kpiAtivos = document.getElementById("kpiAtivos");
const kpiDesligados = document.getElementById("kpiDesligados");
const kpiSalarioMedio = document.getElementById("kpiSalarioMedio");
const labelTotal = document.getElementById("labelTotal");

// Carregar e processar o arquivo CSV da pasta ../data/
async function carregarDados() {
  try {
    const resposta = await fetch("../data/colaboradores.csv");
    if (!resposta.ok) throw new Error("Não foi possível carregar o arquivo CSV.");
    
    const textoCsv = await resposta.text();
    colaboradores = parseCSV(textoCsv);
    listaFiltrada = [...colaboradores];

    popularDepartamentos();
    renderizar();
    atualizarKPIs();
    labelTotal.textContent = `${colaboradores.length} registros sincronizados`;
  } catch (erro) {
    console.error(erro);
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="empty-state">
          Erro ao carregar os dados. Verifique se o arquivo colaboradores.csv está na pasta 'data'.
        </td>
      </tr>
    `;
    labelTotal.textContent = "Falha no carregamento";
  }
}

// Parser simples para CSV com suporte a cabeçalho
function parseCSV(text) {
  const linhas = text.trim().split("\n");
  if (linhas.length < 2) return [];

  const headers = linhas[0].split(",").map(h => h.trim().replace("\r", ""));

  return linhas.slice(1).map(linha => {
    const valores = linha.split(",").map(v => v.trim().replace("\r", ""));
    const objeto = {};
    headers.forEach((header, index) => {
      objeto[header] = valores[index] || "";
    });
    // Converter salário para float
    objeto.salarioNum = parseFloat(objeto.salario) || 0;
    return objeto;
  });
}

// Preenche opções do filtro de departamento dinamicamente
function popularDepartamentos() {
  const deptos = [...new Set(colaboradores.map(c => c.departamento))].filter(Boolean).sort();
  deptos.forEach(depto => {
    const opt = document.createElement("option");
    opt.value = depto;
    opt.textContent = depto;
    selectDepto.appendChild(opt);
  });
}

// Aplica todos os filtros em tempo real
function aplicarFiltros() {
  const termo = inputBusca.value.toLowerCase().trim();
  const depto = selectDepto.value;
  const status = selectStatus.value;
  const genero = selectGenero.value;

  listaFiltrada = colaboradores.filter(c => {
    const matchTermo = 
      !termo ||
      c.nome.toLowerCase().includes(termo) ||
      c.cargo.toLowerCase().includes(termo) ||
      c.id.toString().includes(termo);

    const matchDepto = !depto || c.departamento === depto;
    const matchStatus = !status || c.status === status;
    const matchGenero = !genero || c.genero === genero;

    return matchTermo && matchDepto && matchStatus && matchGenero;
  });

  renderizar();
  atualizarKPIs();
}

// Renderiza linhas da tabela
function renderizar() {
  if (listaFiltrada.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="empty-state">Nenhum colaborador encontrado com os filtros atuais.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = listaFiltrada.map(c => {
    const isAtivo = c.status === "Ativo";
    const badgeClass = isAtivo ? "badge-active" : "badge-inactive";
    const salarioFormatado = c.salarioNum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    return `
      <tr>
        <td><strong>#${c.id}</strong></td>
        <td>${c.nome}</td>
        <td>${c.departamento}</td>
        <td>${c.cargo}</td>
        <td>${c.genero}</td>
        <td>${c.raca_cor}</td>
        <td>${salarioFormatado}</td>
        <td>${c.data_admissao}</td>
        <td><span class="badge ${badgeClass}">${c.status}</span></td>
      </tr>
    `;
  }).join("");
}

// Atualiza os cartões superiores
function atualizarKPIs() {
  const total = listaFiltrada.length;
  const ativos = listaFiltrada.filter(c => c.status === "Ativo").length;
  const desligados = total - ativos;
  const somaSalarios = listaFiltrada.reduce((acc, curr) => acc + curr.salarioNum, 0);
  const mediaSalarial = total > 0 ? somaSalarios / total : 0;

  kpiTotal.textContent = total;
  kpiAtivos.textContent = ativos;
  kpiDesligados.textContent = desligados;
  kpiSalarioMedio.textContent = mediaSalarial.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Reset de filtros
btnLimpar.addEventListener("click", () => {
  inputBusca.value = "";
  selectDepto.value = "";
  selectStatus.value = "";
  selectGenero.value = "";
  aplicarFiltros();
});

// Event listeners em tempo real
inputBusca.addEventListener("input", aplicarFiltros);
selectDepto.addEventListener("change", aplicarFiltros);
selectStatus.addEventListener("change", aplicarFiltros);
selectGenero.addEventListener("change", aplicarFiltros);

// Inicialização
carregarDados();