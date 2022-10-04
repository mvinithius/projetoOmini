const Sequelize = require('sequelize')
const config = require('../config/database')

const { Usuario, Endereco } = require('../models');

const AddressController = {

    renderAddresses: async (req, res) => {
        // const userId = req.session.user;
        const {id} = req.params;

        const enderecos = await Usuario.findOne({
            where: {
                 id: id
            },
            include: {
                model: Endereco,
                as: 'enderecos',
                required: true
            }
        })

        return res.render('pages/users/userAddress', {enderecos} )
    },

    renderEditForm: (req, res) => {

    },

    editAddress: (req, res) => {

    }

}

module.exports = AddressController;