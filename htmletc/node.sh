npm init -y
npm install express mssql cors body-parser
node server.js

const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de SQL Server
const dbConfig = {
    user: "tu_usuario",  // 🔹 Reemplaza con tu usuario de SQL Server
    password: "tu_contraseña", // 🔹 Reemplaza con tu contraseña de SQL Server
    server: "localhost", // O el nombre de tu servidor SQL
    database: "usuario", // 🔹 Reemplaza con el nombre correcto de la base de datos
    options: {
        encrypt: false, // 🔹 Cámbialo a true si usas Azure
        trustServerCertificate: true
    }
};

// Ruta para registrar usuarios en la base de datos
app.post("/registrar", async (req, res) => {
    const { nombre, apellido, dias_de_estadia, fecha, gmail } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input("nombre", sql.VarChar, nombre)
            .input("apellido", sql.VarChar, apellido)
            .input("dias_de_estadia", sql.VarChar, dias_de_estadia)
            .input("fecha", sql.VarChar, fecha)
            .input("gmail", sql.VarChar, gmail)
            .query("INSERT INTO Usuario (nombre, apellido, dias_de_estadia, fecha, gmail) VALUES (@nombre, @apellido, @dias_de_estadia, @fecha, @gmail)");

        res.send("✅ Usuario registrado correctamente");
    } catch (err) {
        console.error("❌ Error al conectar a la base de datos:", err);
        res.status(500).send("Error al registrar usuario");
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});
