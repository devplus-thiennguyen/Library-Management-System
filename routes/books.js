const express=require('express');
const {Book} = require('../models/Book');
const router=express.Router();

//findAll
router.get('/findAll',
    (req,res)=>{
       Book.find().populate('author').then(
           booksList=> {
       if(booksList){
           return res.send(booksList);
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
let book=Book.findById(req.params.id).then(
    (book)=>
{    res.status(200).json({status:true, book})}
).catch(
    (err)=>{res.status(400).json({status:false, err})}
);
}
);
//deleteById
router.delete('/deleteById/:id',(req,res)=>{
    Book.findByIdAndDelete().then(
        res.status(200).json({message:'book has been deleted'})
    ).catch(  (err)=>{res.status(400).json({err})} )
});
//count
router.get( '/count' ,(req,res)=> {
    let bookCount=Book.countDocuments().then(
        (count)=>{
            res.send({booksCount:count})
        }
    ).catch((err)=> { res.status(400).json({message:'there is no books'})})
});
//save
router.post('/save',(req,res)=>{
    let book=new Book({
        name:req.body.name,
        genre:req.body.genre,
        author:req.body.author
    });
    book.save().then(
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
        Book.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
        genre:req.body.genre,
        author:req.body.author
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
          Book.remove({}).then(
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