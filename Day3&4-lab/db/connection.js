import mongoose from 'mongoose'
export const initConnection = ()=>{
mongoose.connect("mongodb://127.0.0.1:27017/mydb")
.then(()=>console.log("DB-connected"))
.catch((err)=>console.log(` DB error:${err}`)) 
}