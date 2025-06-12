const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function gerarCPF() {
    const cpf = [];
    let soma, resto;

    for (let i = 0; i < 9; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }

    soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += cpf[i] * (10 - i);
    }
    resto = soma % 11;
    cpf.push(resto < 2 ? 0 : 11 - resto);

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += cpf[i] * (11 - i);
    }
    resto = soma % 11;
    cpf.push(resto < 2 ? 0 : 11 - resto);

    return cpf.join('');
}

// Rota que gera um CPF aleatório
app.get('/generate-cpf', (req, res) => {
    res.json({ cpf: gerarCPF() });
});

// Opcional: rota raiz para mensagem simples
app.get('/', (req, res) => {
    res.send('API rodando! Use /generate-cpf para gerar um CPF.');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
