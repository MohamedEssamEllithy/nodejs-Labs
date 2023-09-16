// all imports
import express from 'express'
import userRoutes from './modules/users/user.routes.js';
import postRoutes from "./modules/posts/post.routes.js";
import { initConnection } from './db/connection.js';


// all declerations
const app = express()
const port = 4000;
// all app .use
app.use(express.json());
app.use(userRoutes)
app.use(postRoutes)
initConnection() 

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



