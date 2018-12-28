'use strict';
const spacetime = require('spacetime');
const Day = require('../units/Day')
//we try to support a bunch of these, but are going to miss some. PRs welcome

//yep,
let jan = 0;
let feb = 1;
let march = 2;
let april = 3;
let may = 4;
let june = 5;
let july = 6;
let august = 7;
let sep = 8;
let oct = 9;
let nov = 10;
let dec = 11;

let fixed_holidays = {
  'new years eve': [dec, 31],
  'new years': [jan, 1],
  'new years day': [jan, 1],
  'inauguration day': [jan, 20],
  'australia day': [jan, 26],
  'national freedom day': [feb, 1],
  'groundhog day': [feb, 2],
  'rosa parks day': [feb, 4],
  'valentines day': [feb, 14],
  'saint valentines day': [feb, 14],
  'st valentines day ': [feb, 14],
  'saint patricks day': [march, 17],
  'st patricks day': [march, 17],
  'april fools': [april, 1],
  'april fools day': [april, 1],
  'emancipation day': [april, 16],
  'labour day': [may, 1],
  'cinco de mayo': [may, 5],
  'national nurses day': [may, 6],
  'harvey milk day': [may, 22],
  'victoria day': [may, 24],
  'juneteenth': [june, 19],
  'canada day': [july, 1],
  'independence day': [july, 4],
  'independents day': [july, 4],
  'bastille day': [july, 14],
  'purple heart day': [august, 7],
  'womens equality day': [august, 26],
  '16 de septiembre': [sep, 16],
  'dieciseis de septiembre': [sep, 16],
  'grito de dolores': [sep, 16],
  'halloween': [oct, 31],
  'all hallows eve': [oct, 31],
  'day of the dead': [oct, 31], // Ranged holiday [nov, 2],
  'dia de muertos': [oct, 31], // Ranged holiday [nov, 2],
  'veterans day': [nov, 11],
  'st andrews day': [nov, 30],
  'saint andrews day': [nov, 30],
  'all saints day': [nov, 1],
  'all sts day': [nov, 1],
  'armistice day': [nov, 11],
  'rememberance day': [nov, 11],
  'christmas eve': [dec, 24],
  'christmas': [dec, 25],
  'xmas': [dec, 25],
  'boxing day': [dec, 26],
  'st stephens day': [dec, 26],
  'saint stephens day': [dec, 26],

  // Fixed religious and cultural holidays
  // Catholic + Christian
  'epiphany': [jan, 6],
  'orthodox christmas day': [jan, 7],
  'orthodox new year': [jan, 14],
  'assumption of mary': [august, 15],
  'all souls day': [nov, 2],
  'feast of the immaculate conception': [dec, 8],
  'feast of our lady of guadalupe': [dec, 12],

  // Kwanzaa
  'kwanzaa': [dec, 26], // Ranged holiday [jan, 1],

  // Pagan / metal 🤘
  'imbolc': [feb, 2],
  'beltaine': [may, 1],
  'lughnassadh': [august, 1],
  'samhain': [oct, 31]
};

// hardcoded dates for astronomical holidays
//   ----please change, every few years(!)---
const moving_holidays = {
  2017: {
    // Astronomical major holidays
    'martin luther king': [jan, 16], //[third monday in january],
    'mlk': [jan, 16], //[third Monday in January],
    'presidents day': [feb, 20], //[third monday in february],
    'mardi gras': [feb, 28], //[47 days before easter],
    'commonwealth day': [march, 13], //[second monday in march],
    'tax day': [april, 18],
    'memorial day': [may, 29], //[last monday in may],
    'mothers day': [may, 14], //[second Sunday in May],
    'fathers day': [june, 18], //[third Sunday in June],
    'labor day': [sep, 4], //[first monday in september],
    'columbus day': [oct, 9], //[second monday in october],
    'indigenous peoples day': [oct, 9], //[second monday in October],
    'canadian thanksgiving': [oct, 9], //[second monday in october],
    'election day': [nov, 7], // [Tuesday following the first Monday in November],
    'thanksgiving': [nov, 23], //[fourth Thursday in November],
    't-day': [nov, 23], //[fourth Thursday in November],
    'turkey day': [nov, 23], //[fourth Thursday in November],
    'black friday': [nov, 24], //[fourth tuesday in november],
    'cyber monday': [nov, 27],

    // Astronomical religious and cultural holidays
    // Catholic + Christian
    'ash wednesday': [march, 1], // [First day of Lent],
    'palm sunday': [april, 9], // [Sunday before Easter Sunday],
    'maundy thursday': [april, 13], // [The day before Good Friday],
    'good friday': [april, 14],
    'holy saturday': [april, 15],
    'easter': [april, 16],
    'easter sunday': [april, 16],
    'easter monday': [april, 17],
    'orthodox good friday': [april, 14],
    'orthodox holy saturday': [april, 15],
    'orthodox easter': [april, 16],
    'orthodox easter monday': [april, 17],
    'ascension day': [may, 25],
    'pentecost': [june, 4],
    'whitsunday': [june, 4],
    'whit sunday': [june, 4],
    'whit monday': [june, 5], // [The day after Pentecost],
    'trinity sunday': [june, 11], // [The Sunday after Pentecost],
    'corpus christi': [june, 15],
    'advent': [dec, 3], // Ranged holiday [dec, 25] [The Sunday nearest St Andrew’s Day, encompassing the next three Sundays, ending on Christmas Day],

    // Jewish
    'tu bishvat': [feb, 11],
    'tu bshevat': [feb, 11],
    'purim': [march, 12],
    'passover': [april, 11], // Ranged holiday [april, 18],
    'yom hashoah': [april, 24],
    'lag baomer': [may, 14],
    'shavuot': [may, 31],
    'tisha bav': [august, 1],
    'rosh hashana': [sep, 21],
    'yom kippur': [sep, 30],
    'sukkot': [oct, 5], // Ranged holiday [oct, 11],
    'shmini atzeret': [oct, 12],
    'simchat torah': [oct, 13],
    'chanukah': [dec, 13], // Ranged holiday [dec, 20],
    'hanukkah': [dec, 13], // Ranged holiday [dec, 20],

    // Muslim
    'isra and miraj': [april, 24],
    'lailat al-qadr': [june, 21],
    'eid al-fitr': [june, 26],
    'id al-Fitr': [june, 26],
    'eid ul-Fitr': [june, 26],
    'ramadan': [may, 27], // Ranged holiday [, ],
    'eid al-adha': [sep, 2],
    'muharram': [sep, 22],
    'the prophets birthday': [dec, 1],

    // Pagan / metal 🤘
    'ostara': [march, 20],
    'march equinox': [march, 20],
    'vernal equinox': [march, 20],
    'litha': [june, 21],
    'june solistice': [june, 21],
    'summer solistice': [june, 21],
    'mabon': [sep, 22],
    'september equinox': [sep, 22],
    'autumnal equinox': [sep, 22],
    'yule': [dec, 21],
    'december solstice': [dec, 21],
    'winter solstice': [dec, 21],

    // Additional important holidays
    'chinese new year': [jan, 28],
    'diwali': [oct, 19]
  },
  2018: {
    // Astronomical major holidays
    'martin luther king': [jan, 15], //[third monday in january],
    'mlk': [jan, 15], //[third Monday in January],
    'presidents day': [feb, 19], //[third monday in february],
    'mardi gras': [feb, 13], //[47 days before easter],
    'commonwealth day': [march, 12], //[second monday in march],
    'tax day': [april, 17],
    'mothers day': [may, 13], //[second Sunday in May],
    'memorial day': [may, 28], //[last monday in may],
    'fathers day': [june, 17], //[third Sunday in June],
    'labor day': [sep, 3], //[first monday in september],
    'columbus day': [oct, 8], //[second monday in october],
    'indigenous peoples day': [oct, 8], //[second monday in October],
    'canadian thanksgiving': [oct, 8], //[second monday in october],
    'election day': [nov, 6], // [Tuesday following the first Monday in November],
    'thanksgiving': [nov, 22], // [fourth Thursday in November],
    't-day': [nov, 22], // [fourth Thursday in November],
    'turkey day': [nov, 22], //[fourth Thursday in November],
    'black friday': [nov, 23], //[fourth tuesday in november],
    'cyber monday': [nov, 26],

    // Astronomical religious and cultural holidays
    // Catholic + Christian
    'ash wednesday': [feb, 14], // [First day of Lent],
    'palm sunday': [march, 25], // [Sunday before Easter Sunday],
    'maundy thursday': [march, 29], // [The day before Good Friday],
    'good friday': [march, 30],
    'holy saturday': [march, 31],
    'easter': [april, 1],
    'easter sunday': [april, 1],
    'easter monday': [april, 2],
    'orthodox good friday': [april, 6],
    'orthodox holy saturday': [april, 7],
    'orthodox easter': [april, 8],
    'orthodox easter monday': [april, 9],
    'ascension day': [may, 10],
    'pentecost': [may, 20],
    'whitsunday': [may, 20],
    'whit sunday': [may, 20],
    'whit monday': [may, 21], // [The day after Pentecost],
    'trinity sunday': [may, 27], // [The Sunday after Pentecost],
    'corpus christi': [may, 31],
    'advent': [dec, 2], // Ranged holiday [dec, 25] [The Sunday nearest St Andrew’s Day, encompassing the next three Sundays, ending on Christmas Day],

    // Jewish
    'tu bishvat': [jan, 31],
    'tu bshevat': [jan, 31],
    'purim': [march, 1],
    'passover': [march, 31], // Ranged holiday [april, 7],
    'yom hashoah': [april, 11],
    'lag baomer': [may, 3],
    'shavuot': [may, 20],
    'tisha bav': [july, 22],
    'rosh hashana': [sep, 10],
    'yom kippur': [sep, 19],
    'sukkot': [sep, 24], // Ranged holiday [sep, 30],
    'shmini atzeret': [oct, 1],
    'simchat torah': [oct, 2],
    'chanukah': [dec, 3], // Ranged holiday [dec, 30],
    'hanukkah': [dec, 3], // Ranged holiday [dec, 30],

    // Muslim
    'isra and miraj': [april, 13],
    'lailat al-qadr': [june, 10],
    'eid al-fitr': [june, 15],
    'id al-Fitr': [june, 15],
    'eid ul-Fitr': [june, 15],
    'ramadan': [may, 16], // Ranged holiday [, ],
    'eid al-adha': [sep, 22],
    'muharram': [sep, 12],
    'the prophets birthday': [nov, 21],

    // Pagan / metal
    'ostara': [march, 20],
    'march equinox': [march, 20],
    'vernal equinox': [march, 20],
    'litha': [june, 21],
    'june solistice': [june, 21],
    'summer solistice': [june, 21],
    'mabon': [sep, 23],
    'september equinox': [sep, 23],
    'autumnal equinox': [sep, 23],
    'yule': [dec, 21],
    'december solstice': [dec, 21],
    'winter solstice': [dec, 21],

    // Additional important holidays
    'chinese new year': [feb, 16],
    'diwali': [nov, 7]
  }
};


const holidayParser = (ts, context) => { //
  let today = spacetime(context.now)
  let year = today.year();
  //spin-out the holidays for this year
  let holidays = Object.assign({}, fixed_holidays, moving_holidays[year] || {});
  //try them all! (may be slow)
  let keys = Object.keys(holidays);
  for (let i = 0; i < keys.length; i++) {
    let m = ts.match(keys[i]);
    if (m.found) {
      let holiday = holidays[keys[i]];
      let d = spacetime([year, holiday[0], holiday[1]], context.timezone);
      //default next year, if it's already happened
      if (d.isAfter(today)) {
        d.add(1, 'year');
      }
      let iso = d.format('iso-short')
      return new Day(iso, context)
    }
  }
  return null;
};
module.exports = holidayParser;
