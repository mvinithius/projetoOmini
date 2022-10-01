const { Servico } = require('../models')

const ServiceController = {
    
    renderServiceList: async (req, res) => {
        const services =  await Servico.findAll();
        
        return res.render('pages/admin/serviceList', { services })
    },

    renderServiceForm: (req, res) => {
        return res.render('pages/admin/newService')
    },
    
    addService: async (req, res) => {
        const { titulo, descricao, valor } = req.body;

        const service = { titulo, descricao, valor };
        
        await Servico.create(service);

        return res.redirect('ServiceList');    
    },

    // renderiza os dados do serviço (perfil de serviço)
    showService: async (req, res) => {
        const { id } = req.params;

        const service = await Servico.findByPk(id);

        return res.render('pages/admin/showService', { service })
    },

    // renderiza o formulário de edição com dados do serviço
    renderServiceEditForm: async (req, res) => {
        const { id } = await req.params;
        
        const service = await Servico.findByPk(id);

        return res.render('pages/admin/editService', { service })
    },

    // edita os dados do serviço
    editService: async (req, res) => {
        const { id } = await req.params;
        
        const service = await Servico.findByPk(id);
        
        const {titulo, descricao, valor} = await req.body;

        const resultado = await Servico.update({
            titulo,
            descricao,
            valor
        },
        {
            where: {
                id: service.id
            }
        })

        return res.redirect('/admin/');
    },

    deleteService: async (req, res) => {
        const { id } = await req.params; 
        
        const service = await Servico.findByPk(id)

        const deletar = await Servico.destroy({
            where: {
                id: service.id
            }
        });

        return res.redirect('/admin/');
    }
}

module.exports = ServiceController