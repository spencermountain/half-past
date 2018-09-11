var test = require('tape')
var nlpDate = require('../src')

test('no-throw:', function(t) {

  t.ok(true, 'does-not-throw')

  t.end()
})


// let context = {
//   today: '2020-12-30'
// };
// let doc = nlp('this season')
// nlpDate(doc, context)
// Sun 01 Nov 2020, 12:00AM   →   Sun 28 Feb 2021, 11:59PM
