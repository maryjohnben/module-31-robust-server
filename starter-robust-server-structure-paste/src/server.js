const { PORT = 6000 } = process.env;
const app = require("./app");

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);