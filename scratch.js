// var nlp = require('compromise')
var nlp = require('/home/spencer/mountain/nlp-compromise/src');
var nlpDate = require('./src');
const plugin = require('./src/plugin')


//apply plugin
nlp.plugin(plugin);

let context = {};
let doc = nlp('this month')
nlpDate(doc, context)
