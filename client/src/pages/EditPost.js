import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { updatePost } from "../Action/postAction";
import { getPostDetail } from "../Action/postAction";

function EditPost() {
  const [caption, setCaption] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const params = useParams();
  const id = +params.id;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("1.masuk handle submit");
    //add user
    navigate("/account")
    dispatch(updatePost(id, { caption: caption }));
  };

  const { getPostDetailResult, getPostDetailLoading, getPostDetailError } =
    useSelector((state) => state.posts);


  return (
    <>
      <Row className="justify-content-md-center pt-5">
        <Col md={4}>
          <Form className="formEditPost">
            <Form.Group className="mb-3 mx-5">
            <h5 className="pt-5">Edit Post</h5>
              <Form.Label>Caption</Form.Label>
              <Form.Control
                onChange={(event) => setCaption(event.target.value)}
                id="caption"
                name="caption"
                value={caption}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button onClick={(event) => handleSubmit(event)}>Update</Button>
            <Button href="/account" variant="danger" className="mx-3">
              Back
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default EditPost;
