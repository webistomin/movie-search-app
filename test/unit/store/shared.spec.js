import shared from '../../../src/store/shared';


let url = '';
let mockError = false;

jest.mock('axios', () => ({
  get: _url => new Promise((resolve, reject) => {
    if (mockError) { reject('failure'); }
    url = _url;
    resolve({ data: 'data' });
  }),
}));

describe('shared.js', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('test shared mutations', () => {
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

    describe('test setMessage mutations', () => {
      it('set message correctly', () => {
        shared.mutations.setMessage(shared.state, 'message');
        expect(shared.state.message).toEqual('message');
      });
    });

    describe('test setLoadingState mutations', () => {
      it('set loading state correctly', () => {
        shared.mutations.setLoadingState(shared.state, true);
        expect(shared.state.isLoading).toEqual(true);
      });
    });

    describe('test setGenresList mutations', () => {
      it('set set genres correctly', () => {
        shared.mutations.setGenresList(shared.state, [{ id: 0, title: 'Action' }]);
        expect(shared.state.genres).toEqual([{ id: 0, title: 'Action' }]);
      });
    });

    describe('test setRowView mutations', () => {
      it('set row view correctly', () => {
        shared.mutations.setRowView(shared.state, true);
        expect(shared.state.isRowView).toEqual(true);
      });
    });

    describe('test setGridView mutations', () => {
      it('set grid view correctly', () => {
        shared.mutations.setGridView(shared.state, true);
        expect(shared.state.isGridView).toEqual(true);
      });
    });

    describe('test setNavigationState mutations', () => {
      it('set navigation state correctly', () => {
        shared.mutations.setNavigationState(shared.state, true);
        expect(shared.state.isNavigationOpened).toEqual(true);
      });
    });

    describe('test setAuthorizeState mutations', () => {
      it('set auth state correctly', () => {
        shared.mutations.setAuthorizeState(shared.state, true);
        expect(shared.state.isAuthorized).toEqual(true);
      });
    });

    describe('test setSessionId mutations', () => {
      it('set session id correctly', () => {
        shared.mutations.setSessionId(shared.state, 'qwerty123');
        expect(shared.state.sessionId).toEqual('qwerty123');
      });
    });
  });

  describe('test shared getters', () => {
    describe('test getSessionId getter', () => {
      it('return session id', () => {
        shared.state.sessionId = 'qwerty123';
        expect(shared.getters.getSessionId(shared.state)).toEqual('qwerty123');
      });
    });

    describe('test getRequestToken getter', () => {
      it('return request token', () => {
        shared.state.requestToken = 'qwerty123';
        expect(shared.getters.getRequestToken(shared.state)).toEqual('qwerty123');
      });
    });

    describe('test getLoadingState getter', () => {
      it('return loading state', () => {
        shared.state.isLoading = true;
        expect(shared.getters.getLoadingState(shared.state)).toEqual(true);
      });
    });

    describe('test getErrorMessage getter', () => {
      it('return error message', () => {
        shared.state.error = 'error';
        expect(shared.getters.getErrorMessage(shared.state)).toEqual('error');
      });
    });

    describe('test getMessage getter', () => {
      it('return message', () => {
        shared.state.message = 'message';
        expect(shared.getters.getMessage(shared.state)).toEqual('message');
      });
    });

    describe('test getGenresList getter', () => {
      it('return genres', () => {
        shared.state.genres = { genres: [{ id: 0, title: 'Action' }] };
        expect(shared.getters.getGenresList(shared.state)).toEqual([{ id: 0, title: 'Action' }]);
      });
    });

    describe('test getRowViewState getter', () => {
      it('return row view state', () => {
        shared.state.isRowView = true;
        expect(shared.getters.getRowViewState(shared.state)).toEqual(true);
      });
    });

    describe('test getGridViewState getter', () => {
      it('return grid view state', () => {
        shared.state.isGridView = true;
        expect(shared.getters.getGridViewState(shared.state)).toEqual(true);
      });
    });

    describe('test getNavigationState getter', () => {
      it('return navigation state', () => {
        shared.state.isNavigationOpened = true;
        expect(shared.getters.getNavigationState(shared.state)).toEqual(true);
      });
    });

    describe('test getAuthorizeState getter', () => {
      it('return auth state', () => {
        shared.state.isAuthorized = true;
        expect(shared.getters.getAuthorizeState(shared.state)).toEqual(true);
      });
    });
  });

  describe('test shared actions', () => {
    describe('test fetchGenresList action', () => {
      it('set genres list', async () => {
        const commit = jest.fn();
        const state = shared.state;

        await shared.actions.fetchGenresList({ state, commit });

        expect(url).toEqual('https://api.themoviedb.org/3/genre/movie/list?api_key=52217232f795bbefbb1b7c951aae98ad&language=en-US');
        expect(commit).toHaveBeenCalledWith(
          'setGenresList', 'data');
        expect(localStorage.getItem('genresList')).toEqual('"data"');
      });

      it('catches an error', async () => {
        mockError = true;
        const commit = jest.fn();
        const state = shared.state;
        await shared.actions.fetchGenresList({ state, commit }).rejects.toThrow("API Error occurred.");
        expect(commit).toHaveBeenCalledWith(
          'setErrorMessage', 'data');
      });
    });
  });
});
