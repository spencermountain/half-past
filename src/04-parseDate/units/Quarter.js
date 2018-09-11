const spacetime = require('spacetime')
const getCurrent = require('./_getCurrent')

const quarterNames = {
  q1: 0,
  q2: 1,
  q3: 2,
  q4: 3,
}

class Quarter {
  constructor(str, context) {
    this.d = spacetime(context.today, context.timezone)
    // let q = doc.match('#FinancialQuarter')
    // let str = q.out('normal')
    if (str && quarterNames.hasOwnProperty(str)) {
      this.i = quarterNames[str]
      this.d = spacetime(context.quarters[this.i], context.timezone)
    }
    this.context = context
    this.toStart()
  }
  toStart() {
    let context = this.context
    let arr = context.quarters
    let i = getCurrent(this.d, arr)
    let year = this.d.year()
    this.d = spacetime(arr[i], context.timezone)
    this.d.year(year)
    this.d.startOf('day')
    return this
  }
  start() {
    return this.d.clone()
  }
  end() { //go forward a quarter, then back a day
    let context = this.context
    let arr = context.quarters
    let from = this.d.clone()
    let i = getCurrent(this.d, arr)
    i = (i + 1) % arr.length //increment
    this.d = spacetime(arr[i], context.timezone)
    this.d.year(from.year())
    this.d.minus(1, 'day')
    if (this.d.isBefore(from)) {
      this.d.add(1, 'year')
    }
    this.d.endOf('day')
    return this.d
  }
  middle() {
    return this.d.clone().add(6, 'weeks') //todo: don't hardcode this
  }
  //'next' here refers to 'next q2', not next quarter..
  next() {
    return this.d.add(1, 'year')
  }
  last() {
    return this.d.minus(1, 'year')
  }
  nextOne() {
    this.d.add(3, 'months')
    return this
  }
  lastOne() {
    this.d.subtract(3, 'months')
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Quarter
