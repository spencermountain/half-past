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
    '2018-03-01', //Spring - from March 1 to May 31;
    '2018-06-01', // Summer - from June 1 to August 31;
    '2018-09-01', //Fall (autumn) - from September 1 to November 30;
    '2018-11-01', // Winter - from December 1 to February 28 (February 29 in a leap year).
  ],
  quarters: [
    '2018-01-01', //q1
    '2018-04-01', //q2
    '2018-07-01', //q3
    '2018-09-01', //q4
  ],
  semesters: [ // https://en.wikipedia.org/wiki/Academic_term
    '2018-09-01',
    '2019-01-01',
    '2019-04-01',
  ],
}
