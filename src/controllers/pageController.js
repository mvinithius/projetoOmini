const { Servico } = require('../models');

const PageController = {

    home: async (req, res) => {
        let servicos =  await Servico.findAll();

        res.render('pages/home', {servicos})
    },

    servicos: async (req, res) => {
        let servicos =  await Servico.findAll();
            
        return res.render('pages/servicos', { servicos })
    },

    renderServicePage: async (req, res) => {
        let { id } = req.params;

        let servico = await Servico.findByPk(id);

        return res.render('pages/servicoGenerico', { servico })
    },

    // diarista: (req, res) => {
    //     res.render('pages/servigoGenerico')
    // },

    // encanador: (req, res) => {
    //     res.render('pages/encanador')
    // },

    // dedetizador: (req, res) => {
    //     res.render('pages/dedetizador')
    // },

    // eletricista: (req, res) => {
    //     res.render('pages/eletricista')
    // },

    // pedreiro: (req, res) => {
    //     res.render('pages/pedreiro')
    // },

    // jardineiro: (req, res) => {
    //     res.render('pages/jardineiro')
    // },

    // chaveiro: (req, res) => {
    //     res.render('pages/chaveiro')
    // },

    // montador: (req, res) => {
    //     res.render('pages/montador')
    // }
}

module.exports = PageController
