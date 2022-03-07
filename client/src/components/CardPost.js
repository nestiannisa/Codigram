import React, { useEffect } from "react";
import { PostsList } from "../Action/postAction";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import { timeSince } from "../utils/time";

function CardPost() {
  const { listPostResult, listPostLoading, listPostError } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    //panggil action post list
    console.log("1.use");
    dispatch(PostsList());
  }, [dispatch]);

  return (
    <>
      {listPostResult ? (
        listPostResult.map((post,i) => {
          return (
            <Row key={i} className="justify-content-center">
              <Card style={{ width: "50rem" }} className="mt-3">
                <Row>
                  <Col lg={1} md={1} sm={1} xs={2} className="mt-2">
                    <Card.Img
                      src={`${API_URL}/${post.User.avatar}`}
                      className="PostAvatar"
                    />
                  </Col>
                  <Col>
                    <Link to={`/users/account/${post.User.id}`}>
                      <Card.Title className="postUser mt-2">
                        {post.User.username}
                      </Card.Title>
                    </Link>
                    <small className="date mb-3">
                      {timeSince(post.createdAt)}
                    </small>
                  </Col>
                </Row>
                <Card.Img
                  className="userPost mt-3"
                  variant="top"
                  src={`${API_URL}/${post.image}`}
                />
                <Card.Body>
                  <Card.Text className="postCaption">{post.caption}</Card.Text>
                  <Link to={`/posts/detail/${post.id}`}>
                    <small>...</small>
                  </Link>
                </Card.Body>
              </Card>
            </Row>
          );
        })
      ) : listPostLoading ? (
        <p>loading</p>
      ) : (
        <p>{listPostError ? listPostError : "data kosong"}</p>
      )}
    </>
  );
}

export default CardPost;
