import express, { type Application, type Request, type Response } from "express";
import { json } from "node:stream/consumers";
import { Pool } from "pg";
const app: Application = express();
const port = 5000

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_VYZEFvq7Np8A@ep-withered-smoke-aqgywwx4-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(30) NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      
      `)
    console.log("Database connected!!!!")

  } catch (error) {
    console.log(error);

  }
}
initDB();

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
  const { name, age, email, password } = req.body;
  const result = await pool.query(`
    INSERT INTO users(name ,email,password,age) VALUES($1,$2,$3,$4)
    RETURNING *
    `,
    [name, age, email, password],
  );
  console.log(result)
  res.status(202).json(
    {
      message: "Data post finlay",
      data: result.rows[0]

    }
  )
}
)

app.listen(port, () => {
  console.log(`Example app listening On port ${port}`)
})
