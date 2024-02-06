import nodemailer from "nodemailer";

export const forgetPasswordEmail = async (options) => {
  
  let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "annathorne19@gmail.com",
      pass: "vdophrohzzelckkz",
    },
  });

  let info = await transporter.sendMail({
    from: `"Password"<annathorne19@gmail.com> `,
    to:options.email,
    subject: "Password",
    html: `<h1>Your Reset Password Is ${options.token}</h1>`,
  });
};
