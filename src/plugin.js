const plugin = {
  words: {
    tommorrow: 'Date', //typo
    tmr: 'Date', //typo
    never: 'Date',
    eventually: 'Date',
    'in a while': 'Date',
    'soon': 'Date',
    'all day': 'Date',
    'some point': 'Date',
    'later time': 'Date',
    'another time': 'Date',
    'some time': 'Date',
    someday: 'Date',
    sometime: 'Date',
  },
  tags: {
    Season: {
      isA: 'Date'
    },
    FinancialQuarter: {
      isA: 'Date'
    },
    // 2 days before
    ShiftDate: {
      isA: 'Date'
    },
    // next/last/this
    RelativeDate: {
      isA: 'Date'
    },
    Timezone: {
      isA: 'Time'
    }
  },
}
module.exports = plugin
