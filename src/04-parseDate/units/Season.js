const spacetime = require('spacetime')
const getCurrent = require('./_getCurrent')

const seasonNames = {
  spring: 0,
  summer: 1,
  fall: 2,
  winter: 3,
  //alternative names
  autumn: 2,
  springtime: 0,
  summertime: 1,
  wintertime: 3,
}

class Season {
  constructor(str, context) {
    this.d = spacetime(context.today, context.timezone)
    // let season = doc.match('(spring|summer|winter|fall|autumn|springtime|wintertime|summertime)')
    // let str = season.out('normal')
    if (str && seasonNames.hasOwnProperty(str)) {
      this.i = seasonNames[str]
      this.d = spacetime(context.seasons[this.i], context.timezone)
    }
    this.context = context
    this.toStart()
  }
  toStart() {
    let context = this.context
    let arr = context.seasons
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
    let arr = context.seasons
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
  //'next' here refers to 'next spring', not next season.
  next() {
    return this.d.add(1, 'year')
  }
  last() {
    return this.d.minus(1, 'year')
  }
  //go from q1 to q2
  nextOne() {
    let startDay = this.context.seasons[(this.i + 1) % 3]
    let prev = this.d.clone()
    this.d.set(startDay)
    if (this.d.isBefore(prev)) {
      this.d.add(1, 'year')
    }
    return this
  }
  lastOne() {
    let startDay = this.context.seasons[(this.i - 1) % 3]
    let prev = this.d.clone()
    this.d.set(startDay)
    if (this.d.isAfter(prev)) {
      this.d.subtract(1, 'year')
    }
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Season
