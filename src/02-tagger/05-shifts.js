const here = 'shift-tagger'
//
const shiftTagger = function(doc) {
  if (doc.has('#Date')) {
    //two weeks before
    doc.match('#Cardinal #Duration (before|after)').tag('#ShiftDate', here)
    //two weeks and three days before
    doc.match('#Cardinal #Duration and? #ShiftDate').tag('#ShiftDate', here)
    doc.match('#Cardinal #Duration and? #ShiftDate').tag('#ShiftDate', here)
    doc.match('#Cardinal #Duration and? #ShiftDate').tag('#ShiftDate', here)
  }
  return doc
}
module.exports = shiftTagger
