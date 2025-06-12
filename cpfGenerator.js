const express = require('express');
const app = express();
const port = 3000;

function gerarCPF() {
    const cpf = [];
    let soma, resto;

    // Gerar os 9 primeiros números aleatórios
    for (let i = 0; i < 9; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }

    // Calcular o 1º dígito verificador
    soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += cpf[i] * (10 - i);
    }
    resto = soma % 11;
    cpf.push(resto < 2 ? 0 : 11 - resto);

    // Calcular o 2º dígito verificador
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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
