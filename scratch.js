// var nlp = require('compromise')
var nlp = require('/home/spencer/mountain/nlp-compromise/src');
var nlpDate = require('./src');
const plugin = require('./src/plugin')


//apply plugin
nlp.plugin(plugin);

let context = {
  // today: '2023-12-03'
};
// nlpDate(nlp('last wednesday'), context)
// nlpDate(nlp('jul 5th'), context)
nlpDate(nlp('mothers day foo'), context)
// nlpDate(nlp('1992/03/28'), context)
// nlpDate(nlp('next wednesday'), context)

// const spacetime = require('spacetime')
// let d = spacetime('june 5th')
// console.log(d.format('nice-short'))
// d.quarter(2)
// d.startOf('quarter')
// console.log(d.format('nice-short'))
