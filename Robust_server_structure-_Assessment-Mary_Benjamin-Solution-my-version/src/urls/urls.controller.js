const urls = require("../data/urls-data");
const uses = require("../data/uses-data")

function list(req, res, next) {
  res.json({ data: urls });
}

function urlExists(req, res, next) {
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));
  //   console.log(foundUrl);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next(); //make sure to add return
  }
    next({ status: 404, message: `url ID not found: ${urlId}` });
}


function hrefValid(req, res, next) {
    const {data = {}} = req.body
if(data['href']) {
    return next();
}
next({
    status: 400,
    message: `Must include an href value`
})
}

function create(req, res, next) {
    const { data: { href } = {} } = req.body;
    const newUrl = {
        id: urls.length + 1,
        href: href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

//creates uses data
function useRecords (req, res, next) {
    uses.push({
        id: uses.length + 1,
        urlId: res.locals.url.id,
        time: Date.now(),
    });
    next();
}

function read(req, res, next) {
  res.json({ data: res.locals.url });
}

function update(req, res, next) {
    const url = res.locals.url
    const {data: {href} = {}} = req.body
    url.href = href; //updating whatever is inside the res.locals.url being stored in url 
    console.log(url)
    res.json({data: url}) //newly updated is added
}
module.exports = {
  list,
  read: [urlExists, useRecords, read],
  create: [hrefValid, create],
  update: [urlExists, hrefValid, update],
  urlExists,
}; 
