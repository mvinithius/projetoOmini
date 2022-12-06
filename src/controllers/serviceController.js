const { Servico } = require('../models')

const fs = require('fs');

const { uploadPath } = require('../config/upload');

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

        const imagem = req.file.filename;

        const service = { titulo, descricao, valor, imagem};
        
        await Servico.create(service);

        return res.redirect('ServiceList');    
    },

    // renderiza os dados do serviço (pag do serviço)
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
        const imagem = req.file.filename;

        if (imagem != undefined){
            if(service.imagem != ''){
                fs.unlink(`${uploadPath}/${service.imagem}`, (error) =>{
                    if(error){
                        console.log("Erro ao excluir imagem");
                    } else {
                        console.log("Imagem excluída");
                    }
                });
            }
        } 

        const resultado = await Servico.update({
            titulo,
            descricao,
            valor,
            imagem
        },
        {
            where: {
                id_servico: id
            }
        })

        return res.redirect('/admin/');
    },

    deleteService: async (req, res) => {
        const { id } = req.params; 
        
        const service = await Servico.findByPk(id)

        fs.unlink(`${uploadPath}/${service.imagem}`, (error) =>{
            if(error){
                console.log("Erro ao excluir imagem");
            } else {
                console.log("Imagem excluída");
            }
        });

        const deletar = await Servico.destroy({
            where: {
                id_servico: id
            }
        });

        return res.redirect('/admin/');
    }
}

module.exports = ServiceController