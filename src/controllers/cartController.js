const { Servico } = require('../models')

const CartController = {
    
    showCart: async (req, res) => {
        const carrinho = await req.session.carrinho;

        res.render('pages/carrinho', { carrinho });
    },

    addToCart: async (req, res) => {
        const servicoId = req.params.id;

        const {id_servico, titulo, valor, descricao, imagem } = await Servico.findByPk(servicoId);

        const servicoPesquisado = { id_servico, titulo, descricao, valor, imagem, quantidade: 1 };

        if(req.session.carrinho != undefined){
            req.session.carrinho.push(servicoPesquisado)
        } else {
            req.session.carrinho  = [servicoPesquisado]
        }

        res.redirect('/carrinho')
    },

    removeFromCart: (req, res) => {
        const serviceId = req.params.id;

        const serviceIndex = req.session.carrinho.findIndex(service => service.id_servico === serviceId);
        req.session.carrinho.splice(serviceIndex, 1);

        res.redirect('/carrinho');
    },

    addQuantity: (req, res) => {
        const serviceId = req.params.id;

        const serviceIndex = req.session.carrinho.findIndex(service => service.id_servico === serviceId);
        req.session.carrinho.splice(serviceIndex, )

    },

    substractQuantity: (req, res) => {

    },

    deleteCart: (req, res) => {

    }
}

module.exports = CartController