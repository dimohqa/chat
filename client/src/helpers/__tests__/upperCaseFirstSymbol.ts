import { upperCaseFirstSymbol } from '../upperCaseFirstSymbol';

describe('should return', () => {
  test('empty string with zero string', () => {
    expect(upperCaseFirstSymbol('')).toBe('');
  });

  test('a string with the first uppers symbol', () => {
    const mockString = 'test';

    expect(upperCaseFirstSymbol(mockString)).toBe('Test');
  });

  test('unchanged string', () => {
    const mockString = 'Test';

    expect(upperCaseFirstSymbol(mockString)).toBe(mockString);
  });

  test('a string with the first uppers symbol and multiple words', () => {
    const mockString = 'test1 test2 test3';

    expect(upperCaseFirstSymbol(mockString)).toBe('Test1 test2 test3');
  });
});
