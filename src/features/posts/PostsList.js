import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostsExcerpt from './PostsExcerpt';
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts
} from './postSlice';

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      if (postStatus === 'idle') {
        dispatch(fetchPosts());
      }
      return () => {
        console.log('unmounted');
        effectRan.current = true;
      };
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === 'loading') {
    content = <p>"...loading"</p>;
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
