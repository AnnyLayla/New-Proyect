require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// 🚦 Definir rate limiter para reservas
const reservasLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutos
  max: 5,                     // máximo 5 solicitudes por ventana
  message: "Demasiadas reservas desde esta IP, intentá nuevamente luego."
});

// 🚦 Definir limitador de tarifa para reservas
constante  reservasLimiter  =  rateLimit ( {
  windowMs : 15  *  60  *  1000 ,    // 15 minutos
  max : 5 ,                      // máximo 5 solicitudes por ventana
  mensaje: "Demasiadas reservas desde esta IP, intentá nuevamente luego."
} ) ;

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
aplicación . post ( "/reservas" ,  async  ( req ,  res )  =>  {	app.post ( " / reservas" , limitadordereservas , async ( req , res ) = > {      
  const  { nombre , email , telefono , identrada , idsaida , idadultos }  =  req . cuerpo ;	  const  { nombre , email , telefono , identrada , idsaida , idadultos }  =  req . cuerpo ;

  // Insertar en base de datos
  const sql = "INSERT INTO reservas (nombre, email, telefono, entrada, salida, adultos) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [nombre, email, telefono, identrada, idsaida, idadultos], async (err, result) => {
    if (err) {
      console.error("❌ Error BD:", err);
      return res.status(500).json({ mensaje: "Error al guardar en la base de datos" });

        "dotenv" : " ^16.4.7 " ,
    "express" : " ^4.22.0 " ,	    "express" : " ^4.22.0 " ,
    "mysql2" : " ^3.14.1 " ,	    "mysql2" : " ^3.14.1 " ,
    "nodemailer" : " ^7.0.11 "	    "nodemailer" : " ^7.0.11 " ,
    "límite de velocidad expresa" : " ^8.2.1 "
  },	  },
  "descripción" : " "	  "descripción" : " "
}	}
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

