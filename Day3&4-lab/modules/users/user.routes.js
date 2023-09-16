import express from 'express';
import {
  signUp,
  updateUser,
  deleteUser,
  gatAllUser,
  signIn,
  search,
  searchByAge,
  changePass,
} from "./user.controller.js";
import validation from '../../middleware/validation.js';
import { changePassValidationSchema, logInSchem, signUpValidationSchema, updateValidationSchema } from './user.validation.js';
const userRoutes = express.Router();
userRoutes.post("/",validation(signUpValidationSchema),signUp)
userRoutes.get("/", gatAllUser);
userRoutes.patch("/:id",validation(updateValidationSchema),updateUser)
userRoutes.delete("/:id",validation(updateValidationSchema),deleteUser)
userRoutes.post("/signin",validation(logInSchem), signIn);
userRoutes.post("/search", search);
userRoutes.post("/:minAge/:maxAge", searchByAge);
userRoutes.patch(
  "/changepass/:id",
  validation(changePassValidationSchema),
  changePass
);





export default userRoutes;