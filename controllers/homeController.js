exports.getHome = (req, res) => {
  res.render('index', { title: 'Home' });
};

exports.getAbout = (req, res) => {
  res.render('pages/about', { title: 'Sobre' });
};

exports.getContact = (req, res) => {
  res.render('pages/contact', { title: 'Contato' });
};

exports.getTest = (req, res) => {
  res.render('pages/test', { title: 'Teste de Liderança' });
};