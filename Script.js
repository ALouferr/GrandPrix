const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "segredo_super_forte";

// rota de login
app.post("/login", (req, res) => {
    const { id, nome, cargo } = req.body;

    // aqui você validaria no banco
    if (!id || !nome) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    const token = jwt.sign(
        { id, nome, cargo }, 
        SECRET,
        { expiresIn: "1h" } // token temporário
    );

    res.json({ token });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));