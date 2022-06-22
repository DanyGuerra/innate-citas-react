const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const order_id = req.body.order_id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const sucursal = req.body.sucursal;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const precio = req.body.precio;
    const origen = req.body.origen;

    const data = {
      order_id,
      name,
      email,
      phone,
      sucursal,
      fecha,
      hora,
      precio,
      origen,
    };
    console.log(data);

    if (!email) {
      return res.status(404).json({ message: "Bad request" });
    }

    if (!isEmail(email)) {
      return res.status(400).json({
        message: "Correo no válido",
      });
    }

    try {
      const mail = await sendMail(data);
      console.log(mail);
      res.status(200).json({ message: "ok" });
    } catch (error) {
      res.status(400).json({ message: "bad request" });
    }
  }
}

const sendMail = (data) => {
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
      host: process.env.SEND_MAIL_HOST_MAIL,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SEND_MAIL_EMAIL,
        pass: process.env.SEND_MAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: '"INNATE CITAS" <from@example.com>',
      to: data.email,
      subject: "Cita agendada",
      text: "Confirmacion de cita",
      html: `<b>Hola!! </b><br> Tu cita ha sido agendada con éxito.<br />Tu cita quedo agendada con la siguiente información: <br><br>
      <b>Nombre: </b> ${data.name}<br>
      <b>Teléfono: </b> ${data.phone}<br>
      <b>Sucursal: </b> ${data.sucursal}<br>
      <b>Fecha: </b> ${data.fecha}<br>
      <b>Hora: </b> ${data.hora}<br>
      <b>Precio: </b> ${data.precio}<br>
      <b>Id del pago: </b> ${data.order_id}<br>
      `,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
