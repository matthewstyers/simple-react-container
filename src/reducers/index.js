import { combineReducers } from 'redux';
import TechnologyReducer from './technology_reducer';

const rootReducer = combineReducers({
  technologyList: TechnologyReducer
});

export default rootReducer;
