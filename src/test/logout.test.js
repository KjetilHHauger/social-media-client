import { logout } from '../js/api/auth/logout.js';
import * as storage from '../js/storage/index.js';

jest.mock('../js/storage/index.js', () => ({
  remove: jest.fn(),
}));

describe('logout', () => {
  it('should call remove to clear token and profile from storage', () => {
    logout();

    expect(storage.remove).toHaveBeenCalledWith('token');
    expect(storage.remove).toHaveBeenCalledWith('profile');

    expect(storage.remove).toHaveBeenCalledTimes(2);
  });
});
