
//CRUD

const router = require('express').Router()

const Person = require('../models/Person')

//Criação de dados
router.post('/', async (req, res) => {

    //req.body
    
   
    const {name, medicamentos, qtd_medicamentos, telefone, data_validade_med } = req.body
    
    if (!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }
    
    const person = {
    name,
    medicamentos, 
    qtd_medicamentos,
    telefone, 
    data_validade_med
    }
    
    
    try {
     //CREATE - criando dados
        await  Person.create(person)
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
    
    }catch (error){
        res.status(500).json({error: error})
    }
    
    })


    //READ - Leitura de dados
  router.get('/', async (req, res) => {

    try{
     const people = await Person.find()
     res.status(200).json(people)

    }catch (error){
        res.status(500).json({error: error})
    }

  })
  router.get('/:id', async (req, res) => {

    //extrair o dado da requisição, pela url = req.params
  const id = req.params.id

  try{

    const person = await Person.findOne({ _id: id})
    if(!person){
        res.status(422).json({message: 'O usuário não foi encontrado!'})
        return
    }
    res.status(200).json(person)
  }catch (error) {
    res.status(500).json({error: error})
  }

  })

  //UPDATE - Atualização de dados (PUT, PATCH)
  router.patch('/:id', async(req, res) => {

    const id = req.params.id
    const { name, medicamentos, qtd_medicamentos, telefone, data_validade_med } = req.body

    const person = {
        name, 
        medicamentos,
        qtd_medicamentos,
        telefone, 
        data_validade_med
    }

    try{
    const updatedPerson = await Person.updateOne({ _id: id }, person)
    
    if(updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'O usuário não foi encontrado!' })
        return
    }
    res.status(200).json(person)

    }catch(error){
    res.status(500).json({error: error})
    }
  })

  //DELETE - Deletar dados
  router.delete('/:id', async (req, res) =>{

    const id = req.params.id

    const person = await Person.findOne({ _id: id})

    if (!person) {
        res.status(422).json({ message: 'O usuário não foi encontrado!'})
        return
    }

    try{
     await Person.deleteOne({ _id: id})

     res.status(200).json({ message : 'Usuário removido com sucesso!'})
     

    }catch(error){
        res.status(500).json({ error: error })
    }
  })
    module.exports = router