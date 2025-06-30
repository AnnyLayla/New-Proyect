require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔗 Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reserva_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Base de datos conectada");
});

// 📩 Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,     // tu email desde .env
    pass: process.env.PASSWORD   // contraseña o App Password desde .env
  }
});

// 📌 Ruta: guardar reserva y enviar correo
app.post("/reservas", async (req, res) => {
  const { nombre, email, telefono, identrada, idsaida, idadultos } = req.body;

  // Insertar en base de datos
  const sql = "INSERT INTO reservas (nombre, email, telefono, entrada, salida, adultos) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [nombre, email, telefono, identrada, idsaida, idadultos], async (err, result) => {
    if (err) {
      console.error("❌ Error BD:", err);
      return res.status(500).json({ mensaje: "Error al guardar en la base de datos" });
    }

    // Enviar correo
    const mailOptions = {
      from: process.env.EMAIL,
      to: "minoayelen133@gmail.com", // cambiar si querés
      subject: "Nueva Reserva Recibida",
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Teléfono: ${telefono}
        Entrada: ${identrada}
        Salida: ${idsaida}
        Adultos: ${idadultos}
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ mensaje: "✅ Reserva guardada y correo enviado" });
    } catch (error) {
      console.error("❌ Error al enviar el correo:", error);
      res.status(500).json({ mensaje: "Reserva guardada pero error al enviar correo" });
    }
  });
});

// 🟢 Iniciar el servidor
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
