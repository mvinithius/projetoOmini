const Sequelize = require('sequelize')
const config = require('../config/database')

const { Usuario, CreditCard } = require('../models');

const CreditCardController = {

    renderCreditCardForm: (req, res) => {
        const userId = req.session.user;

        return res.render('pages/users/creditCardForm', { userId });        
    },

    addCreditCard: (req, res) => {
        const userId = req.session.user;

        const { nome_cartao, bandeira, numero, data_expiracao } = req.body;
        
        const newCreditCard = { nome_cartao, bandeira, numero, data_expiracao, fk_usuario: userId};

        CreditCard.create(newCreditCard)
            .then(() => res.redirect(`/users/perfil/${userId}/cartoes`))
            .catch((error) => console.log('Erro ao salvar novo cartão'))
    },

    renderCreditCardList: async (req, res) => {
        const userId = req.session.user;

        const cartao = await Usuario.findOne({
            where: {
                id: userId
            },
            include: 'cartoes'
        })

        return res.render('pages/users/CreditCardList', {cartoes: cartao.cartoes, userId})

    },

    deleteCreditCard: (req, res) => {
        const userId = req.session.user;

        const cartaoId = req.params.id;

        const deletar = CreditCard.destroy({
            where: {
                id_cartao: cartaoId
            }
        })

        .then(() => res.redirect(`/users/perfil/${userId}/cartoes`))
        .catch((error) => console.log(error))
    }

}

module.exports = CreditCardController;