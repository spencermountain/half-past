
//
const tagLogic = function(doc) {

  if (doc.has('#Date')) {
    // //next september
    doc.match('this? (last|next|past|this|previous|current|upcoming|coming|the) #Date').tag('Date');
    //starting this june
    doc.match('(starting|beginning|ending) #Date').tag('Date');
    //friday to sunday
    doc.match('#Date #Preposition #Date').tag('Date');
    //once a day..
    doc.match('(once|twice) (a|an|each) #Date').tag('Date');
    //TODO:fixme
    doc.match('(by|until|on|in|at|during|over|every|each|due) the? #Date').tag('Date');
    //tuesday
    doc.match('#Date+').tag('Date');
  }

  if (doc.has('#Date')) {
    //start of june
    doc.match('the? (start|end|middle|beginning) of (last|next|this|the) (#Date|#Date)').tag('Date');
    //by June
    doc.match('(by|until|on|in|at|during|over|every|each|due) the? #Date').tag('Date');
    //a year after..
    doc.match('a #Duration').tag('Date');
    //this coming june
    doc.match('(the|this) #Date').tag('Date');
    //between x and y
    doc.match('(between|from) #Date').tag('Date');
    doc.match('(to|until|upto) #Date').tag('Date');
    doc.match('#Date and #Date').tag('Date');
    //during this june
    doc.match('(by|until|after|before|during|on|in|following) (next|this|last)? (#Date|#Date)').tag('Date');
    //day after next
    doc.match('the? #Date after next one?').tag('Date');
    //approximately...
    doc.match('(about|approx|approximately|around) #Date').tag('Date');
  }
  return doc
}
module.exports = tagLogic
