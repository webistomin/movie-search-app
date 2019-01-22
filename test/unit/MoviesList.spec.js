import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MoviesList from '../../src/components/MoviesList';
import routes from '../../src/router/';

describe('BestMovies.vue', () => {
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
    };

    mutations = {
    };

    state = {
      isRowView: false,
      isGridView: true,
    };

    getters = {
      getGridViewState: state => state.isGridView,
      getRowViewState: state => state.isRowView,
    };

    store = new Vuex.Store({
      state,
      mutations,
      actions,
      getters,
    });

    localVue = createLocalVue();
    localVue.use(Vuex);
    router = routes;
  });

  it('Matches snapshot', () => {
    vm = shallowMount(MoviesList, {
      store,
      localVue,
      router,
      propsData: {
        moviesList: [{ adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675 }],
      },
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  describe('test "getMovieOverview" method', () => {
    it('return short overview if grid view', () => {
      vm = shallowMount(MoviesList, {
        store,
        localVue,
        router,
        propsData: {
          moviesList: [{ adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675 }],
        },
      }).vm;
      state.isGridView = true;
      expect(vm.getMovieOverview(vm.moviesList[0].overview)).toEqual('Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guita...');
    });

    it('return big overview if row view', () => {
      vm = shallowMount(MoviesList, {
        store,
        localVue,
        router,
        propsData: {
          moviesList: [{ adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675 }],
        },
      }).vm;
      state.isGridView = false;
      state.isRowView = true;
      expect(vm.getMovieOverview(vm.moviesList[0].overview)).toEqual('Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock \'n\' roll band Queen in 1970. Hit songs become instant classics. When Mercury\'s increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.');
    });
  });

  describe('test "getPosterSrc" method', () => {
    it('return tmdb poster if exists', () => {
      vm = shallowMount(MoviesList, {
        store,
        localVue,
        router,
        propsData: {
          moviesList: [{ adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675 }],
        },
      }).vm;
      expect(vm.getPosterSrc(vm.moviesList[0].poster_path)).toEqual('https://image.tmdb.org/t/p/w185//lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg');
    });

    it('return placeholder if poster doesnt exist', () => {
      vm = shallowMount(MoviesList, {
        store,
        localVue,
        router,
        propsData: {
          moviesList: [{ adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675 }],
        },
      }).vm;
      expect(vm.getPosterSrc('')).toEqual('/static/img/content/image-not-found.svg');
    });
  });

  describe('test "getPerspectiveValue" computed', () => {
    it('return 2200 if list length < 6', () => {
      vm = shallowMount(MoviesList, {
        store,
        localVue,
        router,
        propsData: {
          moviesList: [{ adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675 }],
        },
      }).vm;
      expect(vm.getPerspectiveValue).toEqual(2200);
    });

    it('return list length * 278 if length > 6', () => {
      vm = shallowMount(MoviesList, {
        store,
        localVue,
        router,
        propsData: {
          moviesList: [
            {
              adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675,
            },
            {
              adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675,
            },
            {
              adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675,
            },
            {
              adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675,
            },
            {
              adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675,
            },
            {
              adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675,
            },
            {
              adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675,
            },
          ],
        },
      }).vm;
      expect(vm.getPerspectiveValue).toEqual(1946);
    });
  });
});
