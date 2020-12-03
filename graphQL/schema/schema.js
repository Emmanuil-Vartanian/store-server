const { buildSchema } = require("graphql")

var schema = buildSchema(`
  type Query {
    getShoppingCart: [ShoppingCart]
  }
  type Mutation {
    getShoppingCart: [ShoppingCart]
  }
  type ShoppingCart {
    id: Int
    image: String
    title: String
    price: String
    quantityOfGoods: String
  }
`);

module.exports.schema = schema
