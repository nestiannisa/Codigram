import React, { useEffect } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL, token_for_access } from "../utils/constant";
import { timeSince } from "../utils/time";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, postUser } from "../Action/postAction";
import { FiEdit, FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function CardUserPost() {
  const { userPostResult, userPostLoading, userPostError } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

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
                  <Card.Text>{post.caption}</Card.Text>
                  <Row>
                    <small className=" date mb-3">
                      {timeSince(post.createdAt)}
                    </small>
                  </Row>

                  <Dropdown drop="up" alignRight>
                    <DropdownToggle></DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link to={`/account/posts/edit/${post.id}`}>
                          <FiEdit />
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <a
                          href=""
                          variant="danger"
                          onClick={(e) => handleDelete(e, post.id)}
                        >
                          <FiDelete />
                        </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
