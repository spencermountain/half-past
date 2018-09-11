const spacetime = require('spacetime')

class Month {
  constructor(doc, context) {
    let month = doc.match('#Month')
    if (month.found) {
      month = month.out('normal')
      this.d = spacetime(context.today, context.timezone)
      this.d.month(month).startOf('month')
    }
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('month')
  }
  middle() {
    return this.d.clone().add(2, 'weeks')
  }
  next() {
    return this.d.clone().add(1, 'month')
  }
  last() {
    return this.d.clone().subtract(1, 'month')
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Month
