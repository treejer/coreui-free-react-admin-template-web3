// sidebar.js
// Action types
export const SET_SIDEBAR_SHOW = 'SET_SIDEBAR_SHOW';

// Action creators
export const setSidebarShow = (show) => ({
  type: SET_SIDEBAR_SHOW,
  payload: show,
});

// Initial state
const initialState = {
  sidebarShow: true,
};

// Reducer
const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: action.payload,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
