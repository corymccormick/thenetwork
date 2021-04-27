import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  posts: [],
  activeProfile: {},
  sponser: []
  // currentPage: 1
  // FIXME Add Newer and Older
})
