import nodemailer from "nodemailer"

var transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "smtp@mailtrap.io",
    pass: "e54fb9202f380d154977278050f60f0a"
  }
});

const sendEmail = async ()=>{
    const info = await transport.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
}