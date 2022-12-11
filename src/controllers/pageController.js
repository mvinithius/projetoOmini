const { Servico } = require('../models');

const PageController = {

    home: (req, res) => {
        res.render('pages/home')
    },

    servicos: async (req, res) => {
        const servicos =  await Servico.findAll();
            
        return res.render('pages/servicos', { servicos })
    },

    renderServicePage: (req, res) => {

        return res.render('pages/servicoGenerico')
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
