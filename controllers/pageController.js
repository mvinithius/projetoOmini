
const pageController = {

    home: (req, res) => {
        res.render('pages/home')
    },

    servicos: (req, res) => {
        res.render('pages/servicos')
    },

    diarista: (req, res) => {
        res.render('pages/diarista')
    },

    encanador: (req, res) => {
        res.render('pages/encanador')
    },

    dedetizador: (req, res) => {
        res.render('pages/dedetizador')
    },

    eletricista: (req, res) => {
        res.render('pages/eletricista')
    },

    pedreiro: (req, res) => {
        res.render('pages/pedreiro')
    },

    jardineiro: (req, res) => {
        res.render('pages/jardineiro')
    },

    chaveiro: (req, res) => {
        res.render('pages/chaveiro')
    },

    montador: (req, res) => {
        res.render('pages/montador')
    }

}



module.exports = pageController
