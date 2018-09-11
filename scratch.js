// var nlp = require('compromise')
var nlp = require('/home/spencer/mountain/nlp-compromise/src');
var nlpDate = require('./src');
//apply plugin
// nlp.plugin(nlpDate);

let context = {
  now: '2018-09-10T17:28:32.140Z',
};

let doc = nlp('during 1998.')
console.log(nlpDate(doc, context)[0])
