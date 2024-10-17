import { login } from '../js/api/auth/login.js';
import { save } from '../js/storage/index.js';
import { apiPath } from '../js/api/constants.js';

jest.mock('../js/storage/index.js', () => ({
  save: jest.fn(),
  load: jest.fn(),
}));

global.fetch = jest.fn();

describe('login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('stores a token when provided with valid credentials', async () => {
    const mockToken = 'fakeToken123';
    const mockProfile = {
      accessToken: mockToken,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    const email = 'test@example.com';
    const password = 'password123';

    const result = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: expect.any(Object),
    });
    expect(save).toHaveBeenCalledWith('token', mockToken);
    expect(save).toHaveBeenCalledWith('profile', {
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
    expect(result).toEqual({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });
});
