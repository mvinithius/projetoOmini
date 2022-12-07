window.addEventListener('load', function () {

    let registerForm = document.querySelector('form.form-cadastro');
    let fieldName = document.getElementById('nome');
    let fieldEmail = document.getElementById('email');
    let fieldSenha = document.getElementById('senha');
    let fieldSenhaConfirm = document.getElementById('senhaConfirm');
    // let fieldAvatar = document.getElementById('avatar');

    console.log(registerForm);

    registerForm.addEventListener('submit', function (event) {

        let nameValue = fieldName.value;
        let emailValue = fieldEmail.value;
        let senhaValue = fieldSenha.value;
        let senhaConfirmValue = fieldSenhaConfirm.value;
        // let avatarValue = fieldAvatar.value;

        let errorsMessage = [];

        if (nameValue === '') {
            errorsMessage.push('O nome não pode estar vazio');
        } else if (nameValue.length < 4) {
            errorsMessage.push('O nome não pode ter menos de 4 letras');
        }

        if (emailValue === '') {
            errorsMessage.push('O e-mail não pode estar vazio');
        } else if(!checkEmail(emailValue)){
            errorsMessage.push('Por favor, informe um e-mail válido');
        }

        if (senhaValue === '') {
            errorsMessage.push('A senha não pode estar vazia');
        }

        if (senhaConfirmValue === '') {
            errorsMessage.push('A confirmação da senha não pode estar vazia');
        } else if (senhaValue !== senhaConfirmValue) {
            errorsMessage.push('As senhas não coincidem');
        }

        // if(avatarValue === ''){
        //     errorsMessage.push('É necessário enviar uma foto');
        // }

        if (errorsMessage > 0) {
            event.preventDefault();

            let divErrors = document.getElementById('divErrors');
            divErrors.classList.remove('noErrors');
            divErrors.classList.add('errors');

            let ulErrors = document.querySelector('div.errors ul');
            for (let i = 0; i < errorsMessage.length; i++) {
                ulErrors.innerHTML += '<li>' + errorsMessage[i] + '</li>';
            }

        }

    })

    function checkEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        )
    }

})