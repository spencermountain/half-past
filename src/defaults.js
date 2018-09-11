module.exports = {
  //what 'today', or 'now' is
  now: new Date().toISOString(),
  //our assumed timezone, unless given
  timezone: null,
  //set our calendar assumptions
  days: {
    start: '8:00am', //colloquial start/end of a day
    end: '6:00pm',
  },
  weeks: {
    start: 'monday', //some terrible people disagree with this.
    end: 'friday'
  },
  holidays: {
    'may day': '2018-06-01', //throws-away year info
  },
  seasons: [
    '2018-03-01', //spring
    '2019-01-01', //summer
    '2019-04-01', //winter
    '2019-07-01', //fall
  ],
  quarters: [
    '2018-01-01', //q1
    '2019-04-01', //q2
    '2019-07-01', //q3
    '2019-09-01', //q4
  ],
  semesters: [ // https://en.wikipedia.org/wiki/Academic_term
    '2018-09-01',
    '2019-01-01',
    '2019-04-01',
  ],
}
