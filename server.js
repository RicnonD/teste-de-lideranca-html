const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do EJS como motor de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rotas
app.get('/', (req, res) => {
    res.render('index'); // Renderiza o arquivo views/index.ejs
});

app.get('/sobre', (req, res) => {
    res.render('pages/sobre'); // Renderiza o arquivo views/pages/sobre.ejs
});

app.get('/contato', (req, res) => {
    res.render('pages/contato'); // Renderiza o arquivo views/pages/contato.ejs
});

app.get('/teste', (req, res) => {
    res.render('pages/teste'); // Renderiza o arquivo views/pages/teste.ejs
});

// Rota para lidar com erros 404 (página não encontrada)
app.use((req, res) => {
    res.status(404).render('pages/404'); // Renderiza uma página de erro 404 (opcional)
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});