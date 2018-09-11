// var nlp = require('compromise')
var nlp = require('/home/spencer/mountain/nlp-compromise/src');
var nlpDate = require('./src');
const plugin = require('./src/plugin')


//apply plugin
nlp.plugin(plugin);

let context = {
  today: '2020-11-11'
};
let doc = nlp('this season')
nlpDate(doc, context)
