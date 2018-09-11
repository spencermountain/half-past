const spacetime = require('spacetime')

class Year {
  constructor(doc, context) {
    let num = doc.match('#Year')
    if (num.found) {
      num = num.out('normal')
      this.d = spacetime(context.today, context.timezone).year(num).startOf('year')
    }
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('year')
  }
  middle() {
    return this.d.clone().add(6, 'months')
  }
  next() {
    return this.d.clone().add(1, 'year')
  }
  last() {
    return this.d.clone().subtract(1, 'year')
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Year
