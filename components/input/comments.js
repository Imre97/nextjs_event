import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [allComments, setAllComments] = useState([])


  useEffect(() => {
    getComments()
  }, [showComments])


  function getComments() {
    if(showComments){
      fetch('/api/comments/'+ eventId, {
        method: 'GET'
      }).then(response => response.json()).then(data => setAllComments(data.comments))
    }
  }


  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(data => console.log(data))

      getComments()
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={allComments} />}
    </section>
  );
}

export default Comments;
