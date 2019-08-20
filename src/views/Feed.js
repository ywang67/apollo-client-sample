import React from "react";
import { View, StyleSheet } from "react-native-web";
import { Link } from "react-router-dom";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { GET_DOG } from "./Detail";
import { DogList } from "../DogList";
import { Dog } from "../Dog";
import Header from "../Header";
import { Fetching, Error } from "../Fetching";

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
      displayImage
    }
  }
`;

export function Feed() {
  const { loading, error, data, client } = useQuery(GET_DOGS);

  let content;
  if (loading) {
    content = <Fetching />;
  } else if (error) {
    content = <Error />;
  } else {
    content = (
      <DogList
        data={data.dogs}
        renderRow={(type, data) => (
          <Link
            to={{
              pathname: `/${data.breed}/${data.id}`,
              state: { id: data.id }
            }}
            onMouseOver={() =>
              client.query({
                query: GET_DOG,
                variables: { breed: data.breed }
              })
            }
            style={{ textDecoration: "none" }}
          >
            <Dog {...data} url={data.displayImage} />
          </Link>
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  }
});
