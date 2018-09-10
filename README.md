
**WIP**

rule-based interpreter for natural-language date-forms.

an opinionated-but-configurable mash-up of [spacetime](https://github.com/spencermountain/spacetime)
and [compromise](https://github.com/spencermountain/compromise)

you've been warned!


### IF YOU DARE:
`npm install nlp-date`

```js
var nlpDate = require('nlp-date')
//apply plugin
nlp.plugin(nlpDate)

let context = {
  //what 'today', or 'now' is
  now: '2018-09-10T17:28:32.140Z',
  //our assumed timezone, unless given
  timezone: 'Canada/Eastern',
  //set our calendar assumptions
  days:{
    start:'8:00am',
    end:'6:00pm',   
  },
  weeks:{
    start:'monday' //some terrible people disagree with this.
    end:'friday'
  },
  holidays:{
    'may day':'2018-06-01',//throws-away year info
  },
  seasons:[
    '2018-03-01',//spring
    '2019-01-01',//summer
    '2019-04-01',//winter
    '2019-07-01',//fall
  ],
  quarters:[
    '2018-01-01',//q1
    '2019-04-01',//q2
    '2019-07-01',//q3
    '2019-09-01',//q4
  ],
  semesters:[  // https://en.wikipedia.org/wiki/Academic_term
    '2018-09-01',
    '2019-01-01',
    '2019-04-01',
  ],
}
nlp('the end of next week').dates().parse(context)
/*
[{
  start:SpacetimeObject,
  end:SpacetimeObject,
  interval:{
    unit:'month',
    amount:3
  },
}]
*/

```
### What it does:
* `"January 8th"` explicit date-forms
* `"1999-12-25"`  numeric/ISO date-forms
* `"7:30pm"` NL time-of-day
* `"5pm eastern time"` NL timezone
* `"christmas"` named holidays

*  `"next friday"` this/next/last logic
* `"end of the month"` end/start/middle logic

* `between June 5th and 7th` range logic
* `"three days after June 4rth"` 'punt' by a duration

* `this winter` seasons -
* `q2 2020` financial quarters -
* `second semester 2019` academic semesters -

* `every monday` repetitions by interval

* `in April O'neil's house` ignore false-positives

* handle DST/leap-year/hemisphere/leap-second logic (from [spacetime](https://github.com/spencermountain/spacetime) )
* handle tokenization/normalization/punctuation-handling (from [compromise](https://github.com/spencermountain/compromise) )

### What it doesn't do:
* `'easter 1440'` distant dates for astronomical holidays
* `1536602449137` millisecond, or epoch-time as dates
* force interpretation of british/american (always tries both!)
* `sometime in June` decide on a soft-date

### Examples:
```
  explicit templates
    ✓ "march 2nd"
    ✓ "2 march"
    ✓ "2 march 2016"
    ✓ "march 2nd"
    ✓ "2nd of march"
    ✓ "2nd of march, 2016"
    ✓ "march 2nd, 2016"
    ✓ "march 22nd"
    ✓ "tuesday march 22nd"
    ✓ "tuesday march 22nd, 2016"
    ✓ "april the 22nd"
    ✓ "22 april"
    ✓ "22 april 2016"
    ✓ "april 22nd"
    ✓ "22nd of april"
    ✓ "the 22nd of april, 2016"
    ✓ "april 1st, 2016"
    ✓ "april 1st"
    ✓ "tuesday, april the 1st"
    ✓ "tuesday april 1st, 2016"

  time-based cruft
    ✓ "july 5th at 2pm"
    ✓ "july 5th, 2:12"
    ✓ "4:23am july 5th "
    ✓ "july 5th 2pm PST"
    ✓ "1pm pacific time, july 5th "
    ✓ "july 5th before noon pacific time"
    ✓ "3:23 EST july 5th "
    ✓ "2 oclock july 5th "
    ✓ "july 5 2016 12 oclock PST"
    ✓ "3:23 eastern standard time july 5"

  named holidays
    ✓ "new years eve"
    ✓ "april fools"
    ✓ "april fools at 5pm"
    ✓ "april fools, 2016"

  numeric dates
    ✓ "1999/12/25"
    ✓ "1999-12-25"
    ✓ "12/25/1999"
    ✓ "12-25-1999"
    ✓ "25-12-1999"
    ✓ "25-12-1999 12:32"
    ✓ "25-12-1999 12:32:00"
    ✓ "2016/03/13"
    ✓ "03/13/2016 at 2:00"
    ✓ "2016/13/03"
    ✓ "13/03/2016 before 11"

  punted dates
    ✓ "two days from now"
    ✓ "in two hours from now"
    ✓ "two months from today"
    ✓ "in one year"
    ✓ "a year from now"
    ✓ "after a few days"
    ✓ "in a few years"
    ✓ "two months later"
    ✓ "two months in the future"
    ✓ "a year forward"

  adhoc terms
    ✓ "tomorrow"
    ✓ "the next day"
    ✓ "the day after next"
    ✓ "day after tomorrow"
```

### Relative to now
dates that are relative to given context time
```
  relative Year
    ✓ "q1 2002"
    ✓ "fourth quarter, 2002"
    ✓ "fourth quarter"
    ✓ "spring 2002"
    ✓ "this march"
    ✓ next quarter
    ✓ next year
    ✓ this winter
    ✓ middle of the winter

  relative Month
    ✓ "first week of february"
    ✓ "second week of february"
    ✓ "2nd week of february"

  relative Week
    ✓ "this saturday"
    ✓ "sunday"
    ✓ "mon"
    ✓ "tuesday"
    ✓ "next wed"
    ✓ "this thurs"
    ✓ "next friday"
    ✓ "friday"
    ✓ "this weekend"
    ✓ "next weekend"
    ✓ "end of this week"
    ✓ "next week"
    ✓ "start of next week"
    ✓ "end of next week"
    ✓ "this monday"
    ✓ "two mondays from now"
    ✓ "3 mondays from now"
    ✓ "three sundays from now"
    ✓ "next monday"
    ✓ "monday next week"
    ✓ "the monday after next"
```

### Ranges
```
explicit between range
    ✓ "between monday and friday"
    ✓ "between next tuesday and next friday"
    ✓ "between christmas and new years"
    ✓ "between new years and christmas"
    ✓ "from monday to friday"
    ✓ "from next tuesday to next friday"
    ✓ "from christmas to new years"
    ✓  june 5th to august 7th
    ✓  june 5th to 7th
    ✓ between june 5 and august seven

now-implicit range (now → then)
   ✓ "by saturday"
   ✓ "by tuesday"
   ✓ "before next spring"
   ✓ "by 2016-02-06"

duration-implicit range (start → end)
   ✓ "on friday"
   ✓ "on next tuesday"
   ✓ "on christmas"
   ✓ "on 12/12/1992"
   ✓ "saturday"
   ✓ "july 5th"
   ✓ "july 5th 2016"
   ✓ "next tuesday"
   ✓ "tomorrow"
```

### Repeating dates
```
Recurring dates
  ✓ every day
  ✓ every thursday
  ✓ every other day
  ✓ every other wednesday
  ✓ each monday at 9am
```

### Calendar-hopping
```
punted dates
  ✓ 4 days from now
  ✓ three weeks from today

relative range
  ✓ two weeks later

Implicit range -- (assumed now-to-then)
  ✓ by the end of the year
  ✓ before christmas

soft range - not fully day-defined
  ✓ middle of the month
  ✓ start of next week
  ✓ in august
  ✓ this spring

punted week with day
  ✓ two saturdays from now
  ✓ the friday after next  
```

### See also
* [Sugarjs](https://sugarjs.com/dates/) - by Andrew Plummer
* [Chrono](https://github.com/wanasit/chrono) - by Wanasit Tanakitrungruang
* [Datejs](http://www.datejs.com/) - by Geoffrey McGill

#### Other languages
* Clojure - [Duckling](https://duckling.wit.ai/) - by Facebook
* Java - [Natty](http://natty.joestelmach.com/) - by Joe Stelmach
* Go -[When](https://github.com/olebedev/when) - by Oleg Lebedev
* Python [dateparser](https://github.com/scrapinghub/dateparser) - by ScrapingHub
* API [Luis](https://www.luis.ai/home) - by Microsoft

MIT
