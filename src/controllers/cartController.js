const { Servico } = require('../models')

const CartController = {

    showCart: async (req, res) => {
        const carrinho = await req.session.carrinho;
        let valorTotal = 0;
        let valorTotalArredondado = ''
        
        if(carrinho && carrinho.length > 0){
            carrinho.map(servico => {
                valorTotal += parseFloat(servico.valor);
                valorTotalArredondado = valorTotal.toFixed(2);
                
                console.log('novo valor: ', valorTotal);
                console.log('novo valor arredondado: ', valorTotalArredondado);
            })
        }

        res.render('pages/carrinho', { carrinho, valorTotalArredondado });
    },

    addToCart: async (req, res) => {
        const servicoId = req.params.id;

        const { id_servico, titulo, valor, descricao, imagem } = await Servico.findByPk(servicoId);

        const servicoPesquisado = { id_servico, titulo, descricao, valor, imagem, quantidade: 1 };

        if (req.session.carrinho != undefined) {
            req.session.carrinho.push(servicoPesquisado)
        } else {
            req.session.carrinho = [servicoPesquisado]
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
        let serviceId = req.params.id;
        console.log('serviceID: ', serviceId)

        let serviceIndex = req.session.carrinho.findIndex(service => service.id_servico === serviceId);
        let service = req.session.carrinho[serviceIndex];

        console.log('SERVIÇO RECUPERADO COM INDEX: ', service);

        // completar
        req.session.carrinho[serviceIndex] = { ...service, quantidade: service.quantidade + 1 }

        res.redirect('/carrinho')
    },

    substractQuantity: (req, res) => {

    },

    deleteCart: (req, res) => {

    }
}

module.exports = CartController