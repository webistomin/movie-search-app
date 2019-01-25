import shared from '../../../src/store/shared';

describe('shared.js', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('test setRequestToken mutations', () => {
    it('set request token correctly', () => {
      shared.mutations.setRequestToken(shared.state, 'qwerty123');
      expect(shared.state.requestToken).toEqual('qwerty123');
    });
  });

  describe('test setErrorMessage mutations', () => {
    it('set error message correctly', () => {
      shared.mutations.setErrorMessage(shared.state, 'error');
      expect(shared.state.error).toEqual('error');
    });
  });
});
