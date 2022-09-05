const { manualTimeEntryConverter } = require('../../utils/manualTimeEntryConverter');

describe('manualtimeEntryConverter', () => {
  test('it should convert user input to centiseconds accuately given both  minutes and hours', () => {
    const userInput = { hours: 2, minutes: 25 };
    const convertedUserInput = manualTimeEntryConverter(userInput);
    expect(convertedUserInput).toBe(870000);
  });
  test('it should convert user input to centiseconds when there 0 hours and some amount of minutes', () => {
    const userInput = { hours: 0, minutes: 35 };
    expect(manualTimeEntryConverter(userInput)).toBe(210000);
  });
  test('it should convert user input to centiseconds when there 0 hours and some amount of minutes', () => {
    const userInput = { hours: 2, minutes: 0 };
    expect(manualTimeEntryConverter(userInput)).toBe(720000);
  });
  test('it throws when given zero for both hours and minutes ', () => {
    const userInput = { hours: 0, minutes: 0 };
    expect(() => {
      manualTimeEntryConverter(userInput).toThrow();
    });
  });
});
