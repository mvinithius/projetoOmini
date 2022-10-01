const { Usuario } = require('../models')

const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserController = {
    //renderiza o formulário de cadastro
    renderFormCadastro: (req, res) => {
        res.render('pages/users/cadastro', {error: null});
    },

    //executa a criação do usuário
    UserCreate: async (req, res) => {
        console.log(req.body);
        
        const {nome, email, senha, cep, endereco, complemento} = req.body;
        // const foto = req.file.filename;
        
        const hash = bcrypt.hashSync(senha, saltRounds);

        // checar se o usuário existe
        const checkIfUserExists = await Usuario.findOne({ where: { email: email } })
        
        // se usuário já existir, recarrega pagina de cadastro
        if (checkIfUserExists) {
            return res.render('pages/users/cadastro', {error: 'E-mail já cadastrado'})
        }
       
        // armazena os dados do usuario
        const user = {
            nome,
            email,
            senha: hash,
            cep,
            endereco,
            complemento
        }

        await Usuario.create(user)
            .then((user) => {
                req.session.user = user.id
                req.session.save(() => {
                    res.redirect('/') 
                })

            })
            .catch((erro) => {
                console.log('Erro ao criar sessão')
            })
    },
}

module.exports = UserController