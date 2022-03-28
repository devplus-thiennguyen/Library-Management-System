const express=require('express');
const {Author} = require('../model/Author');
const router=express.Router();

//findAll
router.get('/findAll',
    (req,res)=>{
       Author.find().then(
           authorsList=> {
       if(authorsList){
           return res.send(authorsList);
       }
       else
       {
        return res.status(404).json({success:false})
       }
          } 
         )
    }
);
//findById
router.get('/findById/:id', (req,res)=>{
let author=Author.findById(req.params.id).then(
    (author)=>
{    res.status(200).json({status:true, author})}
).catch(
    (err)=>{res.status(400).json({status:false, err})}
);
}
);
//deleteById
router.delete('/deleteById/:id',(req,res)=>{
    Author.findByIdAndDelete().then(
        res.status(200).json({message:'author has been deleted'})
    ).catch(  (err)=>{res.status(400).json({err})} )
});
//count
router.get( '/count' ,(req,res)=> {
    let authorCount=Author.countDocuments().then(
        (count)=>{
            res.send({authorsCount:count})
        }
    ).catch((err)=> { res.status(400).json({message:'there is no product'})})
});
//save
router.post('/save',(req,res)=>{
    let author=new Author({
        name:req.body.name,
        age:req.body.age
    });
    author.save().then(
        ()=>{
         res.status(201).json({status:true,message:'created'});
        }
    ).catch(
        (err)=>{
         res.status(500).json({error:err,status:false})
        }
    )
    });
    //update
    router.put('/updateById/:id',(req,res)=>{
        Author.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            age:req.body.age
        },{new:true}).then(
            ()=>{
             res.status(201).json({status:true,message:'updated'});
            }
        ).catch(
            (err)=>{
             res.status(500).json({error:err,status:false})
            }
        )
        });
        //deleteAll
        router.delete('/deleteAll',(req,res)=>{
          Author.remove({}).then(
            ()=>{
             res.status(201).json({status:true,message:'dll documents removed'});
            }
        ).catch(
            (err)=>{
             res.status(500).json({error:err,status:false})
            }
        )
        });
module.exports=router;