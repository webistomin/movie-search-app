import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MoviePage from '../../../src/components/MoviePage';
import routes from '../../../src/router/';
import {priceFilter, dateFilter} from '../../../src/assets/js/filters';

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
      fetchMovieCredits: jest.fn(),
      fetchMovieImages: jest.fn(),
      fetchSimilarMovies: jest.fn(),
      fetchRecommendedMovies: jest.fn(),
      fetchMovieReviews: jest.fn(),
      markMovieAsFavorite: jest.fn().mockImplementation(() => Promise.resolve('called')),
      fetchFavoriteMovies: jest.fn(),
      next: jest.fn(),
    };

    mutations = {
      setLoadingState: (state, payload) => {
        state.loadingState = payload;
      },
    };

    state = {
      loadingState: false,
      movieDetails: { adult: false, backdrop_path: '/pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg', belongs_to_collection: null, budget: 52000000, genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], homepage: 'http://bohemianrhapsody.com', id: 424694, imdb_id: 'tt1727824', original_language: 'en', original_title: 'Bohemian Rhapsody', overview: "Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.", popularity: 213.531, poster_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', production_companies: [{ id: 3281, logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png', name: 'GK Films', origin_country: 'GB' }, { id: 508, logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png', name: 'Regency Enterprises', origin_country: 'US' }, { id: 90995, logo_path: null, name: 'Queen Films', origin_country: 'GB' }, { id: 11391, logo_path: null, name: 'Tribeca Productions', origin_country: 'US' }, { id: 10104, logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png', name: 'New Regency Pictures', origin_country: 'US' }, { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }], production_countries: [{ iso_3166_1: 'GB', name: 'United Kingdom' }, { iso_3166_1: 'US', name: 'United States of America' }], release_date: '2018-10-24', revenue: 606043563, runtime: 135, spoken_languages: [{ iso_639_1: 'en', name: 'English' }], status: 'Released', tagline: 'Fearless lives forever', title: 'Bohemian Rhapsody', video: false, vote_average: 8.2, vote_count: 3675 },
      movieCredits: { id: 424694, cast: [{ cast_id: 1, character: 'Freddie Mercury', credit_id: '581f2697c3a3685faa003fb0', gender: 2, id: 17838, name: 'Rami Malek', order: 0, profile_path: '/zvBCjFmedqXRqa45jlLf6vBd9Nt.jpg' }, { cast_id: 3, character: 'Brian May', credit_id: '599b3986c3a3681d4b003825', gender: 2, id: 1220123, name: 'Gwilym Lee', order: 1, profile_path: '/k6geayRL4wHLboFZpQYdkouQpvJ.jpg' }, { cast_id: 2, character: 'Roger Taylor', credit_id: '599b397192514127930037ca', gender: 2, id: 1452045, name: 'Ben Hardy', order: 2, profile_path: '/Bge1QhTCTziGLI63eua04kdTK9.jpg' }, { cast_id: 4, character: 'John Deacon', credit_id: '599b3fbd9251412793003f28', gender: 2, id: 4787, name: 'Joseph Mazzello', order: 3, profile_path: '/44gsv7TlXOOKDGg5aRtqxZjM9ae.jpg' }, { cast_id: 5, character: 'Mary Austin', credit_id: '5a29d184925141033611defd', gender: 1, id: 86232, name: 'Lucy Boynton', order: 4, profile_path: '/znBMEv0NmBewhZWHUopmzEIYVyY.jpg' }, { cast_id: 34, character: 'John Reid', credit_id: '5aea56c20e0a26290e002e09', gender: 2, id: 49735, name: 'Aidan Gillen', order: 5, profile_path: '/w37z62Ex1kxqLTyI3SRySmiVsDB.jpg' }, { cast_id: 35, character: 'Jim Beach', credit_id: '5aea56e492514172a3002620', gender: 2, id: 2441, name: 'Tom Hollander', order: 6, profile_path: '/w3jpQ0Lcus7voaq0tKGd4xv2X1D.jpg' }, { cast_id: 23, character: 'Ray Foster', credit_id: '5ad8ec329251412cf900178c', gender: 2, id: 12073, name: 'Mike Myers', order: 7, profile_path: '/sa8MMxXZrHgQ85hTAP11WS4N3ik.jpg' }, { cast_id: 32, character: 'Paul Prenter', credit_id: '5aea566f92514172aa002909', gender: 2, id: 85718, name: 'Allen Leech', order: 8, profile_path: '/bNySmAuGa0AyeEXnVk8RCmSVhOg.jpg' }, { cast_id: 33, character: 'Jim Hutton', credit_id: '5aea569b92514172b40025fa', gender: 2, id: 1227888, name: 'Aaron McCusker', order: 9, profile_path: '/34n0otWafAvVLIF2BqqOD0kl2Z2.jpg' }, { cast_id: 37, character: 'Jer Bulsara', credit_id: '5aea574e92514172cb002c73', gender: 0, id: 108578, name: 'Meneka Das', order: 10, profile_path: '/i8ZpPePcnQHPco0TIHVSOOBwuI.jpg' }, { cast_id: 38, character: 'Bomi Bulsara', credit_id: '5aea5765c3a3682bf1003c6f', gender: 2, id: 208095, name: 'Ace Bhatti', order: 11, profile_path: '/dTBdJlX7uR8ySfahNBfWoX3GGt5.jpg' }, { cast_id: 76, character: 'Kashmira Bulsara', credit_id: '5bdd11d592514137e200446e', gender: 0, id: 2167336, name: 'Priya Blackburn', order: 12, profile_path: null }, { cast_id: 56, character: 'David', credit_id: '5b037ecac3a3686c8c02de8b', gender: 2, id: 1428460, name: 'Max Bennett', order: 13, profile_path: '/fthD8U3aGnQioWAiwvFPcdDQJRV.jpg' }, { cast_id: 36, character: 'Bob Geldof', credit_id: '5aea5708c3a3682c03003f13', gender: 0, id: 1862433, name: 'Dermot Murphy', order: 14, profile_path: '/20Qb4fqmk99jVLzXrXRPcF0Okqd.jpg' }, { cast_id: 39, character: 'Kenny Everett', credit_id: '5aea57b10e0a26291e002ba0', gender: 0, id: 1309365, name: 'Dickie Beau', order: 15, profile_path: '/o6DwlOtoXLOEJ1giqQLmswD1gsE.jpg' }, { cast_id: 92, character: 'Tim Staffell', credit_id: '5c2455700e0a264df2f291df', gender: 2, id: 209370, name: 'Jack Roth', order: 16, profile_path: '/xR17R9CAinKHyMNYeIfa2Y89jjK.jpg' }, { cast_id: 42, character: 'Mr. Austin', credit_id: '5aea58a30e0a2603fb000085', gender: 0, id: 2035000, name: 'Neil Fox-Roberts', order: 17, profile_path: '/v5bZwtHere2mUYQXi6onhC2AbN1.jpg' }, { cast_id: 57, character: 'Reinhold Mack', credit_id: '5b037fba925141095c0227d6', gender: 0, id: 2047866, name: 'Philip Andrew', order: 18, profile_path: '/wvFpqZHTFBScoMXg9OfInxHt5b8.jpg' }, { cast_id: 75, character: 'Cheryl', credit_id: '5bd7c4bfc3a3682142003569', gender: 0, id: 1547893, name: 'Jess Radomska', order: 19, profile_path: '/yH9mnfx9YeWGqt1VlYZSzdiwrpv.jpg' }, { cast_id: 58, character: 'Young Farrokh Bulsara', credit_id: '5b038012925141093101d3f6', gender: 0, id: 2047867, name: 'Adam Rauf', order: 20, profile_path: '/cosxDmUxnLIQApppy4fw2lfCDfC.jpg' }, { cast_id: 43, character: 'Larry Mullen Jr.', credit_id: '5aea5912925141103d000090', gender: 2, id: 2035001, name: 'Matthew Houston', order: 21, profile_path: '/fNfC3aeOPbkGx1NVOXIMvZla8MC.jpg' }, { cast_id: 44, character: 'Shelley Stern', credit_id: '5aea592f0e0a2603fe0000f8', gender: 1, id: 32248, name: 'Michelle Duncan', order: 22, profile_path: '/tjPBVMSO3r0B4DnQlB7KapR1D96.jpg' }, { cast_id: 63, character: 'Steve', credit_id: '5b03aea2c3a3686c8601db6c', gender: 0, id: 2047920, name: 'Scott Morrison Watson', order: 23, profile_path: null }, { cast_id: 59, character: 'Floor Manager', credit_id: '5b03ad710e0a2623ec022ea6', gender: 0, id: 2047917, name: 'Devlin Lloyd', order: 24, profile_path: '/oplrmWh1tPlD5cc7mA4pdr7GB3n.jpg' }, { cast_id: 60, character: 'Voice Doctor', credit_id: '5b03adce925141092301edfc', gender: 2, id: 95880, name: 'Garry Summers', order: 25, profile_path: '/nZOTh3KHeawcTCgvkIw7eUPKJXQ.jpg' }, { cast_id: 61, character: "Freddie's Lover", credit_id: '5b03ae519251410986029d44', gender: 0, id: 2047918, name: 'Matthew Fredricks', order: 26, profile_path: '/iqXXWvNgxr79lYqz6cK3ij6hKUS.jpg' }, { cast_id: 62, character: 'Video Producer', credit_id: '5b03ae5e0e0a2623cd0258f4', gender: 0, id: 2047919, name: 'Stefan Kopiecki', order: 27, profile_path: '/zD9Dw31m68uYkpJwDuL4IBi92hi.jpg' }, { cast_id: 64, character: 'Journalist', credit_id: '5b03aee9c3a3686c8c0310de', gender: 0, id: 2047921, name: 'Pat Lally', order: 28, profile_path: '/rCzh8B4zMWJNnPKMG3KLpeOtE5E.jpg' }, { cast_id: 65, character: "Freddie's Former Lover", credit_id: '5b03af969251412c2f00ab89', gender: 0, id: 2047922, name: 'Ian Jareth Williamson', order: 29, profile_path: '/z1OXgMlFhNBaUHYOymZFRupbiDF.jpg' }, { cast_id: 66, character: 'VIP Party Guest', credit_id: '5b03b3b40e0a2623c90244fc', gender: 1, id: 1898962, name: 'Johanna Thea', order: 30, profile_path: '/uDjPbp6FNRB0xjFxFmKTF4LLmJi.jpg' }, { cast_id: 67, character: 'Raver', credit_id: '5b03b3f70e0a2623da023b96', gender: 2, id: 1654744, name: 'Adam Lazarus', order: 31, profile_path: '/lSelvvvhc18H40rsjW64NwdlrWI.jpg' }, { cast_id: 70, character: 'Crowd Member (uncredited)', credit_id: '5b970d590e0a267274001438', gender: 2, id: 2056774, name: 'Peter Vo', order: 32, profile_path: null }, { cast_id: 72, character: 'NYC Meatpacker', credit_id: '5bd0b642c3a368041d0023a6', gender: 2, id: 1363049, name: 'Lasco Atkins', order: 33, profile_path: '/oBaR9wdTZTM5bF0QHVY28p00Nrf.jpg' }], crew: [{ credit_id: '5ab9ff039251414d3101091c', department: 'Writing', gender: 2, id: 1041394, job: 'Screenplay', name: 'Anthony McCarten', profile_path: '/sFiLWfBL5TIDc20De856Ww1NWIY.jpg' }, { credit_id: '5ab9ff2ac3a36871d6011e9e', department: 'Camera', gender: 2, id: 9040, job: 'Director of Photography', name: 'Newton Thomas Sigel', profile_path: '/mTauZZzOY0fhpNkNjeOeDHDk8xm.jpg' }, { credit_id: '5ab9ff85c3a36871dd00f452', department: 'Production', gender: 0, id: 195163, job: 'Producer', name: 'Jim Beach', profile_path: null }, { credit_id: '5ab9ff9fc3a36871d20116d7', department: 'Production', gender: 2, id: 380, job: 'Producer', name: 'Robert De Niro', profile_path: '/lvTSwUcvJRLAJ2FB5qFaukel516.jpg' }, { credit_id: '5ab9ffef9251414d2800fc60', department: 'Production', gender: 2, id: 16729, job: 'Producer', name: 'Graham King', profile_path: null }, { credit_id: '5aba001e0e0a26364b011207', department: 'Production', gender: 2, id: 9032, job: 'Producer', name: 'Bryan Singer', profile_path: '/to8mWJabPoWkphkbYKoutCVSj06.jpg' }, { credit_id: '5aba00590e0a26364e010295', department: 'Production', gender: 2, id: 928828, job: 'Producer', name: 'Brian May', profile_path: '/7CibTdvn857YostyYerwpg0Ln6m.jpg' }, { credit_id: '5aba009b0e0a26365701130c', department: 'Production', gender: 2, id: 76482, job: 'Executive Producer', name: "Denis O'Sullivan", profile_path: null }, { credit_id: '5aba010b9251414d370104f9', department: 'Production', gender: 1, id: 3305, job: 'Executive Producer', name: 'Jane Rosenthal', profile_path: '/27kF1hHoebcYfnUq2IvhTU45h9A.jpg' }, { credit_id: '5aba0139c3a36871cc00f3b7', department: 'Production', gender: 2, id: 376, job: 'Executive Producer', name: 'Arnon Milchan', profile_path: '/5crR5twLRcIdvRR06dB1O0EQ8x0.jpg' }, { credit_id: '5aba0165c3a36871dd00f5c9', department: 'Costume & Make-Up', gender: 0, id: 45058, job: 'Costume Design', name: 'Julian Day', profile_path: null }, { credit_id: '5aba01aec3a36871d201189e', department: 'Editing', gender: 2, id: 9039, job: 'Editor', name: 'John Ottman', profile_path: '/AlYg0cVHpwlTR4wY1iIy9gAsPKx.jpg' }, { credit_id: '5ad8ec61c3a3686b4700159c', department: 'Art', gender: 0, id: 1182907, job: 'Production Design', name: 'Aaron Haye', profile_path: null }, { credit_id: '5ad8ec6f0e0a2637260017b2', department: 'Art', gender: 0, id: 1320210, job: 'Supervising Art Director', name: 'David Hindle', profile_path: null }, { credit_id: '5ad8ec819251412cfc001707', department: 'Art', gender: 0, id: 1337394, job: 'Art Direction', name: 'Hannah Moseley', profile_path: null }, { credit_id: '5ad8ec8fc3a3686c620018a9', department: 'Art', gender: 0, id: 1578875, job: 'Art Direction', name: 'Alice Sutton', profile_path: null }, { credit_id: '5ad8ecd60e0a2636d3001a1b', department: 'Production', gender: 2, id: 958649, job: 'Co-Producer', name: 'Richard Hewitt', profile_path: null }, { credit_id: '5ad8ecf4c3a3686c0d001704', department: 'Production', gender: 0, id: 2026132, job: 'Producer', name: 'Peter Oberth', profile_path: null }, { credit_id: '5ad8ed3b9251412cff00177b', department: 'Production', gender: 2, id: 84530, job: 'Producer', name: 'Roger Taylor', profile_path: '/3C5ESBpvXtbhfFFFcqMESBUcvmI.jpg' }, { credit_id: '5afbbe09c3a36807210037f2', department: 'Sound', gender: 2, id: 928828, job: 'Music Producer', name: 'Brian May', profile_path: '/7CibTdvn857YostyYerwpg0Ln6m.jpg' }, { credit_id: '5afbbe1bc3a36807210037ff', department: 'Sound', gender: 2, id: 84530, job: 'Music Producer', name: 'Roger Taylor', profile_path: '/3C5ESBpvXtbhfFFFcqMESBUcvmI.jpg' }, { credit_id: '5afbbe390e0a26343d002f60', department: 'Sound', gender: 0, id: 1640828, job: 'Music Supervisor', name: 'Becky Bentham', profile_path: null }, { credit_id: '5afbbef692514107a6002aa9', department: 'Writing', gender: 2, id: 15730, job: 'Story', name: 'Peter Morgan', profile_path: '/gxmjM2MQ2HmGPKHrbkqBrl1ZXaH.jpg' }, { credit_id: '5afbbf03c3a368071e0044ff', department: 'Writing', gender: 2, id: 1041394, job: 'Story', name: 'Anthony McCarten', profile_path: '/sFiLWfBL5TIDc20De856Ww1NWIY.jpg' }, { credit_id: '5afbbf869251410766002b30', department: 'Production', gender: 1, id: 1302, job: 'Casting', name: 'Susie Figgis', profile_path: null }, { credit_id: '5afbbfe1925141078500302b', department: 'Art', gender: 0, id: 67204, job: 'Set Decoration', name: 'Anna Lynch-Robinson', profile_path: null }, { credit_id: '5afbc0070e0a263463002e14', department: 'Directing', gender: 0, id: 1816355, job: 'Third Assistant Director', name: 'Claire Frayn', profile_path: null }, { credit_id: '5afbc0300e0a26343a002f0c', department: 'Directing', gender: 2, id: 1813983, job: 'First Assistant Director', name: 'Jack Ravenscroft', profile_path: null }, { credit_id: '5b037e8c0e0a2623c9021b14', department: 'Sound', gender: 2, id: 9039, job: 'Original Music Composer', name: 'John Ottman', profile_path: '/AlYg0cVHpwlTR4wY1iIy9gAsPKx.jpg' }, { credit_id: '5b200345c3a36813b90023c9', department: 'Production', gender: 2, id: 974, job: 'Executive Producer', name: 'Dexter Fletcher', profile_path: '/did9anJiAFYvTbeQyNZaxts7GaT.jpg' }, { credit_id: '5bdf31e30e0a26057902a1fb', department: 'Directing', gender: 2, id: 9032, job: 'Director', name: 'Bryan Singer', profile_path: '/to8mWJabPoWkphkbYKoutCVSj06.jpg' }, { credit_id: '5bebf417c3a3685c08007adf', department: 'Sound', gender: 0, id: 1337408, job: 'Sound Effects Editor', name: 'Alistair Hawkins', profile_path: null }, { credit_id: '5bebf42d0e0a266aa9006d9c', department: 'Sound', gender: 0, id: 999561, job: 'Sound Effects Editor', name: 'Andy Kennedy', profile_path: null }, { credit_id: '5bebf444925141024b006329', department: 'Sound', gender: 0, id: 1312810, job: 'Sound Effects Editor', name: 'Alastair Sirkett', profile_path: null }, { credit_id: '5bebf45dc3a3685c00006a71', department: 'Sound', gender: 0, id: 1337411, job: 'Supervising Sound Editor', name: 'John Warhurst', profile_path: null }, { credit_id: '5bebf4ab92514102530060ec', department: 'Sound', gender: 0, id: 113073, job: 'Sound Re-Recording Mixer', name: 'Paul Massey', profile_path: null }, { credit_id: '5bebf4cf0e0a266a9e006b7d', department: 'Visual Effects', gender: 0, id: 1447622, job: 'Visual Effects Producer', name: 'Jenny Basen', profile_path: null }, { credit_id: '5bebf4e10e0a266aa5007336', department: 'Visual Effects', gender: 0, id: 1394011, job: 'Visual Effects Producer', name: 'Tim Field', profile_path: null }, { credit_id: '5bebf4f50e0a266a9e006bb3', department: 'Visual Effects', gender: 0, id: 1337415, job: 'Visual Effects Producer', name: 'Carl Grinter', profile_path: null }, { credit_id: '5bebf506c3a3685bfe0069bf', department: 'Visual Effects', gender: 0, id: 1394101, job: 'Visual Effects Producer', name: 'Becky Roberts', profile_path: null }, { credit_id: '5bebf523925141025c006861', department: 'Visual Effects', gender: 0, id: 1338227, job: 'Visual Effects Supervisor', name: 'Paul Norris', profile_path: null }, { credit_id: '5bebf7980e0a266a9e006e9a', department: 'Costume & Make-Up', gender: 0, id: 72240, job: 'Costume Supervisor', name: 'Sian Evans', profile_path: null }, { credit_id: '5bebf7ba925141025300646f', department: 'Art', gender: 0, id: 2175479, job: 'Assistant Art Director', name: 'Charlotte Hutchings', profile_path: null }, { credit_id: '5bebf7e1c3a3685c08007f73', department: 'Art', gender: 0, id: 2175480, job: 'Assistant Art Director', name: 'Olly Williams', profile_path: null }] },
      movieImages: [{ aspect_ratio: 0.6666666666666666, file_path: '/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg', height: 3000, iso_639_1: 'en', vote_average: 5.766, vote_count: 10, width: 2000 }, { aspect_ratio: 0.6666666666666666, file_path: '/bAjrW8O01W1q1HOquQXxfcsMByX.jpg', height: 3000, iso_639_1: 'en', vote_average: 5.52, vote_count: 8, width: 2000 }, { aspect_ratio: 0.6666666666666666, file_path: '/jRZTdUz1D5DuWHR6wZpG90ahmc.jpg', height: 3000, iso_639_1: 'en', vote_average: 5.384, vote_count: 2, width: 2000 }, { aspect_ratio: 0.6666666666666666, file_path: '/rxrRnl0pD4bEOh4xErdZuEkhr5s.jpg', height: 3000, iso_639_1: 'en', vote_average: 5.246, vote_count: 2, width: 2000 }, { aspect_ratio: 0.6666666666666666, file_path: '/gbmkFWdtihe1VfydTDsieQ6VfGL.jpg', height: 3000, iso_639_1: 'en', vote_average: 5.18, vote_count: 3, width: 2000 }, { aspect_ratio: 0.6666666666666666, file_path: '/mJiCdzaj55vmCgAwfLplbAaSYM5.jpg', height: 1500, iso_639_1: 'en', vote_average: 5.118, vote_count: 4, width: 1000 }, { aspect_ratio: 0.6666666666666666, file_path: '/7fcYIxmXyZm0xV0sHYV2GNN9i3v.jpg', height: 1935, iso_639_1: 'en', vote_average: 5.01, vote_count: 8, width: 1290 }, { aspect_ratio: 0.666, file_path: '/aRpNd9Bg7iqz1F9bG0RsiXRsYH6.jpg', height: 1000, iso_639_1: 'en', vote_average: 0, vote_count: 0, width: 666 }],
      recommendedMovies: [{ adult: false, backdrop_path: '/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg', genre_ids: [18, 10402, 10749], id: 332562, original_language: 'en', original_title: 'A Star Is Born', overview: "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer—until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.", poster_path: '/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg', release_date: '2018-10-03', title: 'A Star Is Born', video: false, vote_average: 7.5, vote_count: 2658, popularity: 201.407 }, { adult: false, backdrop_path: '/wDN3FIcQQ1HI7mz1OOKYHSQtaiE.jpg', genre_ids: [10751, 14, 12], id: 338952, original_language: 'en', original_title: 'Fantastic Beasts: The Crimes of Grindelwald', overview: 'Gellert Grindelwald has escaped imprisonment and has begun gathering followers to his cause—elevating wizards above all non-magical beings. The only one capable of putting a stop to him is the wizard he once called his closest friend, Albus Dumbledore. However, Dumbledore will need to seek help from the wizard who had thwarted Grindelwald once before, his former student Newt Scamander, who agrees to help, unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.', poster_path: '/kQKcbJ9uYkTQql2R8L4jTUz7l90.jpg', release_date: '2018-11-14', title: 'Fantastic Beasts: The Crimes of Grindelwald', video: false, vote_average: 6.9, vote_count: 2969, popularity: 111.493 }, { id: 369972, video: false, vote_count: 1316, vote_average: 7.1, title: 'First Man', release_date: '2018-10-11', original_language: 'en', original_title: 'First Man', genre_ids: [18, 36], backdrop_path: '/z1FkoHO7bz40S4JiptWHSYoPpxq.jpg', adult: false, overview: 'A look at the life of the astronaut, Neil Armstrong, and the legendary space mission that led him to become the first man to walk on the Moon on July 20, 1969.', poster_path: '/i91mfvFcPPlaegcbOyjGgiWfZzh.jpg', popularity: 112.212 }, { adult: false, backdrop_path: '/gMVdhfQ7q9DFHhDkehrququjGPd.jpg', genre_ids: [80, 18], id: 487558, original_language: 'en', original_title: 'BlacKkKlansman', overview: 'Colorado Springs, late 1970s. Ron Stallworth, an African American police officer, and Flip Zimmerman, his Jewish colleague, run an undercover operation to infiltrate the Ku Klux Klan.', poster_path: '/55W6mUVv4CXMMQHHhV2zXtLSpXQ.jpg', release_date: '2018-07-30', title: 'BlacKkKlansman', video: false, vote_average: 7.5, vote_count: 1587, popularity: 54.194 }, { adult: false, backdrop_path: '/mabuNsGJgRuCTuGqjFkWe1xdu19.jpg', genre_ids: [28, 12, 16, 10751], id: 260513, original_language: 'en', original_title: 'Incredibles 2', overview: 'Elastigirl springs into action to save the day, while Mr. Incredible faces his greatest challenge yet – taking care of the problems of his three children.', poster_path: '/9lFKBtaVIhP7E2Pk0IY1CwTKTMZ.jpg', release_date: '2018-06-14', title: 'Incredibles 2', video: false, vote_average: 7.6, vote_count: 4741, popularity: 69.881 }, { adult: false, backdrop_path: '/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg', genre_ids: [878], id: 335983, original_language: 'en', original_title: 'Venom', overview: 'Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote. Soon, he must rely on his newfound powers to protect the world from a shadowy organization looking for a symbiote of their own.', poster_path: '/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg', release_date: '2018-09-28', title: 'Venom', video: false, vote_average: 6.6, vote_count: 4366, popularity: 122.246 }, { id: 324857, video: false, vote_count: 1196, vote_average: 8.5, title: 'Spider-Man: Into the Spider-Verse', release_date: '2018-12-07', original_language: 'en', original_title: 'Spider-Man: Into the Spider-Verse', genre_ids: [28, 12, 16, 35, 878], backdrop_path: '/shROD2YqREzo4TuonTsTVnnjpPC.jpg', adult: false, overview: 'Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson "Kingpin" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.', poster_path: '/laMM4lpQSh5z6KIBPwWogkjzBVQ.jpg', popularity: 186.132 }, { id: 297802, video: false, vote_count: 2648, vote_average: 6.9, title: 'Aquaman', release_date: '2018-12-07', original_language: 'en', original_title: 'Aquaman', genre_ids: [28, 12, 14, 878], backdrop_path: '/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg', adult: false, overview: 'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.', poster_path: '/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg', popularity: 300.504 }, { adult: false, backdrop_path: '/8HKwxHZ23sW8wz4yb28IWnAM1M6.jpg', genre_ids: [35, 10749], id: 458423, original_language: 'en', original_title: 'Mamma Mia! Here We Go Again', overview: 'Five years after meeting her three fathers, Sophie Sheridan prepares to open her mother’s hotel. In 1979, young Donna Sheridan meets the men who each could be Sophie’s biological father.', poster_path: '/vzI4gNJDUwWgmNDSBWxYoeGkIEY.jpg', release_date: '2018-07-09', title: 'Mamma Mia! Here We Go Again', video: false, vote_average: 7.3, vote_count: 1301, popularity: 30.834 }, { adult: false, backdrop_path: '/6P3c80EOm7BodndGBUAJHHsHKrp.jpg', genre_ids: [28, 12, 878, 35, 10751], id: 363088, original_language: 'en', original_title: 'Ant-Man and the Wasp', overview: 'Just when his time under house arrest is about to end, Scott Lang once again puts his freedom at risk to help Hope van Dyne and Dr. Hank Pym dive into the quantum realm and try to accomplish, against time and any chance of success, a very dangerous rescue mission.', poster_path: '/rv1AWImgx386ULjcf62VYaW8zSt.jpg', release_date: '2018-07-04', title: 'Ant-Man and the Wasp', video: false, vote_average: 7, vote_count: 4428, popularity: 59.883 }, { adult: false, backdrop_path: '/q7fXcrDPJcf6t3rzutaNwTzuKP1.jpg', genre_ids: [12, 878], id: 333339, original_language: 'en', original_title: 'Ready Player One', overview: 'When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.', poster_path: '/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg', release_date: '2018-03-28', title: 'Ready Player One', video: false, vote_average: 7.7, vote_count: 5658, popularity: 37.305 }, { adult: false, backdrop_path: '/rgyhSn3mINvkuy9iswZK0VLqQO3.jpg', genre_ids: [18, 14, 10749], id: 399055, original_language: 'en', original_title: 'The Shape of Water', overview: 'An other-worldly story, set against the backdrop of Cold War era America circa 1962, where a mute janitor working at a lab falls in love with an amphibious man being held captive there and devises a plan to help him escape.', poster_path: '/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg', release_date: '2017-12-01', title: 'The Shape of Water', video: false, vote_average: 7.3, vote_count: 6291, popularity: 29.484 }, { adult: false, backdrop_path: '/gb3TVVZNNxVGNfS1NxGaiWZfwnW.jpg', genre_ids: [53, 80, 9648, 18], id: 446021, original_language: 'en', original_title: 'Bad Times at the El Royale', overview: 'Lake Tahoe, 1969. Seven strangers, each one with a secret to bury, meet at El Royale, a decadent motel with a dark past. In the course of a fateful night, everyone will have one last shot at redemption.', poster_path: '/iNtFgXqXPRMkm1QO8CHn5sHfUgE.jpg', release_date: '2018-10-04', title: 'Bad Times at the El Royale', video: false, vote_average: 6.8, vote_count: 744, popularity: 55.126 }, { id: 383498, video: false, vote_count: 7107, vote_average: 7.5, title: 'Deadpool 2', release_date: '2018-05-15', original_language: 'en', original_title: 'Deadpool 2', genre_ids: [28, 12, 35], backdrop_path: '/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg', adult: false, overview: "Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.", poster_path: '/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg', popularity: 61.739 }, { adult: false, backdrop_path: '/cwiJQXezWz876K3jS57Sq56RYCZ.jpg', genre_ids: [14, 10751, 35], id: 400650, original_language: 'en', original_title: 'Mary Poppins Returns', overview: "In Depression-era London, a now-grown Jane and Michael Banks, along with Michael's three children, are visited by the enigmatic Mary Poppins following a personal loss. Through her unique magical skills, and with the aid of her friend Jack, she helps the family rediscover the joy and wonder missing in their lives.", poster_path: '/uTVGku4LibMGyKgQvjBtv3OYfAX.jpg', release_date: '2018-12-19', title: 'Mary Poppins Returns', video: false, vote_average: 6.8, vote_count: 641, popularity: 178.284 }, { adult: false, backdrop_path: '/tmsddF6G7vIbJ2Lg6DZDVbnhBxs.jpg', genre_ids: [878, 9648, 18, 53, 10770], id: 569547, original_language: 'en', original_title: 'Black Mirror: Bandersnatch', overview: 'In 1984, a young programmer begins to question reality as he adapts a dark fantasy novel into a video game. A mind-bending tale with multiple endings.', poster_path: '/fR0VZ0VE598zl1lrYf7IfBqEwQ2.jpg', release_date: '2018-12-28', title: 'Black Mirror: Bandersnatch', video: false, vote_average: 7.3, vote_count: 1106, popularity: 37.134 }, { adult: false, backdrop_path: '/A4xNxrRodvXzJWJs2GbBKo1IBk2.jpg', genre_ids: [53, 18, 878, 27], id: 405774, original_language: 'en', original_title: 'Bird Box', overview: "When a mysterious force decimates the world’s population, only one thing is certain: if you see it, you take your life. Facing the unknown, Malorie finds love, hope and a new beginning only for it to unravel. Now she must flee with her two children down a treacherous river to the one place left that may offer sanctuary. But to survive, they'll have to undertake the perilous two-day journey blindfolded.", poster_path: '/rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg', release_date: '2018-12-13', title: 'Bird Box', video: false, vote_average: 7.1, vote_count: 3036, popularity: 159.062 }, { adult: false, backdrop_path: '/bJLJAtGjBj836UjJZNOwgrfe5Ps.jpg', genre_ids: [80, 18], id: 359940, original_language: 'en', original_title: 'Three Billboards Outside Ebbing, Missouri', overview: "After seven months have passed without a culprit in her daughter's murder case, Mildred Hayes makes a bold move, painting three signs leading into her town with a controversial message directed at Bill Willoughby, the town's revered chief of police. When his second-in-command Officer Jason Dixon, an immature mother's boy with a penchant for violence, gets involved, the battle between Mildred and Ebbing's law enforcement is only exacerbated.", poster_path: '/vgvw6w1CtcFkuXXn004S5wQsHRl.jpg', release_date: '2017-11-10', title: 'Three Billboards Outside Ebbing, Missouri', video: false, vote_average: 8.2, vote_count: 4685, popularity: 22.214 }, { adult: false, backdrop_path: '/64OtTrXNyLwbqWBcd9JBsJmZb7w.jpg', genre_ids: [10749, 18], id: 398818, original_language: 'en', original_title: 'Call Me by Your Name', overview: 'Elio Perlman is spending the summer with his family at their vacation home in Lombardy, Italy. When his father hires a handsome doctoral student, the curious 17-year-old finds himself developing a growing attraction to the young man.', poster_path: '/nPTjj6ZfBXXBwOhd7iUy6tyuKWt.jpg', release_date: '2017-09-01', title: 'Call Me by Your Name', video: false, vote_average: 8.3, vote_count: 4101, popularity: 27.161 }, { adult: false, backdrop_path: '/bJekWFxi4FwojQbKfTaW3iCAMhL.jpg', genre_ids: [28, 12, 878], id: 348350, original_language: 'en', original_title: 'Solo: A Star Wars Story', overview: 'Through a series of daring escapades deep within a dark and dangerous criminal underworld, Han Solo meets his mighty future copilot Chewbacca and encounters the notorious gambler Lando Calrissian.', poster_path: '/3IGbjc5ZC5yxim5W0sFING2kdcz.jpg', release_date: '2018-05-15', title: 'Solo: A Star Wars Story', video: false, vote_average: 6.6, vote_count: 2985, popularity: 50.347 }],
      similarMovies: [{ adult: false, backdrop_path: '/wCHJuJwEfOrrykgDas8T4m79Bzs.jpg', genre_ids: [35, 18, 36], id: 369192, original_language: 'en', original_title: 'Battle of the Sexes', overview: 'The true story of the 1973 tennis match between World number one Billie Jean King and ex-champ and serial hustler Bobby Riggs.', poster_path: '/fWy0A3VojTCb0S2MKtEJjpquubF.jpg', release_date: '2017-09-05', title: 'Battle of the Sexes', video: false, vote_average: 6.9, vote_count: 925, popularity: 12.436 }, { adult: false, backdrop_path: '/i8NcYenVqMzB95pVz8YOPIqmGj8.jpg', genre_ids: [18, 36], id: 10139, original_language: 'en', original_title: 'Milk', overview: "The story of California's first openly gay elected official, Harvey Milk, who  became an outspoken agent for change, seeking equal rights and opportunities for all. His great love for the city and its people brought him backing from young and old, straight and gay, alike – at a time when prejudice and violence against gays was openly accepted as the norm.", poster_path: '/sFYmJJSVXqfqPI79tx4UG4IR5Jb.jpg', release_date: '2008-11-26', title: 'Milk', video: false, vote_average: 7.3, vote_count: 1033, popularity: 11.315 }, { adult: false, backdrop_path: '/3hGRV0xR11aUxCGAJ52F8MTxrno.jpg', genre_ids: [18, 36], id: 152532, original_language: 'en', original_title: 'Dallas Buyers Club', overview: 'Loosely based on the true-life tale of Ron Woodroof, a drug-taking, women-loving, homophobic man who in 1986 was diagnosed with HIV/AIDS and given thirty days to live.', poster_path: '/nxJFUxDRP9qQCiyD5sH24N5SCSu.jpg', release_date: '2013-11-17', title: 'Dallas Buyers Club', video: false, vote_average: 7.9, vote_count: 4524, popularity: 16.029 }, { adult: false, backdrop_path: '/iVk4mVKwNE66JbBcoDwcYFvuUXM.jpg', genre_ids: [18, 53], id: 68734, original_language: 'en', original_title: 'Argo', overview: "As the Iranian revolution reaches a boiling point, a CIA 'exfiltration' specialist concocts a risky plan to free six Americans who have found shelter at the home of the Canadian ambassador.", poster_path: '/oai3xLBQHpIh18VJdRCcL7D0Yg0.jpg', release_date: '2012-10-11', title: 'Argo', video: false, vote_average: 7.2, vote_count: 4790, popularity: 13.538 }, { adult: false, backdrop_path: '/rqMEeajyzSF4PpJtdCB816Iz8Vr.jpg', genre_ids: [35, 18, 10749], id: 449176, original_language: 'en', original_title: 'Love, Simon', overview: "Everyone deserves a great love story. But for seventeen-year old Simon Spier it's a little more complicated: he's yet to tell his family or friends he's gay and he doesn't know the identity of the anonymous classmate he's fallen for online.", poster_path: '/5YUYg5q7QfC4IoNwNUtiwdiYKPr.jpg', release_date: '2018-02-16', title: 'Love, Simon', video: false, vote_average: 8.2, vote_count: 2582, popularity: 23.009 }, { adult: false, backdrop_path: '/yp6JNRU4PQEeWAVbTKG2E8pYGiP.jpg', genre_ids: [80, 18, 36, 53], id: 339103, original_language: 'en', original_title: 'Gotti', overview: 'John Gotti rises to the top of the New York underworld to become the boss of the Gambino crime family. His life takes a tumultuous turn as he faces tragedy, multiple trials and a prison sentence.', poster_path: '/6vdCoMp68u6JbnlqeXEvxrTNPSm.jpg', release_date: '2018-06-14', title: 'Gotti', video: false, vote_average: 5.3, vote_count: 180, popularity: 21.954 }, { adult: false, backdrop_path: '/tq5Dq9IvXlag9iOdqoMWDx9cw7z.jpg', genre_ids: [18, 10752, 53], id: 467952, original_language: 'en', original_title: 'The Catcher Was a Spy', overview: 'Major league baseball player, Moe Berg, lives a double life working for the Office of Strategic Services.', poster_path: '/eF6LubTEp1KI6NXUP2o5G4g9AOP.jpg', release_date: '2018-06-22', title: 'The Catcher Was a Spy', video: false, vote_average: 6.3, vote_count: 48, popularity: 18.054 }, { adult: false, backdrop_path: '/4srcbGDQhvKh9g3Z7nezvGfZXTI.jpg', genre_ids: [80, 18, 36, 10749], id: 481117, original_language: 'en', original_title: 'The Brawler', overview: 'The true story of underdog boxer, Chuck Wepner, who gets a shot to fight the champ, Muhammed Ali.', poster_path: '/gZYwhYAsImnd58QJs1F3cPC7UcF.jpg', release_date: '2019-01-18', title: 'The Brawler', video: false, vote_average: 0, vote_count: 0, popularity: 23.18 }, { adult: false, backdrop_path: '/qcb6z1HpokTOKdjqDTsnjJk0Xvg.jpg', genre_ids: [36, 18, 53, 10752], id: 205596, original_language: 'en', original_title: 'The Imitation Game', overview: "Based on the real life story of legendary cryptanalyst Alan Turing, the film portrays the nail-biting race against time by Turing and his brilliant team of code-breakers at Britain's top-secret Government Code and Cypher School at Bletchley Park, during the darkest days of World War II.", poster_path: '/noUp0XOqIcmgefRnRZa1nhtRvWO.jpg', release_date: '2014-11-14', title: 'The Imitation Game', video: false, vote_average: 8.1, vote_count: 9516, popularity: 28.926 }, { adult: false, backdrop_path: '/2ePViXIOnifrugvnjlFxzmvjwKL.jpg', genre_ids: [18], id: 472451, original_language: 'en', original_title: 'Boy Erased', overview: 'Jared, the son of a Baptist pastor in a small American town, is outed to his parents at age 19. Jared is faced with an ultimatum: attend a gay conversion therapy program – or be permanently exiled and shunned by his family, friends, and faith.', poster_path: '/29nwMbH6wAjpFdQD3sxztOV5P5x.jpg', release_date: '2018-11-02', title: 'Boy Erased', video: false, vote_average: 7.4, vote_count: 51, popularity: 30.617 }, { adult: false, backdrop_path: '/ekWMoBZ4B9rM60INZEh5FAD2HFR.jpg', genre_ids: [18, 36, 35], id: 375262, original_language: 'en', original_title: 'The Favourite', overview: "In 18th century England, the close relationship between Queen Anne and Sarah Churchill is threatened by the arrival of Sarah's cousin, Abigail Hill, resulting in a bitter rivalry between the two cousins to be the Queen's favourite.", poster_path: '/4hgPWxYeGWtTEx9BPhUo99wj77z.jpg', release_date: '2018-11-20', title: 'The Favourite', video: false, vote_average: 7.6, vote_count: 208, popularity: 70.13 }, { adult: false, backdrop_path: '/zBK4QZONMQXhcgaJv1YYTdCW7q9.jpg', genre_ids: [18, 36, 10752], id: 324786, original_language: 'en', original_title: 'Hacksaw Ridge', overview: 'WWII American Army Medic Desmond T. Doss, who served during the Battle of Okinawa, refuses to kill people and becomes the first Conscientious Objector in American history to receive the Congressional Medal of Honor.', poster_path: '/bndiUFfJxNd2fYx8XO610L9a07m.jpg', release_date: '2016-10-07', title: 'Hacksaw Ridge', video: false, vote_average: 8, vote_count: 5999, popularity: 18.901 }, { adult: false, backdrop_path: '/itdm9wqCo03NZ3CGSz5P7eiMo68.jpg', genre_ids: [18, 27, 80, 53], id: 398173, original_language: 'en', original_title: 'The House That Jack Built', overview: "Failed architect, engineer and vicious murderer Jack tells Verge the details of some of his most elaborately orchestrated crimes, each of them a towering piece of art that defines his life's work as a serial killer for twelve years.", poster_path: '/pMabi1PjsVtHrHRf4S8yzdUTIWC.jpg', release_date: '2018-10-08', title: 'The House That Jack Built', video: false, vote_average: 7.2, vote_count: 289, popularity: 55.699 }, { adult: false, backdrop_path: '/64OtTrXNyLwbqWBcd9JBsJmZb7w.jpg', genre_ids: [10749, 18], id: 398818, original_language: 'en', original_title: 'Call Me by Your Name', overview: 'Elio Perlman is spending the summer with his family at their vacation home in Lombardy, Italy. When his father hires a handsome doctoral student, the curious 17-year-old finds himself developing a growing attraction to the young man.', poster_path: '/nPTjj6ZfBXXBwOhd7iUy6tyuKWt.jpg', release_date: '2017-09-01', title: 'Call Me by Your Name', video: false, vote_average: 8.3, vote_count: 4101, popularity: 27.161 }, { id: 369972, video: false, vote_count: 1316, vote_average: 7.1, title: 'First Man', release_date: '2018-10-11', original_language: 'en', original_title: 'First Man', genre_ids: [18, 36], backdrop_path: '/z1FkoHO7bz40S4JiptWHSYoPpxq.jpg', adult: false, overview: 'A look at the life of the astronaut, Neil Armstrong, and the legendary space mission that led him to become the first man to walk on the Moon on July 20, 1969.', poster_path: '/i91mfvFcPPlaegcbOyjGgiWfZzh.jpg', popularity: 112.212 }, { id: 1420, video: false, vote_count: 127, vote_average: 7.3, title: 'Breakfast on Pluto', release_date: '2005-09-03', original_language: 'en', original_title: 'Breakfast on Pluto', genre_ids: [35, 18], backdrop_path: '/3Mn05BZJvD0vrKpMAkHoZYYgHA1.jpg', adult: false, overview: "In the 1970s, a foundling lad, Patrick \"Kitten\" Braden, comes of age by leaving his Irish town for London, in part to look for his mother and in part because his trans-gender nature is beyond the town's understanding.", poster_path: '/14tmdb1PiLNDZf3VD29S2nUKVV0.jpg', popularity: 7.413 }, { adult: false, backdrop_path: '/sw7mordbZxgITU877yTpZCud90M.jpg', genre_ids: [18, 80], id: 769, original_language: 'en', original_title: 'GoodFellas', overview: 'The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.', poster_path: '/hAPeXBdGDGmXRPj4OZZ0poH65Iu.jpg', release_date: '1990-09-12', title: 'GoodFellas', video: false, vote_average: 8.4, vote_count: 5088, popularity: 19.327 }, { id: 524, video: false, vote_count: 2208, vote_average: 7.9, title: 'Casino', release_date: '1995-11-22', original_language: 'en', original_title: 'Casino', genre_ids: [80, 18], backdrop_path: '/eP41pD4YfyVOjdpEaTmoNrL9DGx.jpg', adult: false, overview: "In early-1970s Las Vegas, low-level mobster Sam \"Ace\" Rothstein gets tapped by his bosses to head the Tangiers Casino. At first, he's a great success in the job, but over the years, problems with his loose-cannon enforcer Nicky Santoro, his ex-hustler wife Ginger, her con-artist ex Lester Diamond and a handful of corrupt politicians put Sam in ever-increasing danger.", poster_path: '/jC0dqpkRMwh3A1X2PHahTxOaLbp.jpg', popularity: 14.657 }, { adult: false, backdrop_path: '/2kY390rVe8EXXOwl7XZ5yMRqxr4.jpg', genre_ids: [18, 53], id: 385360, original_language: 'en', original_title: 'Billionaire Boys Club', overview: 'A group of wealthy boys in Los Angeles during the early 1980s establishes a get rich quick scam that turns deadly.', poster_path: '/cD9wZROHhM3iP0IOWOunzmDA6v8.jpg', release_date: '2018-07-19', title: 'Billionaire Boys Club', video: false, vote_average: 5.5, vote_count: 89, popularity: 20.356 }, { adult: false, backdrop_path: '/1ytaxWeVHDYtb7KPkrn3GNtDJdF.jpg', genre_ids: [18], id: 376867, original_language: 'en', original_title: 'Moonlight', overview: 'The tender, heartbreaking story of a young man’s struggle to find himself, told across three defining chapters in his life as he experiences the ecstasy, pain, and beauty of falling in love, while grappling with his own sexuality.', poster_path: '/qAwFbszz0kRyTuXmMeKQZCX3Q2O.jpg', release_date: '2016-10-21', title: 'Moonlight', video: false, vote_average: 7.3, vote_count: 3456, popularity: 13.798 }],
      favoriteMovies: [{ adult: false, backdrop_path: '/juc9wt7Eh2IarLL5S1yQ1a21O1A.jpg', genre_ids: [16, 10751, 35, 14], id: 360920, original_language: 'en', original_title: 'The Grinch', overview: 'The Grinch hatches a scheme to ruin Christmas when the residents of Whoville plan their annual holiday celebration.', poster_path: '/lCfKAAFyANPFn04xOPqazd8jwnc.jpg', release_date: '2018-11-08', title: 'The Grinch', video: false, vote_average: 6.3, vote_count: 603, popularity: 41.853 }],
    };

    getters = {
      getMovieDetails: state => state.movieDetails,
      getMovieCredits: state => state.movieCredits,
      getMovieImages: state => state.movieImages,
      getSimilarMovies: state => state.similarMovies,
      getRecommendedMovies: state => state.recommendedMovies,
      getFavoriteMovies: state => state.favoriteMovies,
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
    vm = shallowMount(MoviePage, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  describe('test "beforeRouteEnter" hook', () => {
    it('hook work correctly', async () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      MoviePage.beforeRouteEnter(undefined, undefined, actions.next);
      expect(actions.next).toHaveBeenCalled();
    });
  });

  // describe('test "beforeRouteUpdate" hook', () => {
  //   it('hook work correctly', async () => {
  //     vm = shallowMount(MoviePage, {
  //       store,
  //       localVue,
  //       router,
  //     }).vm;
  //     MoviePage.beforeRouteUpdate(undefined, undefined, actions.next);
  //     expect(actions.next).toHaveBeenCalled();
  //   });
  // });

  describe('test "getBackgroundPath" computed', () => {
    it('return src correctly if poster exists', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      expect(vm.getBackgroundPath).toEqual('https://image.tmdb.org/t/p/w780//pbXgLEYh8rlG2Km5IGZPnhcnuSz.jpg');
    });

    it('return placeholder if backdrop doest exist', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails = [];
      expect(vm.getBackgroundPath).toEqual('/static/img/content/backdrop-default.jpg');
    });
  });

  describe('test "getImageSrc" computed', () => {
    it('return src correctly if poster exists', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      expect(vm.getImageSrc).toEqual('https://image.tmdb.org/t/p/w185//lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg');
    });

    it('return placeholder if poster doest exist', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails = [];
      expect(vm.getImageSrc).toEqual('/static/img/content/image-not-found.svg');
    });
  });

  describe('test "getChartColor" computed', () => {
    it('return green if average vote >= 8', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails.vote_average = 8;
      expect(vm.getChartColor).toEqual('green');
    });

    it('return orange if average vote >= 4', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails.vote_average = 4;
      expect(vm.getChartColor).toEqual('orange');
    });

    it('return red if average vote >= 0', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails.vote_average = 0;
      expect(vm.getChartColor).toEqual('red');
    });

    it('return green by dafault', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails.vote_average = undefined;
      expect(vm.getChartColor).toEqual('green');
    });
  });

  describe('test "getFavoriteMovies" computed', () => {
    it('return movies correctly', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      expect(vm.getFavoriteMovies).toEqual([{ adult: false, backdrop_path: '/juc9wt7Eh2IarLL5S1yQ1a21O1A.jpg', genre_ids: [16, 10751, 35, 14], id: 360920, original_language: 'en', original_title: 'The Grinch', overview: 'The Grinch hatches a scheme to ruin Christmas when the residents of Whoville plan their annual holiday celebration.', poster_path: '/lCfKAAFyANPFn04xOPqazd8jwnc.jpg', release_date: '2018-11-08', title: 'The Grinch', video: false, vote_average: 6.3, vote_count: 603, popularity: 41.853 }]);
    });
  });

  describe('test "isFavorite" computed', () => {
    it('return false if film isnt favorite', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails.id = 0;
      expect(vm.isFavorite).toEqual(false);
    });

    it('return true if film is favorite', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails.id = 360920;
      expect(vm.isFavorite).toEqual(true);
    });
  });

  describe('test "getFavoriteText" computed', () => {
    it('return "Remove" if favorite', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails.id = 360920;
      expect(vm.getFavoriteText).toEqual('Remove');
    });

    it('return "Add to favorite" if not favorite', () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      state.movieDetails.id = 0;
      expect(vm.getFavoriteText).toEqual('Add to favorite');
    });
  });

  describe('test "markMovieAsFavorite" computed', () => {
    it('Mark as favorite if film isnt in favorite list', async () => {
      vm = shallowMount(MoviePage, {
        store,
        localVue,
        router,
      }).vm;
      vm.markMovieAsFavorite();
      expect(await actions.markMovieAsFavorite).toHaveBeenCalled();
      expect(actions.fetchFavoriteMovies).toHaveBeenCalled();
    });
  });
});
