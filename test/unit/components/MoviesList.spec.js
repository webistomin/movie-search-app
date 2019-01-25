import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MoviesList from '../../../src/components/MoviesList';
import routes from '../../../src/router/';

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
        moviesList: [{ vote_count: 3807, id: 424694, video: false, vote_average: 8.2, title: 'Bohemian Rhapsody', popularity: 263.255, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', original_language: 'en', original_title: 'Bohemian Rhapsody', genre_ids: [18, 10402], backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', adult: false, overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", release_date: '2018-10-24' }],
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
          moviesList: [{ vote_count: 3807, id: 424694, video: false, vote_average: 8.2, title: 'Bohemian Rhapsody', popularity: 263.255, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', original_language: 'en', original_title: 'Bohemian Rhapsody', genre_ids: [18, 10402], backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', adult: false, overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", release_date: '2018-10-24' }],
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
          moviesList: [{ vote_count: 3807, id: 424694, video: false, vote_average: 8.2, title: 'Bohemian Rhapsody', popularity: 263.255, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', original_language: 'en', original_title: 'Bohemian Rhapsody', genre_ids: [18, 10402], backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', adult: false, overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", release_date: '2018-10-24' }],
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
          moviesList: [{ vote_count: 3807, id: 424694, video: false, vote_average: 8.2, title: 'Bohemian Rhapsody', popularity: 263.255, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', original_language: 'en', original_title: 'Bohemian Rhapsody', genre_ids: [18, 10402], backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', adult: false, overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", release_date: '2018-10-24' }],
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
          moviesList: [{ vote_count: 3807, id: 424694, video: false, vote_average: 8.2, title: 'Bohemian Rhapsody', popularity: 263.255, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', original_language: 'en', original_title: 'Bohemian Rhapsody', genre_ids: [18, 10402], backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', adult: false, overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", release_date: '2018-10-24' }],
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
          moviesList: [{ vote_count: 3807, id: 424694, video: false, vote_average: 8.2, title: 'Bohemian Rhapsody', popularity: 263.255, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', original_language: 'en', original_title: 'Bohemian Rhapsody', genre_ids: [18, 10402], backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', adult: false, overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", release_date: '2018-10-24' }],
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
          moviesList: [{ vote_count: 886, id: 424783, video: false, vote_average: 6.5, title: 'Bumblebee', popularity: 413.643, poster_path: '/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg', original_language: 'en', original_title: 'Bumblebee', genre_ids: [28, 12, 878], backdrop_path: '/hMANgfPHR1tRObNp2oPiOi9mMlz.jpg', adult: false, overview: 'On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken.  When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.', release_date: '2018-12-15' }, { vote_count: 3807, id: 424694, video: false, vote_average: 8.2, title: 'Bohemian Rhapsody', popularity: 263.255, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', original_language: 'en', original_title: 'Bohemian Rhapsody', genre_ids: [18, 10402], backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', adult: false, overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", release_date: '2018-10-24' }, { vote_count: 2811, id: 297802, video: false, vote_average: 6.9, title: 'Aquaman', popularity: 248.082, poster_path: '/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg', original_language: 'en', original_title: 'Aquaman', genre_ids: [28, 14, 878, 12], backdrop_path: '/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg', adult: false, overview: 'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.', release_date: '2018-12-07' }, { vote_count: 7, id: 390634, video: false, vote_average: 5.2, title: 'Fate/stay night: Heaven’s Feel II. lost butterfly', popularity: 206.657, poster_path: '/t0jwlwFUrtkPJoq5JH9YrRVROXZ.jpg', original_language: 'ja', original_title: "劇場版「Fate/stay night [Heaven's Feel] ⅠⅠ. lost butterfly」", genre_ids: [16, 28, 14], backdrop_path: '/3haESpzscyP1pLl2BxQ9j5KK9cM.jpg', adult: false, overview: 'Theatrical-release adaptation of the visual novel "Fate/stay night", following the third and final route. (Part 2 of a trilogy.)', release_date: '2019-01-12' }, { vote_count: 185, id: 504172, video: false, vote_average: 6.1, title: 'The Mule', popularity: 206.51, poster_path: '/t0idiLMalKMj2pLsvqHrOM4LPdQ.jpg', original_language: 'en', original_title: 'The Mule', genre_ids: [80, 18, 53], backdrop_path: '/bkc4AY6FTa3yNqrshE9b1elDzPt.jpg', adult: false, overview: 'A 90 year old horticulturalist and Korean War veteran is caught transporting $3 million worth of cocaine through Illinois for a Mexican drug cartel.', release_date: '2018-12-14' }, { vote_count: 508, id: 450465, video: false, vote_average: 7, title: 'Glass', popularity: 161.129, poster_path: '/aG5GS0V15Zpk8zvsww02faNT0QI.jpg', original_language: 'en', original_title: 'Glass', genre_ids: [53, 27, 9648, 18], backdrop_path: '/ngBFDOsx13sFXiMweDoL54XYknR.jpg', adult: false, overview: 'Following the conclusion of Split, Glass finds David Dunn pursuing Kevin Wendell Crumb’s superhuman figure of The Beast in a series of escalating encounters, while the shadowy presence of Elijah Price emerges as an orchestrator who holds secrets critical to both men.', release_date: '2019-01-16' }, { vote_count: 209, id: 446807, video: false, vote_average: 5.8, title: "The Girl in the Spider's Web", popularity: 142.792, poster_path: '/w4ibr8R702DCjwYniry1D1XwQXj.jpg', original_language: 'en', original_title: "The Girl in the Spider's Web", genre_ids: [18, 53, 9648, 80, 28], backdrop_path: '/r0ljJIPBGsGdpeDdlHpzCiNnxiB.jpg', adult: false, overview: 'In Stockholm, Sweden, hacker Lisbeth Salander is hired by Frans Balder, a computer engineer, to retrieve a program that he believes it is too dangerous to exist.', release_date: '2018-10-26' }, { vote_count: 2783, id: 332562, video: false, vote_average: 7.5, title: 'A Star Is Born', popularity: 133.285, poster_path: '/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg', original_language: 'en', original_title: 'A Star Is Born', genre_ids: [18, 10402, 10749], backdrop_path: '/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg', adult: false, overview: "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer—until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.", release_date: '2018-10-03' }, { vote_count: 310, id: 399402, video: false, vote_average: 5.9, title: 'Hunter Killer', popularity: 129.898, poster_path: '/a0j18XNVhP4RcW3wXwsqT0kVoQm.jpg', original_language: 'en', original_title: 'Hunter Killer', genre_ids: [28, 53], backdrop_path: '/hE6Jh9FJiBrakHcT3vmWxM0GVpv.jpg', adult: false, overview: 'An untested American submarine captain teams with U.S. Navy SEALs to rescue the Russian president, who has been kidnapped by a rogue general.', release_date: '2018-10-19' }, { vote_count: 650, id: 480530, video: false, vote_average: 6.5, title: 'Creed II', popularity: 129.09, poster_path: '/v3QyboWRoA4O9RbcsqH8tJMe8EB.jpg', original_language: 'en', original_title: 'Creed II', genre_ids: [18, 28], backdrop_path: '/8yqLPNwNCtpOPc3XkOlkSMnghzw.jpg', adult: false, overview: "Follows Adonis Creed's life inside and outside of the ring as he deals with new found fame, issues with his family, and his continuing quest to become a champion.", release_date: '2018-11-21' }, { vote_count: 208, id: 503314, video: false, vote_average: 7.4, title: 'Dragon Ball Super: Broly', popularity: 128.494, poster_path: '/f03YksE4NggUjG75toz4H1YAGRf.jpg', original_language: 'ja', original_title: 'ドラゴンボール超スーパー ブロリー', genre_ids: [28, 16, 878], backdrop_path: '/6OTRuxpwUUGbmCX3MKP25dOmo59.jpg', adult: false, overview: "Earth is peaceful following the Tournament of Power. Realizing that the universes still hold many more strong people yet to see, Goku spends all his days training to reach even greater heights. Then one day, Goku and Vegeta are faced by a Saiyan called 'Broly' who they've never seen before. The Saiyans were supposed to have been almost completely wiped out in the destruction of Planet Vegeta, so what's this one doing on Earth? This encounter between the three Saiyans who have followed completely different destinies turns into a stupendous battle, with even Frieza (back from Hell) getting caught up in the mix.", release_date: '2018-12-14' }, { vote_count: 674, id: 400650, video: false, vote_average: 6.8, title: 'Mary Poppins Returns', popularity: 122.592, poster_path: '/uTVGku4LibMGyKgQvjBtv3OYfAX.jpg', original_language: 'en', original_title: 'Mary Poppins Returns', genre_ids: [14, 10751, 35], backdrop_path: '/cwiJQXezWz876K3jS57Sq56RYCZ.jpg', adult: false, overview: "In Depression-era London, a now-grown Jane and Michael Banks, along with Michael's three children, are visited by the enigmatic Mary Poppins following a personal loss. Through her unique magical skills, and with the aid of her friend Jack, she helps the family rediscover the joy and wonder missing in their lives.", release_date: '2018-12-19' }, { vote_count: 81, id: 567604, video: false, vote_average: 7.1, title: 'Once Upon a Deadpool', popularity: 122.254, poster_path: '/5Ka49BWWyKMXr93YMbH5wLN7aAM.jpg', original_language: 'en', original_title: 'Once Upon a Deadpool', genre_ids: [35, 28], backdrop_path: '/7RqpTZq0mPpTcEwZ6qqwRZAFoLe.jpg', adult: false, overview: "A kidnapped Fred Savage is forced to endure Deadpool's PG-13 rendition of Deadpool 2 as a Princess Bride-esque story that's full of magic, wonder & zero F's.", release_date: '2018-12-11' }, { vote_count: 1260, id: 324857, video: false, vote_average: 8.5, title: 'Spider-Man: Into the Spider-Verse', popularity: 121.196, poster_path: '/laMM4lpQSh5z6KIBPwWogkjzBVQ.jpg', original_language: 'en', original_title: 'Spider-Man: Into the Spider-Verse', genre_ids: [28, 12, 16, 878, 35], backdrop_path: '/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg', adult: false, overview: 'Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson "Kingpin" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.', release_date: '2018-12-07' }, { vote_count: 49, id: 503616, video: false, vote_average: 6.4, title: 'Second Act', popularity: 115.583, poster_path: '/maUMIZVGs8g1hYtq4dQ9Lg9FtVF.jpg', original_language: 'en', original_title: 'Second Act', genre_ids: [10749, 35], backdrop_path: '/gZ1n5lvEWLTQgmVbeKHyfIUrqgx.jpg', adult: false, overview: 'Maya, a 40-year-old woman struggling with frustrations from unfulfilled dreams. Until that is, she gets the chance to prove to Madison Avenue that street smarts are as valuable as book smarts, and that it is never too late for a second act.', release_date: '2018-11-22' }, { vote_count: 3175, id: 405774, video: false, vote_average: 7.1, title: 'Bird Box', popularity: 115.464, poster_path: '/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg', original_language: 'en', original_title: 'Bird Box', genre_ids: [53, 18, 878, 27], backdrop_path: '/A4xNxrRodvXzJWJs2GbBKo1IBk2.jpg', adult: false, overview: "When a mysterious force decimates the world’s population, only one thing is certain: if you see it, you take your life. Facing the unknown, Malorie finds love, hope and a new beginning only for it to unravel. Now she must flee with her two children down a treacherous river to the one place left that may offer sanctuary. But to survive, they'll have to undertake the perilous two-day journey blindfolded.", release_date: '2018-12-13' }, { vote_count: 66, id: 166428, video: false, vote_average: 8.7, title: 'How to Train Your Dragon: The Hidden World', popularity: 108.049, poster_path: '/ij0xoc13hGhrYIlXGGuPXWTh3vi.jpg', original_language: 'en', original_title: 'How to Train Your Dragon: The Hidden World', genre_ids: [16, 10751, 12], backdrop_path: '/xt1eGafwaY42gBvYCUqXQrjUVjw.jpg', adult: false, overview: 'As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless’ discovery of an untamed, elusive mate draws the Night Fury away.  When danger mounts at home and Hiccup’s reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.', release_date: '2019-01-03' }, { vote_count: 4444, id: 335983, video: false, vote_average: 6.6, title: 'Venom', popularity: 106.43, poster_path: '/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg', original_language: 'en', original_title: 'Venom', genre_ids: [878, 28], backdrop_path: '/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg', adult: false, overview: 'Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote. Soon, he must rely on his newfound powers to protect the world from a shadowy organization looking for a symbiote of their own.', release_date: '2018-09-28' }, { vote_count: 10931, id: 299536, video: false, vote_average: 8.3, title: 'Avengers: Infinity War', popularity: 106.221, poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', original_language: 'en', original_title: 'Avengers: Infinity War', genre_ids: [12, 28, 14], backdrop_path: '/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg', adult: false, overview: 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.', release_date: '2018-04-25' }, { vote_count: 466, id: 426543, video: false, vote_average: 6.1, title: 'The Nutcracker and the Four Realms', popularity: 98.578, poster_path: '/3TwxpPfMoeFLxzhgAWlptE6srsZ.jpg', original_language: 'en', original_title: 'The Nutcracker and the Four Realms', genre_ids: [14, 12, 10751], backdrop_path: '/l2ji4YiNSPBV69WjGBgU0gCvRqy.jpg', adult: false, overview: 'A young girl is transported into a magical world of gingerbread soldiers and an army of mice.  In Disney’s magical take on the classic The Nutcracker, Clara wants a one-of-a-kind key that will unlock a box holding a priceless gift. A golden thread presented at her godfather’s holiday party leads her to the coveted key—which promptly disappears into a strange and mysterious parallel world. There Clara encounters a soldier, a gang of mice and the regents of three magical Realms. But she must brave the ominous Fourth Realm, home to the tyrant Mother Ginger, to retrieve her key and return harmony to the unstable world.', release_date: '2018-10-26' }],
        },
      }).vm;
      expect(vm.getPerspectiveValue).toEqual(5560);
    });
  });
});
