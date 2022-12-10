const { Servico } = require('../models')
const { Endereco } = require('../models')
const { Usuario } = require('../models');
const AddressController = require('../controllers/addressController')

const CheckoutController = {

    renderCheckout: async(req, res) => {
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
        let valorTotal =  0;        
        
        if(carrinho && carrinho.length > 0){
            carrinho.map(servico => {
                valorTotal = valorTotal + parseFloat(servico.valor)
                valorTotalArredondado = valorTotal.toFixed(2);
                
                console.log('novo valor: ', valorTotal);
                console.log('novo valor arredondado: ', valorTotalArredondado);
            })
        }

        res.render('pages/checkout', {carrinho, valorTotalArredondado, enderecos: enderecos.enderecos, userId})
    },

    renderPaymentPage: async(req, res) => {
        let carrinho = req.session.carrinho;
        let userId = req.session.user;
        
        res.render('pages/pagamento', {carrinho, userId});
    }

}

module.exports = CheckoutController