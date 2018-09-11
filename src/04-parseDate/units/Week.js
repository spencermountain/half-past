const spacetime = require('spacetime')

class Week {
  constructor(doc, context) {
    let counted = doc.match('#Ordinal week (of|in) .')
    if (counted.found) {
      this.d = spacetime(context.today, context.timezone)
      this.d.startOf('week')
    }
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('week')
  }
  middle() {
    return this.d.clone().add(3, 'days')
  }
  next() {
    return this.d.clone().add(1, 'week')
  }
  last() {
    return this.d.clone().subtract(1, 'week')
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Week
