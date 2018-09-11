const spacetime = require('spacetime')

class Weekday {
  constructor(doc, context) {
    let weekday = doc.match('#WeekDay')
    if (weekday.found) {
      weekday = weekday.out('normal')
      this.d = spacetime(context.today, context.timezone)
      this.d.day(weekday).startOf('day')
    }
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('day')
  }
  middle() {
    return this.d.clone().add(12, 'hours')
  }
  next() { //'next wednesday', not tomorrow.
    return this.d.clone().add(7, 'days')
  }
  last() {
    return this.d.clone().subtract(7, 'days')
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Weekday
