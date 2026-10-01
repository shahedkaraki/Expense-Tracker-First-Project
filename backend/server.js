
const express = require("express");

const cors = require("cors");

const {Pool} =require("pg");

require("dotenv").config();



const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const pool = new Pool ({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

}) 

//GET all expenses
app.get("/api/expenses" , async(req,res)=>{
    try {
        const result = await pool.query(
            "SELECT id,title,amount::float8,category,TO_CHAR(date,'YYYY-MM-DD') AS date FROM expenses"
        );
        //becuase pg return date and amount as text so here make it return as the right formula
        
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        
    }
});


//GET expens by id

app.get("/api/expenses/:id" , async(req,res) =>{


    try {
        const id =Number(req.params.id);

        if(! Number.isInteger(id) || id<=0){
            return res.status(404).json({
                error:"NOT FOUND "
            });
        }

        const result = await pool.query("SELECT id,title,amount::float8,category,TO_CHAR(date,'YYYY-MM-DD') AS date FROM expenses WHERE id=$1",[id]);

        //if the id is valid but does not exist:
        if(result.rows.length === 0){
            return res.status(404).json({
                error : "NOT FOUND"
            })
        }

        res.json(result.rows[0]);
    }
     catch (error) {
        console.error(error);
    }
});

//POST 

app.post("/api/expenses",async(req,res)=>{

    try {
        const {title,amount,category,date} = req.body;

        //for validations:

        if(typeof title !=="string" || title.trim() ===""){
            return res.status(400).json({
                message:"title is required!"
            });
        }
        
        if(typeof amount !== "number" || amount <=0){
            return res.status(400).json({
                message:"amount must be positive number!"
            });
        }

        const categoryArray =["Food","Transport","Bills","Entertainment","Other"];

        if(!categoryArray.includes(category)){
            return res.status(400).json({
                message:"category is required!"
            });
        }

        if(!date){
            return res.status(400).json({
                message:"date is required!"
            });
        }


        const result =await pool.query(
            `INSERT INTO expenses (title,amount,category,date)
             VALUES ($1,$2,$3,$4) RETURNING id, title, amount::float8, 
             category,TO_CHAR(date,'YYYY-MM-DD') AS date`
             ,[title,amount,category,date]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(400).json({
            error:"invalid data"
        });
    }
});

//PUT 

app.put("/api/expenses/:id", async(req,res)=>{

    try {

        const id = Number(req.params.id);

        //for validations:

        if(!Number.isInteger(id) || id<=0){
            return res.status(404).json({

                error:"NOT FOUND"
            });
        }

        const{title,amount,category,date} = req.body;

        if(typeof title !=="string" || title.trim()===""){
           return res.status(400).json({
                error:"title is required!"
            });

        }

        if(typeof amount !== "number" || amount <=0 ){
           return res.status(400).json({
                error:"amount must be positive!"
            });
        }

       const categoryArray=["Food","Bills","Entertainment","Transport","Other"];
        

       if(! categoryArray.includes(category)){
       return res.status(400).json({
            error:"category is required!"
        });
       }

       if(!date){
        return res.status(400).json({
            error:"date is required!"
        });
       }

       const result = await pool.query(`
        UPDATE expenses SET title=$1,amount=$2,category=$3,date=$4
        WHERE id=$5
        RETURNING id , title, amount::float8,category,TO_CHAR(date,'YYYY-MM-DD') AS date `
    ,[title,amount,category,date,id]);


    
    if(result.rows.length === 0){
       return res.status(404).json({
            error:"NOT FOUND"
        });
    }

    res.status(200).json(result.rows[0]);

    } catch (error) {
        
        console.error(error);
        res.status(400).json({
            error:"Invalid data"
        });
    }
});

//DELETE

app.delete("/api/expenses/:id", async(req,res)=>{
    
    try {
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id<=0){
           return res.status(404).json({
                error:"NOT Found"
            });
        }


        const result = await pool.query(`
            DELETE FROM expenses WHERE id=$1`,[id]);
   
        //check if row exist
        if(result.rowCount === 0){
           return res.status(404).json({
                error:"NOT FOUND"
            });
        }

        res.status(200).json({
            message:"expense deleted successfully"
        });


    } catch (error) {
        console.error(error);
    }


});



app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});











