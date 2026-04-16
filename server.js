const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "meu_segredo_super_forte";

// 🔐 Rota de login
app.post("/login", (req, res) => {
    const { id, nome, cargo } = req.body;

    // validação básica
    if (!id || !nome) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    // aqui você validaria no banco

    const token = jwt.sign(
        { id, nome, cargo },
        SECRET,
        { expiresIn: "1h" } // token temporário
    );

    res.json({ token });
});

// 🔒 Middleware para proteger rotas
function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}

// 🔐 Rota protegida
app.get("/dashboard", autenticar, (req, res) => {
    res.json({
        mensagem: "Acesso liberado!",
        usuario: req.user
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});