# 📊 People Hub \& HR Analytics

# 

# Solução integrada de gestão e análise de Recursos Humanos combinando Power BI, Power Apps e um Portal Web Responsivo (HTML/CSS/JS) a partir de uma base central de dados de colaboradores.

# 

# 🏗️ Arquitetura da Solução

# 

# &#x20;              ┌───────────────────────────────┐

# &#x20;              │    Base de Colaboradores      │

# &#x20;              │   (data/colaboradores.csv)    │

# &#x20;              └───────────────┬───────────────┘

# &#x20;                              │

# &#x20;      ┌───────────────────────┼───────────────────────┐

# &#x20;      ▼                       ▼                       ▼

# ┌──────────────┐       ┌──────────────┐       ┌─────────────────┐

# │ Power Apps   │       │  Power BI    │       │   Web Portal    │

# │ (Cadastro \&  │       │ (Dashboards  │       │ (Consulta web   │

# │ Manutenção)  │       │ \& Métricas)  │       │ com busca \& JS) │

# └──────────────┘       └──────────────┘       └─────────────────┘

# 

# 

# 📁 Estrutura de Pastas

# 

# ├── data/

# │   └── colaboradores.csv       # Base com 100 registros (Headcount, D\&I, Salários, Turnover)

# ├── web-portal/

# │   ├── index.html              # Interface do diretório de funcionários

# │   ├── style.css               # Estilização com tema Dark moderno

# │   └── script.js               # Filtros dinâmicos, cálculo de KPIs e consumo do CSV

# ├── power-bi/

# │   ├── relatorio\_rh.pbix       # Arquivo de relatório com medidas DAX

# │   └── screenshots/            # Imagens demonstrativas do dashboard

# ├── power-apps/

# │   ├── app\_rh.msapp            # Pacote exportado da aplicação de formulários

# │   └── screenshots/            # Telas do fluxo de cadastro

# └── README.md                   # Documentação do projeto

# 

# 

# 💻 Módulo 1: Portal Web (HTML5, CSS3, JavaScript)

# 

# Interface leve e interativa para consulta rápida de colaboradores sem necessidade de licenças do ecossistema corporativo:

# 

# KPIs Automáticos: Headcount, colaboradores ativos, desligados e salário médio calculados em tempo real via JavaScript.

# 

# Filtros Combinados: Busca textual por nome/cargo/ID e filtros por Departamento, Status e Gênero.

# 

# Leitura Direta: Consumo do arquivo colaboradores.csv da pasta compartilhada do repositório.

# 

# Como visualizar localmente:

# 

# Abra a pasta web-portal.

# 

# Abra o arquivo index.html em qualquer navegador (Chrome, Edge, Firefox).

# 

# 📈 Módulo 2: People Analytics (Power BI)

# 

# (Em desenvolvimento)

# 

# Painel analítico focado em tomadores de decisão de RH, cobrindo:

# 

# Taxa de Turnover mensal e anual.

# 

# Indicadores de Diversidade \& Inclusão (distribuição por raça/cor e equidade de gênero por cargo).

# 

# Pirâmide salarial e dispersão por tempo de casa.

# 

# 📱 Módulo 3: App Operacional (Power Apps)

# 

# (Em desenvolvimento)

# 

# Formulário operacional para registro de novas contratações e movimentações de saída, garantindo validação de campos e integridade dos dados antes da gravação.

# 

# 👤 Autor

# 

# Desenvolvido por Felipe Viegas.

# 

# Sinta-se à vontade para conectar e trocar ideias sobre dados e automação de processos!

