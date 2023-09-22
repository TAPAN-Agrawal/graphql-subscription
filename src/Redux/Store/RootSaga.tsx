import { watcher } from "../Saga/Saga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([watcher()]);
}
