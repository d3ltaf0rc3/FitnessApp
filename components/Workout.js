import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Button from './Button';

const Workout = (props) => {
  const navigation = useNavigation();

  if (!props.item.createdAt) {
    return <View />;
  }

  const date = props.item.createdAt.toDate().toISOString().split('T')[0];
  const handlePress = () => {
    navigation.navigate('View details', { item: props.item });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.item.image }} />
      <Text style={styles.text}>{props.item.type} workout</Text>
      <Text style={styles.text}>Date: {date}</Text>
      <Button onPress={handlePress} text="View Details" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 3,
    borderColor: '#20639b',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    height: 150,
    width: 150,
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Workout;
