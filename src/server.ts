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
      email VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      
      `)
    // console.log("Database connected!!!!")

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

app.post('/api/users', async (req: Request, res: Response) => {
  // console.log(req.body);
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO users(name ,email,password,age) VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [name, email, password, age],
    );
    console.log(result)
    res.status(202).json(
      {
        message: "Data post successfully",
        data: result.rows[0]

      }
    )

  } catch (error: any) {
    res.status(500).json(
      {
        message: error.message,
        error: error

      }
    )

  }

}
)
app.get('/api/users', async (req: Request, res: Response) => {
  const result = await pool.query(`
    SELECT * FROM users;
  `)
  try {
    res.status(202).json(
      {
        message: "Data post successfully",
        data: result.rows

      }
    )



  } catch (error: any) {
    res.status(500).json(
      {
        message: error.message,
        error: error

      }
    )

  }
})
app.get('/api/users/:id', async (req: Request, res: Response) => {
  const id = req.params;
  console.log(id);
  //    SELECT * FROM Customers
  // WHERE Country = 'Mexico';
  const result = await pool.query(`
  SELECT * FROM users WHERE id=$1;
`, [req.params.id]);
  console.log(result);
  try {
    if (result.rows.length === 0) {
      res.status(500).json({
        message: "User not found",
        success: false,
        data: {}
      })
    }
    res.status(200).json({
      message: "User found successfully",
      success: true,
      data:result.rows[0]
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
app.listen(port, () => {
  console.log(`Example app listening On port ${port}`)
})
