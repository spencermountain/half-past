
//
const normalize = function(doc) {
  doc = doc.clone();
  //expand contractions
  //convert 'fourth' to 4rth
  doc = doc.normalize()

  //remove -all- punctuation
  // doc.list.forEach((ts) => {
  //   ts.terms.forEach((t) => {
  //       console.log(t.whitespace, t.normal)
  //   })
  // })
  // console.log(doc.out('normal'))
  //convert 'sept' to september
  doc.dates().toLongForm();
  //remove adverbs
  doc.delete('#Adverb');
  //redundant terms that are not (always) adverbs
  doc.delete('(sometime|around)');

  return doc
}
module.exports = normalize
