import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Dropdown, Row, Popover, Overlay } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constant";
import { timeSince } from "../utils/time";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, postUser } from "../Action/postAction";
import { FiEdit, FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";
import { BsThreeDotsVertical } from "react-icons/bs";

function CardUserPost() {
  const { userPostResult, userPostLoading, userPostError } = useSelector(
    (state) => state.posts
  );

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  useEffect(() => {
    //panggil action post list
    console.log("1.use");
    dispatch(postUser());
  }, [dispatch]);

  const id = userPostResult.id;

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log("1.masuk delete");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        //add user
        dispatch(deletePost(id));
      }
    });
  };

  //<a href="" variant="danger" onClick={() => dispatch(deletePost(post.id))}><FiDelete/></a>

  return (
    <>
      {userPostResult ? (
        userPostResult.map((post, i) => {
          return (
            <Col key={i} md={5} lg={4}>
              <Card className="mt-5">
                <Card.Img
                  className="userPostImage mt-0"
                  variant="top"
                  src={`${API_URL}/${post.image}`}
                />
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Text>{post.caption}</Card.Text>
                    </Col>
                    <Col xxs={1} xs={1} sm={1} md={2} lg={1}>
                      <div ref={ref}>
                        <button className="buttonPop" onClick={handleClick}>
                          {" "}
                          <BsThreeDotsVertical />{" "}
                        </button>

                        <Overlay
                          show={show}
                          target={target}
                          placement="left"
                          container={ref}
                          containerPadding={20}
                        >
                          <Popover id="popover-contained">
                            <Popover.Body>
                              <div>
                                <Link to={`/account/posts/edit/${post.id}`}>
                                  <p  className="mx-3">
                                    <FiEdit className="mx-3"/> Edit
                                  </p>
                                </Link>
                                <a
                                  href=""
                                  variant="danger"
                                  onClick={(e) => handleDelete(e, post.id)}
                                >
                                  <p className="mx-3">
                                    {" "}
                                    <FiDelete className="mx-3" /> Delete
                                  </p>
                                </a>
                              </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <small className=" date mb-3">
                      {timeSince(post.createdAt)}
                    </small>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : userPostLoading ? (
        <p>loading</p>
      ) : (
        <p>{userPostError ? userPostError : "data kosong"}</p>
      )}
    </>
  );
}

export default CardUserPost;
