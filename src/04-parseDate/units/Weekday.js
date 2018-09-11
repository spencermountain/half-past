const spacetime = require('spacetime')

class Weekday {
  constructor(str, context) {
    this.d = spacetime(context.today, context.timezone)
    this.context = context
    if (str) {
      let from = this.d.clone()
      this.d.day(str)
      //'this monday' always means forward. don't go backwards.
      if (this.d.isBefore(from) || this.d.isSame(from, 'day')) { //this [current day] means next week, too
        this.d.add(1, 'week')
      }
    }
    this.d.startOf('day')
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
  nextOne() { //this is complicated.
    let context = this.context
    let today = spacetime(context.today, context.timezone)
    //use week-of-year to decide which days are 'next'
    if (today.week() === this.d.week()) {
      this.d.add(1, 'week')
    }
    return this
  }
  lastOne() { //this is complicated, too
    let context = this.context
    this.d.subtract(1, 'week')
    //ok, but ensure 'last monday' is not yesterday.
    let today = spacetime(context.today, context.timezone)
    if (today.week() === this.d.week()) {
      this.d.subtract(1, 'week')
    }
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Weekday
