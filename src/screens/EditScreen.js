import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { Context as BlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ route, navigation }) => {
  const { state, editBlogPost } = useContext(BlogContext);
  const blogPost = state.find(blogPost => blogPost.id === route.params.id);

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        // console.log(blogPost.id, title, content);
        editBlogPost(blogPost.id, title, content, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
