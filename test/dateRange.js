import moment from 'moment';
import test from 'tape';
import { isIterable, dateRange, getArray, map } from '../src';

test('dateRange', t => {

  t.ok(dateRange
    , `dateRange should be defined`);
  
  const _dateRange1 = dateRange(+moment(), +moment().add(3, 'days'));

  t.ok(isIterable(_dateRange1)
    , `dateRange returns iterable`);
  
  t.deepEqual(
    getArray(map(d => d.toISOString(), dateRange('2014-01-01', '2014-01-02'))),
    [new Date('2014-01-01 00:00:00'), new Date('2014-01-02 00:00:00')].map(d => d.toISOString()),
    `dateRange produces expected output`
  );

  for (const date of _dateRange1) {
    if (!(date instanceof Date)) {
      t.fail(`dateRange should output Date instances`);
    }
  }

  const _rangeFromToday = dateRange(new Date());
  t.ok(!isIterable(_rangeFromToday)
    , `Partially applied dateRange does not return iterable`);

  t.ok(typeof _rangeFromToday === 'function'
    , `Partially applied dateRange returns function`);

  t.ok(isIterable(_rangeFromToday(moment().add(10, 'days').format()))
    , `Curried dateRange returns iterable`);

  t.end();
});
