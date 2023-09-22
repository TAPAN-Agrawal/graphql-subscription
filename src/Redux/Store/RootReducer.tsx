import { combineReducers } from "redux";
import { graphql } from "../Reducer/Reducer";


export const rootReducer = combineReducers({
  graphql: graphql,
});
