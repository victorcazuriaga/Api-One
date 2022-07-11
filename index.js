const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config");
const app = express();
const port = 3007;
const db = require("./dbconfig");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const PRIVATEKEY =
  "caf10d9275d5ef85af00cb1de1bf9982131825ad84e16d572b6c10b461b7b6b4";
const users = [];
const secretInfo = "qualquercoisa";
const saltRounds = 10;

//verificação JWT
const verifyJwt = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  jwt.verify(token, PRIVATEKEY, (err, decode) => {
    if (err) return res.status(401).end();

    next();
  });
};
//teste raiz
app.get("/", (req, res) => {
  res.send("secretInfo");
});

app.get("/clientes", async (req, res) => {
  const user = await db("user");
  res.json(user);
});

//usu corp
// app.post("/users/signup/corp", async (req, res) => {
//   const data = req.body;
//   if (data.password && data.email) {
//     try {
//       const [id] = await db("/user_corp").insert(data);
//       console.log(id);
//       return res.send("registrado");
//     } catch (error) {
//       return res.status(400).json(error);
//     }
//   } else {
//     return res.status(400).send("campos invalidos");
//   }
// });

//  app.post("/users/login/corp", (req,res)=> {
//     const data = req.body
//     const user = users.find((user) => user.email === data.email && user.password === data.password )
//     console.log(user)
//     if(user){
//         const token = jwt.sign(user,PRIVATEKEY, { expiresIn:"1h" })
//         return res.json({token:token})
//     }else{
//         return res.status(400).send("campos invalidos")
//     }
//  })

// user doador

app.post("/users/signup", async (req, res) => {
  const data = req.body;
  const user = (await db("user").where({ email: data.email }))[0];

  if (user) return res.status(400).send("E-mail já cadastrado");

  if (data.password && data.email && data.name) {
    try {
      bcrypt.hash(data.password, saltRounds, async (err, hash) => {
        const [user] = await db("user").insert({ ...data, password: hash }, [
          "id",
        ]);
        console.log(user.id);
        return res.send("registrado");
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  } else {
    return res.status(400).send("campos invalidos");
  }
});

app.post("/users/login", async (req, res) => {
  const data = req.body;
  const user = (await db("user").where("email", data.email))[0];

  if (!user) return res.status(400).send("E-mail ou senha inválido");

  const authUser = bcrypt.compare(data.password, user?.password);

  if (authUser) {
    const token = jwt.sign(user, PRIVATEKEY, { expiresIn: "1h" });
    return res.json({ token: token });
  } else {
    return res.status(400).send("campos invalidos");
  }
});
app.delete("/users", (req, res) => {});

app.listen(port, () => {
  console.log("iniciou");
});
