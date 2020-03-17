import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';

import { Context as BlogContext } from '../context/BlogContext';

const ShowScreen = ({ route, navigation }) => {
  const { state } = useContext(BlogContext);
  const blogPost = state.find(blogPost => blogPost.id === route.params.id);
  // console.log(state);
  console.log(blogPost.id);
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Edit', { id: blogPost.id })}
      >
        <EvilIcons name="pencil" size={30} />
      </TouchableOpacity>
    )
  });

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
