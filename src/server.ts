import express, { type Application, type Request, type Response } from "express";
import { json } from "node:stream/consumers";
const app:Application = express();
const port = 5000

app.get('/', (req:Request, res:Response) => {
  // res.send('Hello World I Am User!')
  res.status(200).json({
    message:"Express Level",
    "author":"Next level"
  })
})
app.use(express.json())
app.post('/',async(req:Request,res:Response)=>
{
  console.log(req.body);

}
)

app.listen(port, () => {
  console.log(`Example app listening On port ${port}`)
})
