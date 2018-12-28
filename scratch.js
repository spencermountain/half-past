var nlp = require('compromise')
// var nlp = require('/home/spencer/mountain/nlp-compromise/src');
var sometime = require('./src');
const plugin = require('./src/plugin')

const fmt = function(arr = []) {
  if (arr.length === 0) {
    console.log('-')
    return
  }
  arr.forEach((obj) => {
    console.log(`${obj.start.format('iso')}   →   ${obj.end.format('nice')}`)
    console.log('')
  })
}

//apply plugin
nlp.plugin(plugin);

let context = {
  // today: '2023-12-03'
};
fmt(sometime(nlp('june 1st'), context))
// sometime(nlp('jul 5th'), context)
// sometime(nlp('mothers day foo'), context)
// sometime(nlp('1992/03/28'), context)
// sometime(nlp('next wednesday'), context)

// const spacetime = require('spacetime')
// let d = spacetime('june 5th')
// console.log(d.format('nice-short'))
// d.quarter(2)
// d.startOf('quarter')
// console.log(d.format('nice-short'))
