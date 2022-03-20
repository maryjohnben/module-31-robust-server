const express = require("express");

const app = express();
const usesRouter = require("./uses/uses.router")
const urlsRouter = require("./urls/urls.router")
app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.
app.use('/urls', urlsRouter)
app.use('/uses', usesRouter)

//Not found handler
app.use((req, res, next)=> {
    next({status: 404, message: `Not found: ${req.originalUrl}`})
})

//error handling
app.use((error, req, res, next)=> {
    console.error(error)
    const {status = 500, message = "something went wrong"} = error;
    res.status(status).json({error: message})

})

module.exports = app;
