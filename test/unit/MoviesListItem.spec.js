import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MovieListItem from '../../src/components/MoviesListItem';
import routes from '../../src/router/';
import { priceFilter, dateFilter } from '../../src/assets/js/filters';

describe('Header.vue', () => {
  let actions;
  let store;
  let state;
  let mutations;
  let getters;
  let router;
  let vm;
  let localVue;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();

    actions = {
      fetchMovieDetails: jest.fn(),
    };

    mutations = {
      setLoadingState: (state, payload) => {
        state.loadingState = payload;
      },
    };

    state = {
      genresList: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' }, { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' }, { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Science Fiction' }, { id: 10770, name: 'TV Movie' }, { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' }, { id: 37, name: 'Western' }],
    };

    getters = {
      getGenresList: state => state.genresList,
    };

    store = new Vuex.Store({
      state,
      mutations,
      actions,
      getters,
    });

    localVue = createLocalVue();
    localVue.filter('getFormattedPrice', priceFilter);
    localVue.filter('getFormattedDate', dateFilter);
    localVue.use(Vuex);
    router = routes;
  });

  it('Matches snapshot', () => {
    vm = shallowMount(MovieListItem, {
      store,
      localVue,
      router,
      propsData: {
        movieId: 424783,
        movieTitle: 'BUMBLEBEE',
        movieOverview: 'On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken. When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.',
        movieImg: 'https://image.tmdb.org/t/p/w185//fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
        movieGenres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }],
        movieRate: 7.5,
        movieDate: '2018-01-01',
      },
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  describe('test "getMovieGenres" method', () => {
    it('return movieGenres of current film', () => {
      vm = shallowMount(MovieListItem, {
        store,
        localVue,
        router,
        propsData: {
          movieId: 424783,
          movieTitle: 'BUMBLEBEE',
          movieOverview: 'On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken. When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.',
          movieImg: 'https://image.tmdb.org/t/p/w185//fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
          movieGenres: [28, 12, 878],
          movieRate: 7.5,
          movieDate: '2018-01-01',
        },
      }).vm;
      expect(vm.getMovieGenres).toEqual(['Action', 'Adventure', 'Science Fiction']);
    });

    it('return empty array if no genres', () => {
      vm = shallowMount(MovieListItem, {
        store,
        localVue,
        router,
        propsData: {
          movieId: 424783,
          movieTitle: 'BUMBLEBEE',
          movieOverview: 'On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken. When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.',
          movieImg: 'https://image.tmdb.org/t/p/w185//fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg',
          movieGenres: [],
          movieRate: 7.5,
          movieDate: '2018-01-01',
        },
      }).vm;
      expect(vm.getMovieGenres).toEqual([]);
    });
  });
});
