import express, { type Application, type Request, type Response } from "express";
import { json } from "node:stream/consumers";
import { Pool } from "pg";
const app: Application = express();
const port = 5000

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_VYZEFvq7Np8A@ep-withered-smoke-aqgywwx4.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require"
})

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

app.post('/', async (req: Request, res: Response) => {
  // console.log(req.body);
  const body = req.body;

  res.status(202).json(
    {
      message: "Data post finlay",
      data: body,
    }
  )
}
)

app.listen(port, () => {
  console.log(`Example app listening On port ${port}`)
})
