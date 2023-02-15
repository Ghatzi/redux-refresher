// import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PostsExcerpt from './PostsExcerpt';
import {
  getPostsError,
  getPostsStatus,
  selectAllPosts,
  selectPostIds
} from './postSlice';

const PostsList = () => {
  // const dispatch = useDispatch();

  const orderedPostIds = useSelector(selectPostIds);
  // const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  // const effectRan = useRef(false);

  // useEffect(() => {
  //   if (effectRan.current === false) {
  //     if (postStatus === 'idle') {
  //       dispatch(fetchPosts());
  //     }
  //     return () => {
  //       console.log('unmounted');
  //       effectRan.current = true;
  //     };
  //   }
  // }, [postStatus, dispatch]);

  let content;
  if (postStatus === 'loading') {
    content = <p>"...loading"</p>;
  } else if (postStatus === 'succeeded') {
    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPostIds.map(postId => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
