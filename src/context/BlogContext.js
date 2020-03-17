import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return action.payload;
    case 'EDIT_POST':
      return state.map(blogPost =>
        blogPost.id === action.payload.id ? action.payload : blogPost
      );
    /*     case 'ADD_POST':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content
        }
      ];
 */
    case 'DELETE_POST':
      return state.filter(blogPost => blogPost.id !== action.payload);
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    dispatch({ type: 'GET_POSTS', payload: response.data });
  };
};

const addBlogPost = dispatch => {
  return (title, content, callback) => {
    jsonServer.post('/blogposts', { title, content });
    // dispatch({ type: 'ADD_POST', payload: { title, content } });
    if (callback) callback();
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: 'DELETE_POST', payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({ type: 'EDIT_POST', payload: { id, title, content } });
    if (callback) callback();
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
