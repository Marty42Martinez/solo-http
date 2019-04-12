const http = require('http');
const uuid = require('uuid/v4');
const bodyParser = require('./body-parser');
const { parse } = require('url');
const People = require('./models/People');

// const notes = {};
const app = http.createServer((req, res) => {
  res.send = json => res.end(JSON.stringify(json));

  const url = parse(req.url, true);
  if(url.pathname === '/people' && req.method === 'POST') {
    bodyParser(req)
      .then(json => {
        return People.create({
          name: json.name,
          age: json.age,
          class: json.class
        });
      })
      .then(createdPerson => res.send(createdPerson));
  }
  // res.setHeader('Content-Type', 'application/json');
  // if(url.pathname === '/note' && req.method === 'POST') {
  //   const id = uuid();
  //   bodyParser(req)
  //     .then(json => {
  //       notes[id] = { ...json, id };
  //       res.send(notes);
  //     });
  // } else if(url.pathname.includes('/character/')) {
  //   const id = url.pathname.split('/')[2];
  //   getCharacter(id)
  //     .then(character => res.send(character));
  // }
});

module.exports = app;
