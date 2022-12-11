const { Servico, Endereco, Usuario, Pedido } = require('../models')

const CheckoutController = {

    renderCheckout: async (req, res) => {
        let carrinho = req.session.carrinho;
        let userId = req.session.user;

        // endereços
        let enderecos = await Usuario.findOne({
            where: {
                id: userId
            },
            include: 'enderecos'
        })

        // valor total
        let valorTotal = 0;

        if (carrinho && carrinho.length > 0) {
            carrinho.map(servico => {
                valorTotal = valorTotal + parseFloat(servico.valor)
                valorTotalArredondado = valorTotal.toFixed(2);

                console.log('novo valor: ', valorTotal);
                console.log('novo valor arredondado: ', valorTotalArredondado);
            })
        }

        res.render('pages/checkout', { carrinho, valorTotalArredondado, enderecos: enderecos.enderecos, userId })
    },

    renderPaymentPage: async (req, res) => {
        let carrinho = req.session.carrinho;
        let userId = req.session.user;

        res.render('pages/pagamento', { carrinho, userId });
    },

    orderPlace: async (req, res) => {
        let carrinho = req.session.carrinho;
        let userId = req.session.user;

        let valorPedido = valorTotalArredondado;

        // console.log('valorPedido: ', valorPedido)
        // console.log('servicosComprados: ', carrinho)

        await Pedido.create({valor: valorPedido, status: 'EM ANÁLISE', fk_usuario: userId})

        res.redirect(`/users/${userId}/pedidos`)
    },

    renderOrders: async (req, res) => {
        let userId = req.session.user;

        let pedidos = await Pedido.findAll({
            where: {
                fk_usuario: userId
            }
        });

        res.render('pages/users/pedidos', { pedidos, userId })
    },

    renderOrderDetail: async (req, res) => {
        let userId = req.session.user;
        
        let { id } = req.params;

        let pedido = await Pedido.findOne({
          where: {
            id_pedido: id
          },
          include: {
            model: Servico,
            as: 'servicosComprados',
            required: true
          }
        })

        console.log('INFORMAÇÕES DETALHADAS DO PEDIDO: ', pedido )

        return res.render('pages/users/pedidoDetalhado', { pedido, id, userId })
    }

}

module.exports = CheckoutController