import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "../assets/css/AddCandidate.css";
import { addVehicleApi} from "../api/vehicles";

import './styles/css/main.css'
import './styles/css/util.css'
import './styles/fonts/font-awesome-4.7.0/css/font-awesome.css'

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Enter Valid mobile number")
    .required("Mobile number is required"),
  vehicleNumber: Yup.string().required("Vehicle number is required"),
});

const AddCandidate = () => {
  
  const initialValues = {
    name: "",
    mobile: "",
    vehicleNumber: "",
  };

  const handleSubmit = async (values, onSubmitProps) => {

    try{
      const response = await addVehicleApi(values);
      console.log(response)
    }catch(error){
      console.log(error.response.data.error);
      alert(error.response.data.error)
    }
    
  };

  return (
    <div style={{height:"600px",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Container className="form-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.mobile && !!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleNumber"
                    placeholder="Enter vehicle number"
                    value={values.vehicleNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.vehicleNumber && !!errors.vehicleNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vehicleNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AddCandidate;
