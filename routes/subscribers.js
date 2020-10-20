const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');


//getting all
router.get('/', async (req, res) => {
       try{
            const subscribers = await Subscriber.find()
            res.json(subscribers);
       }
       catch(err){
            res.status(500).json({message: err.message})
       }
})

//getting one
router.get('/:id', getSubcriber, (req, res) => {
    res.send(res.subscriber)
})

//creating one
router.post('/', async (req, res) => {
     const subscriber = new Subscriber({
          name = req.body.name,
          subscribedToChannel : req.body.subscribedToChannel
     })

     try{
          const newSubscriber = await subscriber.save();
          res.status(201).json(newSubscriber)
     }
     catch(err)
     {
          res.status(400).json({message : err.message})
     }

    
})

//updating one
router.patch('/:id', getSubcriber, async (req, res) => {
     if(req.body.name != null)
     {
          res.subscriber.name = req.body.name;
     }

     if(req.body.subscribedToChannel != null)
     {
          res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
     }
    
     try{
          const updatedSubscriber = await subscriber.save();
          res.status(201).json(updatedSubscriber)
     }
     catch{
          res.status(400).json({message : err.message})
     }
})

//deleting one
router.delete('/:id', getSubcriber, (req, res) => {
    try{
          await res.subscriber.remove();

          res.json({message: 'Subscriber removed!'})
    }
    catch{
     res.status(400).json({message : err.message})
    }
})

async function getSubcriber(req, res, next)
{
     let subscriber
     try{
          subscriber = await Subscriber.findById(req.params.id);
          if(subscriber == null)
          {
               return res.status(404).json({message: 'Cannot find subscriber'});
          }
          else{

          }
     }
     catch(err)
     {
          return res.status(500).json({message : err.message})
     }

     res.subscriber = subscriber
     next()
}

module.exports = router