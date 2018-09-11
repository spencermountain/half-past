const spacetime = require('spacetime')

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
    if (str && seasonNames.hasOwnProperty(str) === true) {
      this.d.season(seasonNames[str])
    }
    this.d.startOf('season')
  }
  start() {
    return this.d.clone()
  }
  end() {
    return this.d.clone().endOf('season')
  }
  middle() {
    return this.d.clone().add(6, 'weeks')
  }
  // 'next' refers to next spring, not next season
  next() {
    return this.d.clone().add(1, 'year')
  }
  last() {
    return this.d.clone().subtract(1, 'year')
  }
  // spring → summer
  nextOne() {
    this.d.add(1, 'season')
    return this
  }
  lastOne() {
    this.d.subtract(1, 'season')
    return this
  }
  isValid() {
    return this.d && this.d.isValid()
  }
}
module.exports = Season
