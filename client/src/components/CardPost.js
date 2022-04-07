import React, { useEffect, useRef, useState } from "react";
import { PostsList } from "../Action/postAction";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Spinner} from "react-bootstrap";
import { API_URL, login } from "../utils/constant";
import { timeSince } from "../utils/time";

function CardPost() {
  const { listPostResult, listPostLoading, listPostError } = useSelector(
    (state) => state.posts
  );

  const { userAccountResult, userAccountLoading, userAccountError } =
    useSelector((state) => state.users);

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    //panggil action post list
    console.log("1.use");
    dispatch(PostsList());
  }, [dispatch]);

  return (
    <>
      {listPostResult ? (
        listPostResult.map((post, i) => {
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
                <Link to={`/posts/detail/${post.id}`}>
                  <Card.Img
                    className="userPost mt-3"
                    variant="top"
                    src={`${API_URL}/${post.image}`}
                  />
                </Link>
                <Card.Body>
                  <Card.Text className="postCaption">{post.caption}</Card.Text>
                </Card.Body>
              </Card>
            </Row>
          );
        })
      ) : listPostLoading ? (
        <div div className=" text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <p>{listPostError ? listPostError : "data kosong"}</p>
      )}
    </>
  );
}

export default CardPost;
