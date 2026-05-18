import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser=
  async (req: Request, res: Response)=> {
    // console.log(req.body);
    // const { name, email, password, age } = req.body;
    try {
     const result=await userService.createUserIntoDB(req.body)
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
  const createGetAll=async (req: Request, res: Response) => {
    const result =await  userService.createGetAllIntoDB()
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
  }
  const createGetSingle=async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result= await userService.createGetSingleIntoDB(id as string);
      if (result.rows.length === 0) {
        res.status(404).json({
          message: "User not found",
          success: false,
          data: {}
        })
      }
      res.status(200).json({
        message: "User found successfully",
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
  }
  
export const userController={
  createUser,
  createGetAll,
  createGetSingle
}
