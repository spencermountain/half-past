
//
const values = function(doc) {
  if (doc.has('#Value')) {
    //june 5 to 7th
    doc.match('#Month #Value to #Value of? #Year?').tag('Date');
    //5 to 7th june
    doc.match('#Value to #Value of? #Month #Year?').tag('Date');
    //third week of may
    doc.match('#Value #Duration of #Date').tag('Date');
    //two days after
    doc.match('#Value+ #Duration (after|before|into|later|afterwards|ago)?').tag('Date');
    //two days
    doc.match('#Value #Date').tag('Date');
    //june 5th
    doc.match('#Date #Value').tag('Date');
    //tuesday at 5
    doc.match('#Date #Preposition #Value').tag('Date');
    //tomorrow before 3
    doc.match('#Date (after|before|during|on|in) #Value').tag('Date');
    //a year and a half
    doc.match('#Value (year|month|week|day) and a half').tag('Date');
    //5 and a half years
    doc.match('#Value and a half (years|months|weeks|days)').tag('Date');
    //on the fifth
    doc.match('on the #Ordinal').tag('Date');
  }
  return doc
}
module.exports = values
