const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do EJS como motor de visualização
app.set('views', path.join(__dirname, 'views')); // Caminho para a pasta views
app.set('view engine', 'ejs');

// Rotas
app.get('/', (req, res) => {
    res.render('index'); // Renderiza o arquivo index.ejs
});

app.get('/sobre', (req, res) => {
    res.render('pages/sobre'); // Renderiza o arquivo sobre.ejs
});

app.get('/contato', (req, res) => {
    res.render('pages/contato'); // Renderiza o arquivo contato.ejs
});

app.get('/teste', (req, res) => {
    res.render('pages/teste'); // Renderiza o arquivo teste.ejs
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});