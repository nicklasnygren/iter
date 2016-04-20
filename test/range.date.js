import moment from 'moment';
import test from 'tape';
import { dateRange } from '../src';

test('dateRange', t => {

  t.ok(dateRange
    , `dateRange should be defined`);
  
  const _dateRange1 = dateRange(+moment(), +moment().add(3, 'days'));

  t.ok(typeof _dateRange1[Symbol.iterator] === 'function'
    , `dateRange produces iterable`);

  for (const date of _dateRange1) {
    console.log(date);
    if (!(date instanceof Date)) {
      t.fail(`dateRange should output Date instances`);
    }
  }

  t.end();
});
