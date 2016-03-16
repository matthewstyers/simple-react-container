import { combineReducers } from 'redux';
import TechnologyReducer from './technology_reducer';

const rootReducer = combineReducers({
  technologies: TechnologyReducer
});

export default rootReducer;
