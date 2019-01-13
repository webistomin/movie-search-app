import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '../../src/App'

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('App.vue', () => {
  let actions;
  let store;
  let router;

  beforeEach(() => {
    actions = {
      fetchTweets: jest.fn(),
      fetchGenresList: jest.fn(),
      fetchRequestToken: jest.fn(),
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
    router = new VueRouter()
  })

  it('вызывает "Фетч твитов", при создании', () => {
    const wrapper = shallowMount(App, { store, router, localVue })
    expect(actions.fetchTweets).toHaveBeenCalled()
    expect(actions.fetchGenresList).toHaveBeenCalled()
    expect(actions.fetchRequestToken).toHaveBeenCalled()
  })
})
