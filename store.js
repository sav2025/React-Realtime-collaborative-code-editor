javascript
CopyEdit
import { createStore } from 'redux';

// Initial State
const initialState = {
  code: '',
  roomId: '',
  users: []
};

// Action Types
const SET_CODE = 'SET_CODE';
const SET_USERS = 'SET_USERS';

// Action Creators
export const setCode = (code) => ({
  type: SET_CODE,
  payload: code,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CODE:
      return { ...state, code: action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export const store = createStore(rootReducer);
