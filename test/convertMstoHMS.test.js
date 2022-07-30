const { convertCentiSecondsToHMS, padTo2Digits } = require('../utils/convertCentisecondstoHMS');

describe('convertCentiSecondsToHMS', () => {
  test('it converts centiseconds to seconds', () => {
    expect(convertCentiSecondsToHMS(1031)).toBe('00:00:10');
  });
  test('it converts centiseconds to minutes', () => {
    expect(convertCentiSecondsToHMS(9000)).toBe('00:01:30');
  });
  test('it converts centiseconds to hours', () => {
    expect(convertCentiSecondsToHMS(720000)).toBe('02:00:00');
  });
  test('it rounds  up to the next minute if seconds are >= 45', () => {
    expect(convertCentiSecondsToHMS(4500)).toBe('00:01:00');
  });
});
describe('padToTWoDigits', () => {
  test('it pads any single diget number to be two digits', () => {
    expect(padTo2Digits(0)).toBe('00');
  });
});
