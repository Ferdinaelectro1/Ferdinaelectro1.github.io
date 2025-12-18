// Serveur Express minimal pour tests locaux (optionnel)
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers publics
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/src', express.static(path.join(__dirname, '..', 'src')));
app.use('/components', express.static(path.join(__dirname, '..', 'components')));

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, ()=>console.log(`Server started on http://localhost:${PORT}`));

module.exports = app;
