import React from "react";
import { View, StyleSheet } from "react-native-web";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { DogWithLikes } from "../Dog";
import { DogList } from "../DogList";
import Header from "../Header";
import { Fetching, Error } from "../Fetching";

export const GET_DOG = gql`
  query getDogByBreed($breed: String!) {
    dog(breed: $breed) {
      images {
        url
        id
        isLiked @client
      }
    }
  }
`;

export function Detail({
  match: {
    params: { breed, id }
  }
}) {
  const { loading, error, data } = useQuery(GET_DOG, { variables: { breed } });

  let content;
  if (loading) {
    content = <Fetching />;
  } else if (error) {
    content = <Error />;
  } else {
    content = (
      <DogList
        data={data.dog.images}
        renderRow={(type, data) => (
          <DogWithLikes
            id={id}
            isLiked={data.isLiked}
            imageId={data.id}
            url={data.url}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header text={breed} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  fetching: {
    fontSize: 30,
    fontFamily: "Luckiest Guy",
    color: "#23a599",
    margin: 10,
    letterSpacing: 1
  }
});
