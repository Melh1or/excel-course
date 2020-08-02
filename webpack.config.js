const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'), // відповідає за те де лажать всі соурси в проекті
  mode: "development", // режи розробки
  entry: './index.js', // так як прописано контекст "/src" можна проігнорувати в іншому випадку "./src/index.js"
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  }


}