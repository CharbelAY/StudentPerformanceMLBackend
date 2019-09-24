const express = require('express')

const router = express.Router()

const Answers = require('../schemas/answers')

module.exports=router

//getting all

router.get('/', async (req,res) =>{
    try{
        const answers = await Answers.find()
        res.json(answers)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//getting one

router.get('/:id',(req,res) =>{
    res.send(req.params.id)
})

//creating one

router.post('/',async (req,res) =>{
    const answers = new Answers({
        question:req.body.question,
        answers:req.body.answers
    })

    try{
        const newAnswer = await answers.save()
        res.status(201).json(newAnswer)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

//updating one

router.patch('/',(req,res) =>{
    
})

//deleting one

router.delete('/:id',(req,res) =>{
    
})