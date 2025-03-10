const express = require("express");
const path = require("path");

const app = express(); // Criação da instância do Express
const port = process.env.PORT || 3000;

// ✅ Configuração do EJS como motor de visualização
app.set("views", path.join(__dirname, "views")); // Caminho absoluto para a pasta views
app.set("view engine", "ejs");

// ✅ Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// ✅ Rota da página inicial
app.get("/", (req, res) => {
    res.render("index"); // Renderiza views/index.ejs
});

// ✅ Outras rotas
app.get("/sobre", (req, res) => {
    res.render("pages/sobre"); // Renderiza views/pages/sobre.ejs
});

app.get("/contato", (req, res) => {
    res.render("pages/contato"); // Renderiza views/pages/contato.ejs
});

app.get("/teste", (req, res) => {
    res.render("pages/teste"); // Renderiza views/pages/teste.ejs
});

// ✅ Middleware para erros 404 (Página não encontrada)
app.use((req, res) => {
    res.status(404).render("pages/404"); // Renderiza views/pages/404.ejs
});

// ✅ Iniciar o servidor
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
