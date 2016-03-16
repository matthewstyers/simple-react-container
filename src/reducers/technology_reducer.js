import {FETCH_TECHNOLOGY} from '../actions/index';
const INITIAL_STATE = {
  all: [],
  technology: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_TECHNOLOGY:
    return {
      ...state,
      all: action.payload.data
    };
  default:
    return state;
  }
}
