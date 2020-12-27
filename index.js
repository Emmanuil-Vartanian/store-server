const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
let http = require("request");
// const { graphqlHTTP } = require("express-graphql");
const app = express();

// const { schema } = require("./graphQL/schema/schema");
// const { root } = require("./graphQL/resolvers/resolvers");

app.use(bodyParser.json());
app.use(express.static("build"));
app.use(cors());

var users = [];

app.get("/user", (req, res) => {
  res.send(JSON.stringify(users));
});

app.post("/user", (req, res) => {
  users.push(req.body);

  let reqBody = req.body;
  let fields = [
    "<b>Имя</b>: " + reqBody.firstName,
    "<b>Фамилия</b>: " + reqBody.lastName,
    "<b>Телефон</b>: " + reqBody.telephone,
    "<b>Доставка</b>: " + reqBody.delivery,
    "<b>Город</b>: " + reqBody.city,
    "<b>Отделение новой почты</b>: " + reqBody.newMail,
    "<b>Название игрушки</b>: " + reqBody.dataToys.map((obj) => obj.title),
    "<b>Цена игрушки</b>: " + reqBody.dataToys.map((obj) => obj.price),
    "<b>Цвет игрушки</b>: " +
      reqBody.dataToys.map((obj) =>
        obj.colorsToy === "" ? "натуральный цвет" : obj.colorsToy
      ),
  ];
  let msg = "";
  fields.forEach((field) => {
    msg += field + "\n";
  });
  msg = encodeURI(msg);

  http.post(
    `https://api.telegram.org/bot1377450264:AAEuQ2rPq62UVtRE2IpV8F-SS8WnydR15ho/sendMessage?chat_id=-410072642&parse_mode=html&text=${msg}`,
    function (error, response, body) {
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
      if (response.statusCode === 200) {
        res.status(200).json({ status: "ok", message: "Успешно отправлено!" });
      }
      if (response.statusCode !== 200) {
        res.status(400).json({ status: "error", message: "Произошла ошибка!" });
      }
    }
  );

  res.status(201) || res.status(200);
});

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   })
// );

app.listen(5556, () => console.log("The server started on port 5556"));
