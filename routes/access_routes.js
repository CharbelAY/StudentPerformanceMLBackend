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

router.get('/:id', getAnswers,(req,res) =>{
    res.send(res.answers)
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

router.patch('/:id',getAnswers,async (req,res) =>{
    if(req.body.question != null){
        res.answers.question = req.body.question
    }

    if(req.body.answers != null){
        res.answers.answers = req.body.answers
    }

    try{
        const updatedAnswers = await res.answers.save()
        res.json(updatedAnswers)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

//deleting one

router.delete('/:id',getAnswers,async (req,res) =>{
    try{
        await res.answers.remove()
        res.json({"message":"Subscriber deleted"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

async function getAnswers(req,res,next){
    let answers
    try{
        answers = await Answers.findById(req.params.id)
        if(answers == null){
            return res.status(404).json("Cannot find answers")
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.answers = answers
    next()
}