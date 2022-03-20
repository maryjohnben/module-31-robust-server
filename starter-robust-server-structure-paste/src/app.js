const express = require("express");
const app = express();
app.use(express.json());
// const pastes = require("./data/pastes-data");

//routers
const pastesRouter = require("./pastes/pastes.router");
app.use("/pastes", pastesRouter); // Note: app.use



// TODO: Follow instructions in the checkpoint to implement ths API.



/*
app.use("/pastes/:pasteId", (req, res, next) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    next({
      status: 404,
      message: `Paste id not found: ${pasteId}`
    });
  }
});


//by changing the code from app.use(...) to app.get(...),
//you're making it so that the handler will be called only
//if the HTTP method of the incoming request is GET.
app.get("/pastes", (req, res) => {
  res.json({ data: pastes });
});


// New middleware function to validate the request body
function bodyHasTextProperty(req, res, next) {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next(); // Call `next()` without an error message if the result exists
  }
  next({
    status: 400,
    message: "A 'text' property is required."
  });
}
// Variable to hold the next ID
// Because some IDs may already be used, find the largest assigned ID
//maxID is the accumulator, if paste.id is greater it will be added to the accumulator
let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post("/pastes", 
bodyHasTextProperty, //validation middleware added thus route handler no longer has validation code
(req, res, next) => {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } =
    req.body;
  // if (text) { //middleware function will handle it now
    //if text is missing status code 400 NOTFOUND send
    const newPaste = {
      id: ++lastPasteId, // Increment last ID, then assign as the current ID
      name,
      syntax,
      exposure,
      expiration,
      text,
      user_id,
    };
    pastes.push(newPaste);
    // res.json({ data: newPaste });
    //now status is being returned
    res.status(201).json({ data: newPaste });
  // } else {
  //   res.sendStatus(400);
  // }
});

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});
// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const {status = 500, message = "Something went wrong"} = error
  response.status(status).json({error: message});
});
*/
module.exports = app;
