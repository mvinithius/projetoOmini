




const userController = {
    cadastro: (req, res) => {
        res.render('pages/users/cadastro')
    },

    login: (req, res) => {
        res.render('pages/users/login')
    },

    indexUsers: (req, res) => {
        res.render('pages/users/indexUsers')
    }

}

module.exports = userController