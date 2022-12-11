const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    medicamentos: String,
    qtd_medicamentos: Number,
    telefone: Number,
    data_validade_med: String

})

module.exports = Person