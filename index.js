const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
let http = require("request");
// const { graphqlHTTP } = require("express-graphql");
const app = express();

const mailer = require("./smtpGmail");
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
    "<b>Название игрушек</b>: " + reqBody.dataToys.map((obj) => obj.title),
    "<b>Цена игрушек</b>: " + reqBody.dataToys.map((obj) => obj.price),
    "<b>Цвет игрушек</b>: " +
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

// app.post("/user", (req, res) => {
//   users.push(req.body);
//   console.log(req.body);
//   const message = {
//     to: "super.detskieigruski@gmail.com",
//     subject: "Заказ",
//     text: `Данные о заказе:
//       Имя: ${req.body.firstName}
//       Фамилия: ${req.body.lastName}
//       Телефон: ${req.body.telephone}
//       Доставка: ${req.body.delivery}
//       Город: ${req.body.city}
//       Отделение новой почты: ${req.body.newMail}

//       Название игрушек: ${req.body.dataToys.map((obj) => obj.title)}
//       Цена игрушек: ${req.body.dataToys.map((obj) => obj.price)}
//       Цвет игрушек: ${req.body.dataToys.map((obj) =>
//         obj.colorsToy === "" ? "натуральный цвет" : obj.colorsToy
//       )}`
//   };
//   mailer(message);
//   res.status(201).send(req.body);
// });

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   })
// );

// app.get("/user", (req, res) => {
//   res.send(JSON.stringify(users));
// });

// app.post("/user", (req, res) => {
//   users.push(req.body);
//   console.log(req.body);
//   const message = {
//     to: "super.detskieigruski@gmail.com",
//     subject: "Заказ",
//     text: `Данные о заказе:
//       Имя: ${req.body.userName}
//       Фамилия: ${req.body.userLastName}
//       Город: ${req.body.userCity}
//       Отделение новой почты: ${req.body.userNewMail}
//       Телефон: ${req.body.userPhone}`
//   };
//   mailer(message);
//   res.status(201).send(req.body);
// });

app.listen(5556, () => console.log("The server started on port 5556"));
