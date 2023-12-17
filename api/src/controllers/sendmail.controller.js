const nodemailer = require("nodemailer");

async function sendEmailWithValidation(
  mailTo,
  password,
  username,
  subject = "Validation de votre compte maestroGRC"
) {
  const transporter = nodemailer.createTransport({
    host: "mail.karim-betkom.com",
    port: 465,
    secure: true,
    auth: {
      user: "contact@karim-betkom.com",
      pass: "contactKARIM237",
    },
  });

  let html = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
  <div>
    <p>Bonjour ${username},</p>
    <br />
    <p>Nous sommes ravis de vous accueillir sur notre plateforme !</p>
    <p>Voici vos informations de connexion :</p>
    <p>Identifiant: ${mailTo}<br />Mot de passe: ${password}<br />Lien de connexion: <a href="http://212.83.171.179/" target="_blank"></a></p>
    <p><strong>NB: </strong>Lors de votre première connexion, vous pouvez choisir de conserver le mot de passe ci-dessus généré aléatoirement<p/>
    <p>Si vous préférez, vous pouvez également personnaliser votre mot de passe dans Mon_compte>Données_personnelles après votre première connexion.<p/>
    <p>Nous vous attendons avec impatience sur notre plateforme. À très bientôt !<p/>
  </div>
  <br />
  <br />
    <p style="margin: 0 0 20px 0;">Cordialement</p>
    <div style="display: flex; gap: 30px;">
      <div style="text-align: center;">
        <img src="#" width="45" height="55" />
        <p style="margin: 10px 0 10px 0;">Donnez-nous la possibilité de vous <br /> satisfaire !</p>
        <a title="growkom" href="https://www.ergosum.fr/" target="_blank" rel="noopener noreferrer">www.www.ergosum.fr </a>
        <p><a title="growkom" href="https://www.maestroprojet.fr/" target="_blank" rel="noopener noreferrer">www.maestroprojet.fr</a></p>
      </div>
      <div style="margin-left: 20px;">
        <p style="margin: 0 0 5px 0;">M. John Doe</p>
        <p style="margin: 0 0 5px 0;"><strong>Service client</strong></p>
        <address style="margin: 0 0 5px 0;">
          <p style="margin: 0 0 5px 0;">8 rue Gracieuse</p>
          <p style="margin: 0 0 5px 0;">75005 Paris</p>
        </address>
        <p style="margin: 0 0 5px 0;">Tel: +33 (0)6 19 39 58 28</p>
        <a href="mailto:gilles.pengue@ergosum.fr">gilles.pengue@ergosum.fr</a>
      </div>
    </div>
  </body>
  </html>`;

  const mailOptions = {
    from: "karim <contact@karim-betkom.com>",
    to: mailTo,
    subject: subject,
    html: html,
  };

  // Transformez transporter.sendMail en une fonction asynchrone
  const sendMailAsync = () => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Erreur lors de l'envoi de l'e-mail : " + error);
          reject(error); // Rejette la promesse en cas d'erreur
        } else {
          console.log("E-mail envoyé : " + info.response);
          resolve(true); // Résout la promesse en cas de succès
        }
      });
    });
  };

  try {
    await sendMailAsync(); // Attend que l'envoi de l'e-mail soit terminé
    return true; // Retourne true si l'envoi est réussi
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail : " + error);
    return false; // Retourne false en cas d'erreur
  }
}

async function sendEmailOnUpdatePassword(
  mailTo,
  username,
  subject = "Mise à jour de votre mot de passe - maestroGRC"
) {
  const transporter = nodemailer.createTransport({
    host: "mail.karim-betkom.com",
    port: 465,
    secure: true,
    auth: {
      user: "contact@karim-betkom.com",
      pass: "contactKARIM237",
    },
  });

  let html = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
  <div>
    <p>Bonjour ${username},</p>
    <br />
    <p>Votre mot de passe a été mis à jour avec succès.</p>
    <p>Si vous n'être pas à l'origine de cette action, veuillez nous informer au plus vite.</p>
    <p>À très bientôt !<p/>
  </div>
  <br />
  <br />
    <p style="margin: 0 0 20px 0;">Cordialement</p>
    <div style="display: flex; gap: 30px;">
      <div style="text-align: center;">
        <img src="#" width="45" height="55" />
        <p style="margin: 10px 0 10px 0;">Donnez-nous la possibilité de vous <br /> satisfaire !</p>
        <a title="growkom" href="https://www.ergosum.fr/" target="_blank" rel="noopener noreferrer">www.www.ergosum.fr </a>
        <p><a title="growkom" href="https://www.maestroprojet.fr/" target="_blank" rel="noopener noreferrer">www.maestroprojet.fr</a></p>
      </div>
      <div style="margin-left: 20px;">
        <p style="margin: 0 0 5px 0;">M. John Doe</p>
        <p style="margin: 0 0 5px 0;"><strong>Service client</strong></p>
        <address style="margin: 0 0 5px 0;">
          <p style="margin: 0 0 5px 0;">8 rue Gracieuse</p>
          <p style="margin: 0 0 5px 0;">75005 Paris</p>
        </address>
        <p style="margin: 0 0 5px 0;">Tel: +33 (0)6 19 39 58 28</p>
        <a href="mailto:gilles.pengue@ergosum.fr">gilles.pengue@ergosum.fr</a>
      </div>
    </div>
  </body>
  </html>`;

  const mailOptions = {
    from: "karim <contact@karim-betkom.com>",
    to: mailTo,
    subject: subject,
    html: html,
  };

  // Transformez transporter.sendMail en une fonction asynchrone
  const sendMailAsync = () => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Erreur lors de l'envoi de l'e-mail : " + error);
          reject(error); // Rejette la promesse en cas d'erreur
        } else {
          console.log("E-mail envoyé : " + info.response);
          resolve(true); // Résout la promesse en cas de succès
        }
      });
    });
  };

  try {
    await sendMailAsync(); // Attend que l'envoi de l'e-mail soit terminé
    return true; // Retourne true si l'envoi est réussi
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail : " + error);
    return false; // Retourne false en cas d'erreur
  }
}

module.exports = { sendEmailWithValidation, sendEmailOnUpdatePassword };
