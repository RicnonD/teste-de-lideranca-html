const express = require('express');
const path = require('path');
const app = express();

// Configurações
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'Sobre' });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contato' });
});

app.get('/test', (req, res) => {
  res.render('pages/test', { title: 'Teste de Liderança' });
});

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});