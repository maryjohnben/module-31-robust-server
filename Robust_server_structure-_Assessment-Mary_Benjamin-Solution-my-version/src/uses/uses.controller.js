const res = require("express/lib/response");
const uses = require("../data/uses-data");

function list(req, res, next) {
    const {urlId} = req.params
  res.json({ data: uses.filter(urlId ? use => use.urlId == urlId : ()=> true )});
}

function useExists(req, res, next) {
  const { useId } = req.params;
  const foundUse = uses.find((use) => (use.id === Number(useId)));
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({ status: 404, message: `Usage not found ${useId}` });
}

function read(req, res, next) {
    const use = res.locals.use
    res.json({data: use})
}

function destroy (req, res, next) {
    const useId = res.locals.use.id;
    console.log(useId)
    const index = uses.findIndex((use)=>use.id === Number(useId))
    const deleted = uses.splice(index, 1);
    res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  delete: [useExists, destroy]
};
