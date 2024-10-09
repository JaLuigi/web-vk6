import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';

export default function card({ card }) {
  return (
    <Image
      source={{ uri: card.image }}
      style={styles.cardImage}
    />
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
});
