
//
const fixUp = function(doc) {

  //fixups
  if (doc.has('#Date')) {
    //first day by monday
    let oops = doc.match('#Date+ by #Date+');
    if (oops.found && !oops.has('^due')) {
      oops.match('^#Date+').unTag('Date');
    }

    let d = doc.match('#Date+');
    //'spa day'
    d.match('^day$').unTag('Date');

    let knownDate = '(yesterday|today|tomorrow)';
    if (d.has(knownDate)) {
      //yesterday 7
      d.match(`${knownDate} #Value$`).terms(1).unTag('Date');
      //7 yesterday
      d.match(`^#Value ${knownDate}$`).terms(0).unTag('Date');
      //friday yesterday
      d.match(`#WeekDay+ ${knownDate}$`).unTag('Date').lastTerm().tag('Date');
      d.match(`${knownDate}+ ${knownDate}$`).unTag('Date').lastTerm().tag('Date');
      d.match(`(this|last|next) #Date ${knownDate}$`).unTag('Date').lastTerm().tag('Date');
    }
    //tomorrow on 5
    d.match(`on #Cardinal$`).unTag('Date');
    //this tomorrow
    d.match(`this tomorrow`).terms(0).unTag('Date');
    //q2 2019
    d.match(`(q1|q2|q3|q4) #Year`).tag('Date');
    //5 tuesday
    // d.match(`^#Value #WeekDay`).terms(0).unTag('Date');
    //5 next week
    d.match(`^#Value (this|next|last)`).terms(0).unTag('Date');

    if (d.has('(last|this|next)')) {
      //this month 7
      d.match(`(last|this|next) #Duration #Value`).terms(2).unTag('Date');
      //7 this month
      d.match(`!#Month #Value (last|this|next) #Date`).terms(0).unTag('Date');
    }
    //january 5 5
    if (d.has('(#Year|#Time|#TextValue|#NumberRange)') === false) {
      d.match('(#Month|#WeekDay) #Value #Value').terms(2).unTag('Date');
    }
    //between june
    if (d.has('^between') && !d.has('and .')) {
      d.unTag('Date');
    }
    //june june
    if (d.has('#Month #Month') && !d.has('#Hyphenated')) {
      d.match('#Month').lastTerm().unTag('Date');
    }

  }
  return doc
}
module.exports = fixUp
