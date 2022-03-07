import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { postPostsCreate, PostsList } from "../Action/postAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function AddPost() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    caption: " ",
  });

  const [image, setImage] = useState("https://fakeimg.pl/250x100/");
  const [imageShow, setImageShow] = useState("https://fakeimg.pl/250x100/");
  const [imageName, setImageName] = useState("Choose file");
  const [progress, setProgress] = useState(0);

  //  menambah data agar tidak perlu refresh
  const { postPostCreateResult } = useSelector((state) => state.posts);
  //end
  const { caption } = formData;

  const dispatch = useDispatch();

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
    setImageShow(URL.createObjectURL(e.target.files[0]))
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    const payload = new FormData();
    payload.append("image", image);
    payload.append("caption", formData.caption);
    dispatch(postPostsCreate(payload));
  };

  useEffect(() => {
    if (postPostCreateResult) {
      dispatch(PostsList());
      setFormData("");
      setImage("");
    }
  }, [postPostCreateResult, dispatch]);

  /**
   * 
   onChange={(event) => setImage(event.target.value)}
   value={image}
   onChange={(event) => setCaption(event.target.value)}
   */

  return (
    <>
      <Row className="justify-content-md-center pt-5">
        <Col md={4}>
          <Form className="formAdd">
            <Form.Group className="mb-3 mx-5">
              <h5 className="pt-5">New Post</h5>
              <Row>
              <img src={imageShow}/>
              </Row>
              <Form.Label>Image</Form.Label>
              <Form.Control
                id="image"
                name="image"
                type="file"
                onChange={(e) => onFileChange(e)}
                accept="image/*"
              />
            </Form.Group>
            <Form.Group className="mb-3 mx-5">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                id="caption"
                name="caption"
                value={caption}
                onChange={(e) => onChange(e)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button onClick={(e) => onSubmit(e)} encType="multipart/form-data" className="mb-3">
              Post
            </Button>
            <Button href="/" variant="danger" className="mx-3 mb-3">
              Back
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default AddPost;
