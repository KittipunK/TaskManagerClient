const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bc = require('bcrypt');
const crypto = require('crypto');
const { SignJWT, jwtVerify } = require('jose');

const pool = new Pool({
    user: 'YOUR-USERNAME',
    host: 'YOUR-HOST (localhost?)',
    database: 'YOUR-DATABASE',
    password: 'YOUR-PASSWORD',
    port: 5432 // YOUR POSTGRES PORT,
})

const port = 5000; // YOUR SERVER PORT

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const corsOptions = {
    origin: 'YOUR-CLIENT-URL',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
};
app.use(cors(corsOptions));

const saltRounds = 10; // your salt

const secretKey = crypto.createSecretKey(process.env.JWT_SECRET || 'your-secret-key', 'utf-8');

async function encrypt(password){
    try {
        const hashed = await bc.hash(password, saltRounds);
        return hashed;
    } catch (err) {
        console.error(err);
    }
}

app.get('/', (req, res) => {

})

app.get('/tasks', async (req, res) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token | token=='null'){ return res.status(401).send({message:'No token provided'})}
    const {payload} = await jwtVerify(token, secretKey,{
        algorithms: ['HS256'],
    }).catch((error)=>{
        return res.status(401).send({message:error})
    })

    pool.query(`SELECT * FROM users WHERE username='${payload.username}';`, (err, response)=>{
        if(err){
            return res.status(500).send({message:'Something went wrong'})
        }else{
            if(response.rows.length<1){
                return res.status(404).send({message:'Incorrect Username or Password'});
            }else{
                const userID = response.rows[0].id;
                
                pool.query(`SELECT * FROM tasks WHERE "user_id"=${userID} ORDER BY id;`, (err2, response2)=>{
                    if(err2){
                        return res.status(500).send({message:'Something went wrong'})
                    }else{
                        if(response2.rows.length<1){
                            return res.status(200).send({data:[]})
                        }else{
                            return res.status(200).send({data: response2.rows})
                        }
                    }
                })
            }
        }
    })
})

app.post('/tasks', async (req, res) =>{
    const body = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if(!token | token=='null'){return res.status(401).send({message:'No token provided'})}

    const {payload} = await jwtVerify(token, secretKey,{
        algorithms: ['HS256'],
    }).catch(()=>{
        return res.status(500).send({message: "Invalid token provided"});
    })

    pool.query(`SELECT * FROM users WHERE username='${payload.username}';`, (err, response)=>{
        if(err){
            return res.status(500).send({message:'Something went wrong'})
        }else{
            if(response.rows.length<1){
                return res.status(404).send({message:'Incorrect Username or Password'});
            }else{
                const userID = response.rows[0].id;

                pool.query(`INSERT INTO tasks (title, description, user_id) VALUES ('${body.title}','${body.description}',${userID});`, (err2, response2)=>{
                    if(err2){
                        return res.status(500).send({message:'Something went wrong'})  
                    }else{
                        pool.query(`SELECT * FROM tasks WHERE "user_id"=${userID};`, (err3, response3)=>{
                            if(err3){
                                return res.status(500).send({message:'Something went wrong'})
                            }else{
                                if(response3.rows.length<1){
                                    return res.status(200).send({message:'no tasks', data: []})
                                }else{
                                    return res.status(200).send({message:'success', data: response3.rows})
                                }
                            }
                        })
                    }
                })
                
            }
        }
    })
    
})

app.put('/tasks/:id', async (req, res) =>{
    const taskId = req.params['id'];
    const body = req.body;

    const token = req.headers.authorization?.split(' ')[1];
    if(!token | token=='null'){return res.status(401).send({message:'No token provided'})}

    const {payload} = await jwtVerify(token, secretKey,{
        algorithms: ['HS256'],
    }).catch(error=>{
        return res.status(500).send({message: error});
    })
    
    pool.query(`UPDATE tasks SET "${body.column}" = ${body.value} WHERE id = ${taskId};`, (err, response)=>{
        if(err){
            return res.status(500).send({message:'Something went wrong'})
        }else{ 
            return res.status(200).send({message:'Complete'})
        }
    })

})

app.delete('/tasks/:id', async (req, res) =>{
    const taskId = req.params['id'];

    const token = req.headers.authorization?.split(' ')[1];
    if(!token | token=='null'){return res.status(401).send({message:'No token provided'})}

    const {payload} = await jwtVerify(token, secretKey,{
        algorithms: ['HS256'],
    }).catch((error)=>{
        return res.status(500).send({message: error});
    })

    pool.query(`DELETE FROM tasks WHERE id = ${taskId};`, (err, response)=>{
        if(err){
            return res.status(500).send({message:'Something went wrong'})
        }else{ 
            return res.status(200).send({message:'Complete'})
        }
    })
})

app.post('/auth/login', (req, response)=>{
    const body = req.body;

    pool.query(`SELECT * FROM users WHERE username='${body.username}';`, (err, res)=>{
        if(err){
            return response.status(500).send({message:'Something went wrong'})
        }else{
            if(res.rows.length<1){
                return response.status(404).send({message:'Incorrect Username or Password'});
            }else{
                bc.compare(body.password, res.rows[0].password, async function(err, result){
                    if(err){
                        return response.status(500).send({message:'Something went wrong'})
                    }else{
                        if(result){
                            const jwt = await new SignJWT({username: body.username})
                                .setProtectedHeader({alg: 'HS256'})
                                .sign(secretKey);
                            return response.status(200).send({message:'Complete', token:jwt});
                        }else{
                            return response.status(404).send({message:'Incorrect Username or Password'})
                        }
                    }
                });
            }
        }
    })

})

app.post('/auth/register', (req, response)=>{
    const body = req.body;
    
    pool.query(`SELECT * FROM users WHERE username='${body.username}';`, async (err, res)=>{
        if(err){
            return response.status(500).send({message:'Something went wrong'})
        }else{
            if(res.rows.length>0){
                return response.status(500).send({message:'Username already exists'});
            }else{
                const hashedPassword = await encrypt(body.password);
                if(hashedPassword){ 
                    pool.query(`INSERT INTO users (username, password) VALUES ('${body.username}','${hashedPassword}');`, async(err2, res2)=>{
                        if(err2){
                            return response.status(500).send({message:'Something went wrong'})
                        }else{
                            const jwt = await new SignJWT({username: body.username})
                                .setProtectedHeader({alg: 'HS256'})
                                .sign(secretKey);
                            return response.status(200).send({message:'Complete', token:jwt});
                        }
                    })
                }
            }
        }
    })
})

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
});