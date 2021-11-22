const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'elafifi2015@gmail.com',
        subject: 'Thanks for Joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with app`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'elafifi2015@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}













/*
sgMail.send({
    from: 'elafifi2015@gmail.com',
    to: 'wagedod436@latovic.com',
    subject: 'this is my first creation',
    text: 'I hope this one actually get to you'
}).then(() => {
    console.log('Email sent')
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString());
    console.log(output)

    //Extract error msg
    const {message, code, response} = error;

    //Extract response msg
    const {headers, body} = response;
  })
*/

