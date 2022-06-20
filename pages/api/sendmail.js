const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const order_id = req.body.order_id;
    const correo = req.body.correo;

    try {
      const mail = await sendMail(correo, order_id);
      console.log(mail);
      res.status(200).json({ message: "ok" });
    } catch (error) {
      res.status(400).json({ message: "bad request" });
    }
  }
}

const sendMail = (email, order_id) => {
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
      from: '"CITA INNATE" <from@example.com>',
      to: email,
      subject: "Cita agendada",
      text: "Confirmacion de cita",
      html: `<b>Hola!! </b><br> Tu cita ha sido agendada con exito.<br />El id de tu cita es <b>${order_id}</b>`,
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
