import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDB=async(payLoad:IUser)=>
{
  const {name, email, password, age}=payLoad;
  const result = await pool.query(`
    INSERT INTO users(name ,email,password,age) VALUES($1,$2,$3,$4)
    RETURNING *
    `,
    [name, email, password, age],
  );
  return result;

}
const createGetAllIntoDB=async()=>{
  const result = await pool.query(`
    SELECT * FROM users;
  `)
  return result;
}
const createGetSingleIntoDB=async(id :string)=>{
  const result = await pool.query(`
    SELECT * FROM users WHERE id=$1;
  `, [id]);
  return result;
}
const createPutIntoDB=async(payLoad:IUser,id:string)=>
{
  const {name, password, age}=payLoad;
  // console.log(payLoad);
  const result = await pool.query(`
    UPDATE users 
    SET
     name=COALESCE($1,name),
     password=COALESCE($2,password),
     age=COALESCE($3 ,age) 
    WHERE id=$4
    RETURNING *;
  `, [name, password, age,id])
  return result;
}
const createDeleteIntoDB=async(id :string)=>{
  const result = await pool.query(`
    DELETE FROM users WHERE id=$1
    `,[id])
  return result;
}
export const userService={
  createUserIntoDB,
  createGetAllIntoDB,
  createGetSingleIntoDB,
  createPutIntoDB,
  createDeleteIntoDB
};