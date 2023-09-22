import React, { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import {
  createOwner,
  getPets,
  singleCustomer,
  subscription,
} from "./Redux/Action/Action";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";

function App() {
  const dispatch = useDispatch();
  const [id, setId] = useState<any>();
  const [name, setName] = useState<any>();

  return (
    <div className="App">
      <label htmlFor="">Id</label>
      <input
        onChange={(e) => {
          setId(Number(e.target.value));
        }}
      />
      <label htmlFor="">Pet</label>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch(getPets());
        }}
      >
        call
      </button>

      <button
        onClick={() => {
          dispatch(singleCustomer(id));
        }}
      >
        Id
      </button>
      <button
        onClick={() => {
          dispatch(createOwner(name));
        }}
      >
        CreatePet
      </button>
      <button onClick={()=>{
        
        dispatch(subscription())
      }}>subscription</button>
  <Main />
    </div>
  );
}

export default App;
