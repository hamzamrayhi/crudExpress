const express=require('express');
const bodyparser=require('body-parser');
const cors=require ('cors');
const mysql=require('mysql2')
const path = require ('path');
const Sequelize = require("sequelize");
const http=require('http');


const app=express();
 app.use(cors());
 app.use(bodyparser.json());






//const db=mysql.createConnection({
    const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'databasenode',
    port:3306
});

// const publicDirectory=path.join(__dirname,'./public');
// app.use(express.static(publicDirectory));
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());

// app.set('view engine','hbs');


db.connect(err=>{
    if (err) {console.log(err,'err');}
    console.log('database connected');
})




app.get('/stock',(req,res)=>{
   let qr='select * from stock';
   db.query(qr,(err,result)=>{
    if (err)
    {
        console.log(err,'errs');
    }
    if (result.length>0)
    {
        res.send({
            message:'all stock data',
            data:result
        });
    }
   });
});

app.get('/stock/:idStock',(req,res)=>{
    let gID=req.params.idStock;
    let qr=`select * from stock where idStock = ${gID}`;
    db.query(qr,(err,result)=>{
        if (err)
        {
            console.log(err,'errs');
        }
        if (result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else
        {
            res.send({
                message:'data not found'
            });
        }
       });
    });

    app.post('/stock',(req,res)=>{
        console.log(req.body,'createData');
        let quantite = req.body.quantite;
        let nom = req.body.nom;

        let qr=`insert into stock(quantite,nom) values('${quantite})','${nom}')`;
        db.query(qr,(err,result)=>{
            if (err){console.log(err);}
            console.log(result,'result')
            res.send({
                message:'data inserted'
            });
           


    });
});


app.put('/stock/:idStock',(req,res)=>{
    console.log(req.body,'updateData');
    let gID = req.params.idStock;
    let quantite = req.body.quantite;
    let nom = req.body.nom;
    let qr =`update stock set quantite='${quantite}',nom='${nom}' where idStock=${gID}`;
    db.query(qr,(err,result)=>{
        if (err){console.log(err);}
        
        res.send({
            message:'data updated'
        });

});
})

app.delete('/stock/:idStock',(req,res)=>{
    let qId=req.params.idStock;
    let qr=`delete from stock where idStock=${qId} `;
    db.query(qr,(err,result)=>{
        if (err) {console.log(err);}
        res.send(
            {
                message:'data deleted'
            }
        )
    });
});






app.listen(3000,()=>{
    console.log('server running');
})