import { generateRandomToken } from './util';

describe('generateRandomToken', () => {
  it('should return a string and default 18 characters', async () => {
    const token = await generateRandomToken();

    expect(typeof token).toBe('string');
    expect(token).toHaveLength(18);
  });

  it('should return a string with 10 characters', async () => {
    const token = await generateRandomToken(5);

    expect(typeof token).toBe('string');
    expect(token).toHaveLength(10);
  });
});
