import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useDispatch, useSelector } from "react-redux";
import { graphql } from "../Redux/Reducer/Reducer";
import { petAddedFromSubscription } from "../Redux/Action/Action";

function Main() {
  const { pets } = useSelector((state: any) => state.graphql);
  const dispatch = useDispatch();

  const MESSAGE = gql`
    subscription {
      petAdded {
        name
      }
    }
  `;

  const data = useSubscription(MESSAGE);

  useEffect(() => {
    if (data?.data?.petAdded?.name) {
      dispatch(petAddedFromSubscription(data?.data?.petAdded?.name));
      console.log("subscription", data?.data?.petAdded?.name);
    }
  }, [data]);
  // console.log(pets);

  return (
    <div>
      newly added subscription(pet)
      {pets.map((pet: any) => {
       return <p>{pet.name}</p>;
      })}
    </div>
  );
}

export default Main;
