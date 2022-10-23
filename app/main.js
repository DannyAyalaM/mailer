loadTemplateInital = () => {
    template = `
        <div class="container">
            <h1>Mailer</h1>
            <hr>
            <div class="img-container">
                <img class="img-1" src="images/mailer-img.jpg">
                <img class="img-2" id="img-2" src="images/avion-mail.png">
            </div>
            <form id="form">
                <div class="email"><input type="text" name="to" placeholder="juan@perez.com"/></div>
                <div class="asunto"><input type="text" name="subject" placeholder="Asunto"/></div>
                <div class="text"><textarea name="html"></textarea></div>
                <div class="send"><button id="send" type="submit">Send</button></div>
            </form>
            <div id="error"></div>
        </div>

    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}

const enviar = () => {
    const form = document.getElementById('form')
    const imgMove = document.getElementById('img-2')
    form.onsubmit = async (e) => {
        e.preventDefault()
        imgMove.style.animation = 'volar 10s'
        const error = document.getElementById('error')
        error.innerHTML = ''
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        const response = await fetch('/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const responseText = await response.text()
        if (response.status > 300) {
            
            error.innerHTML = responseText
            return 
        }
        form.reset()
        
        alert('Correo enviado con exito')
        
    }
}

window.onload = () => {
    loadTemplateInital()
    enviar()
}

