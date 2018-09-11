
//
const normalize = function(doc) {
  doc = doc.clone();
  //expand contractions
  doc.contractions().expand();
  //convert 'fourth' to 4rth
  // result.debug();
  doc.values().toNumber();
  //convert 'sept' to september
  doc.dates().toLongForm();
  //remove adverbs
  doc.delete('#Adverb');
  //redundant terms that are not (always) adverbs
  doc.delete('(sometime|around)');

  return doc
}
module.exports = normalize
