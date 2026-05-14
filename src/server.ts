import express, { type Application, type Request, type Response } from "express";
const app:Application = express();
const port = 5000

app.get('/user', (req:Request, res:Response) => {
  // res.send('Hello World I Am User!')
  res.status(200).json({
    message:"Express Level",
    "author":"Next level"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
