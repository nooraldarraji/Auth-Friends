import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login({ touched, errors }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Redirect to="/profile" />;
  }
  return (
    <Form className="form">
      <div className="form-group">
        <label className="label">User name</label>
        <Field
          className="input"
          name="username"
          type="username"
          autoComplete="off"
        />
        <p>{touched.username && errors.username}</p>
      </div>
      <div className="form-group">
        <label className="label">Password</label>
        <Field
          className="input"
          name="password"
          type="password"
          autoComplete="off"
        />
      </div>
      <p>{touched.password && errors.password}</p>
      <button className="btn">Submit &rarr;</button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(6)
  }),
  handleSubmit(values, formikBag) {
    console.log(formikBag.props);
    const url = "http://localhost:5000/api/login";
    axios
      .post(url, values)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        formikBag.props.history.push("/profile");
      })
      .catch(errors => {
        console.log(errors.response.data);
      });
  }
})(Login);
