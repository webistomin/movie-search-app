import { shallowMount, createLocalVue } from '@vue/test-utils';
import BestListItem from '../../../src/components/BestListItem';

describe('BestListItem', () => {
  let vm;
  let localVue;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    localVue = createLocalVue();
  });

  it('Matches snapshot', () => {
    vm = shallowMount(BestListItem, {
      localVue,
      propsData: {
        movieTitle: 'Prison Break',
        movieId: 0,
        movieCount: 5,
        moviePoster: 'https://pmctvline2.files.wordpress.com/2016/01/prison-break-returns-fox.jpg?w=620&h=420&crop=1',
        movieRate: 10,
      },
      stubs: ['router-link', 'router-view'],
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  describe('get right border color', () => {
    it('get silver color if movieCount <= 3', () => {
      vm = shallowMount(BestListItem, {
        localVue,
        propsData: {
          movieTitle: 'Prison Break',
          movieId: 0,
          movieCount: 3,
          moviePoster: 'https://pmctvline2.files.wordpress.com/2016/01/prison-break-returns-fox.jpg?w=620&h=420&crop=1',
          movieRate: 10,
        },
        stubs: ['router-link', 'router-view'],
      }).vm;
      expect(vm.getBorderColor).toEqual('best__pic--silver');
    });

    it('get gold color if movieCount > 3', () => {
      vm = shallowMount(BestListItem, {
        localVue,
        propsData: {
          movieTitle: 'Prison Break',
          movieId: 0,
          movieCount: 1,
          moviePoster: 'https://pmctvline2.files.wordpress.com/2016/01/prison-break-returns-fox.jpg?w=620&h=420&crop=1',
          movieRate: 10,
        },
        stubs: ['router-link', 'router-view'],
      }).vm;
      expect(vm.getBorderColor).toEqual('best__pic--gold');
    });
  });

  describe('get right poster src', () => {
    it('get movie poster if moviePoster props exist', () => {
      vm = shallowMount(BestListItem, {
        localVue,
        propsData: {
          movieTitle: 'Prison Break',
          movieId: 0,
          movieCount: 3,
          moviePoster: '/prison-break-returns-fox.jpg?w=620&h=420&crop=1',
          movieRate: 10,
        },
        stubs: ['router-link', 'router-view'],
      }).vm;
      expect(vm.getPosterSrc).toEqual(`https://image.tmdb.org/t/p/w92/${vm.moviePoster}`);
    });

    it('get static movie poster if moviePoster props doesnt exist', () => {
      vm = shallowMount(BestListItem, {
        localVue,
        propsData: {
          movieTitle: 'Prison Break',
          movieId: 0,
          movieCount: 3,
          moviePoster: '',
          movieRate: 10,
        },
        stubs: ['router-link', 'router-view'],
      }).vm;
      expect(vm.getPosterSrc).toEqual('/static/img/content/image-not-found.svg');
    });
  });
});
