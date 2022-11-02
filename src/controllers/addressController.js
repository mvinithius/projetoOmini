const Sequelize = require('sequelize')
const config = require('../config/database')

const { Usuario, Endereco } = require('../models');

const AddressController = {

    renderAddressForm: (req, res) => {
        const userId = req.session.user;

        res.render('pages/users/addressForm', {userId})
    },

    addAddress: (req, res) => {
        const userId = req.session.user;

        const {
            nome_endereco, 
            cep, 
            logradouro, 
            numero_casa,
            complemento,
            referencia, 
            bairro, 
            cidade, 
            estado
         } = req.body;

         const newAddress = { 
            nome_endereco, 
            cep, 
            logradouro, 
            numero_casa,
            complemento,
            referencia, 
            bairro, 
            cidade, 
            estado,
            fk_usuario: userId
         };

         Endereco.create(newAddress)
            .then(() => res.redirect(`/users/perfil/${userId}/enderecos`))
            .catch((error) => console.log('Erro ao salvar novo endereço'))
    },

    renderAddresses: async (req, res) => {
        const userId = req.session.user;

        const usuario = await Usuario.findOne({
            where: {
                id: userId
            },
            include: 'enderecos'         
        })

        return res.render('pages/users/userAddress', {enderecos: usuario.enderecos, userId} )
    },

    renderEditAddress: (req, res) => {
        const userId = req.session.user;

        const enderecoId = req.params.id;

        const endereco = Endereco.findOne({
            where: {
                id_endereco: enderecoId
            }
        })

        .then(() => {res.redirect('pages/users/editAddress', {endereco, userId})})
        .catch((error) => console.log(error))
    },

    editAddress: (req, res) => {
        const userId = req.session.user;

        const enderecoId = req.params.id;

        const {
            nome_endereco, 
            cep, 
            logradouro, 
            numero_casa,
            complemento,
            referencia, 
            bairro, 
            cidade, 
            estado
        } = req.body;

        const updatedAddress = {
            nome_endereco, 
            cep, 
            logradouro, 
            numero_casa,
            complemento,
            referencia, 
            bairro, 
            cidade, 
            estado
        }

        Endereco.update(updatedAddress, {
            where: {
                id_endereco: enderecoId
            }
        })
        .then(() => res.redirect(`/users/perfil/${userId}/enderecos`))
        .catch((error) => console.log('Erro ao atualizar endereço'))

    },

    deleteAddress: (req, res) => {
        const userId = req.session.user;

        const enderecoId = req.params.id;

        console.log('PARAMS ID: ', enderecoId);

        const deletar = Endereco.destroy({
            where: {
                id_endereco: enderecoId
            }
        })

        .then(() => res.redirect(`/users/perfil/${userId}/enderecos`))
        .catch((error) => console.log(error))
    }

}

module.exports = AddressController;