import {FETCH_TECHNOLOGIES} from '../actions/index';
const INITIAL_STATE = {
  all: [],
  technologyList: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_TECHNOLOGIES:
    return {
      ...state,
      all: action.payload.data
    };
  default:
    return state;
  }
}
