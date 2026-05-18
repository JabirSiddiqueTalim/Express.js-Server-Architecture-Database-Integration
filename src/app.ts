import express, { type Application, type Request, type Response } from "express";
import { json } from "node:stream/consumers";
import { Pool } from "pg";
import config from "./config";
import { pool } from "./db";
import { userRouter } from "./modules/users/user.route";
const app: Application = express();





app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World I Am User!')
  res.status(200).json({
    message: "Express Level",
    "author": "Next level"
  })
})

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users",userRouter);
app.get('/api/users',userRouter );

//PUT
app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age } = req.body;
  // const result = await pool.query(`
  //   SELECT * FROM users WHERE id=$1;
  // `, [req.params.id]);
  const result = await pool.query(`
    UPDATE users 
    SET
     name=COALESCE($1,name),
     password=COALESCE($2,password),
     age=COALESCE($3 ,age) 
    WHERE id=$4
    RETURNING *;
  `, [name, password, age, req.params.id])
  console.log(result);
  try {
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "User not found",
        success: false,
        data: {}
      })
    }
    res.status(200).json({
      message: "User Update successfully",
      success: true,
      data: result.rows[0]
    })


  } catch (error: any) {
    res.status(500).json(
      {
        message: error.message,
        error: error
      }
    )

  }
})
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query(`
    DELETE FROM users WHERE id=$1
    `,[id])
    console.log(result);
    try {
      if (result.rowCount === 0) {
        res.status(404).json({
          message: "User not found to delete",
          success: false,
        })
      }
      res.status(200).json({
        message: "User Delete successfully",
        success: true,
        data:{},
      })
  
  
    } catch (error: any) {
      res.status(500).json(
        {
          message: error.message,
          error: error
        }
      )
    }
})

export default app;