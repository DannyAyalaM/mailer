import express from 'express'
import sgMail from '@sendgrid/mail'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.static('app'))
const port = process.env.PORT
sgMail.setApiKey(process.env.SGKEY)

app.get('/', (req, res) => {
    res.sendFile(`${path.resolve()}/index.html`)
})

app.post('/send', async (req, res) => {
    const { to, subject, html } = req.body
    const msg = {
        to,
        from: process.env.FROM,
        subject,
        html,
    }

    try {
        await sgMail.send(msg)
        
        res.sendStatus(204)
    } catch (error) {
        const messages = error.response.body.errors.map(e => e.message).join(' ')
        res.status(400).send(messages)
    }
})

app.listen(port, () => {
    console.log('Server on PORT => ', port)
})