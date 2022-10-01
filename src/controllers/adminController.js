const { Usuario } = require('../models')
const { Servico } = require('../models')

const AdminController = {

    showUserPerfil: async (req, res) => {
        // armazena o id do usuário
        // const userId = req.body;

        // busca pelos dados do usuário no banco de dados com o ID que armazenamos acima
        const {nome, email, senha, cep, endereco, complemento} = await Usuario.findByPk(userId);

        // armazena os dados do usuario que foram buscados no banco
        const user = {nome, email, senha, cep, endereco, complemento}; 

        // renderiza a pagina de perfil passando os dados do usuario buscado no banco
        res.render('pages/users/perfil', { user });
    },

    //renderiza a pagina de lista de usuarios
    showUserList: async (req, res) => {
        let users = await Usuario.findAll()

        //renderiza a página com lista de usuários
        res.render('pages/users/list', { users });
    },

    renderDashboard: (req, res) => {
       
        res.render('pages/admin/dashboard')
    }

}

module.exports = AdminController