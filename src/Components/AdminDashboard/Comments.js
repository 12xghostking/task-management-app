import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';

const Comments = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/comments')
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }
    , [comments]);

  return (
   <div>
    <Card className="mt-2">
      <Card.Header>Comments</Card.Header>
      <Card.Body>
     
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{comment.name}</strong>
                <br />
                <small>Recieved from {comment.commentfrom}</small>
                <br />
                <small>Comment: {comment.comment}</small>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
   </div>
  )
}

export default Comments