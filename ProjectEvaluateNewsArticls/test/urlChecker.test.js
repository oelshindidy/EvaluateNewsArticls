import { validUrl } from '../src/client/js/urlChecker.js';

test('correct URL', () => {
    expect(validUrl('https://www.drberg.com/dr-eric-berg/bio')).toBe(2)
});

test('empty input', () => {
    expect(validUrl('')).toBe(0)
});

test("Testing for missing www", () => {
  let url = 'drberg.com/dr-eric-berg/bio'
  expect(validUrl(url)).toBe(1);
});