const { Usuario } = require('../models')

const AdminController = {

    showUserPerfil: async (req, res) => {
        // armazena o id do usuário
        const userId = req.params;

        // busca pelos dados do usuário no banco de dados com o ID que armazenamos acima
        const {id, nome, email} = await Usuario.findByPk(userId);

        // armazena os dados do usuario que foram buscados no banco
        const user = {id, nome, email}; 

        // renderiza a pagina de perfil passando os dados do usuario buscado no banco
        res.render('pages/users/perfil', { user });
    },

    //renderiza a pagina de lista de usuarios
    showUserList: async (req, res) => {
        let users = await Usuario.findAll()

        //renderiza a página com lista de usuários
        res.render('pages/admin/userList', { users });
    },

    renderDashboard: (req, res) => {
       
        res.render('pages/admin/dashboard')
    }

}

module.exports = AdminController