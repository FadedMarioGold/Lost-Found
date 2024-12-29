import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";

function Signup() {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
      } else {
        setImage(file);
      }
    }
  };

  const handleSubmit = async (values) => {
    const { nickname, fullname, email, password } = values;

    try {
      let imgUrl = null;
      if (image) {
        const storageRef = ref(storage, `/images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Upload error:", error);
          },
          async () => {
            imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
          }
        );
      }

      const payload = {
        nickname,
        fullname,
        email,
        password,
        img: imgUrl,
      };

      const response = await axios.post(
        "http://localhost:4000/users/create",
        payload
      );

      if (response.data === "Done") {
        toast.success("You have successfully signed up!", {
          position: "bottom-right",
        });
        navigate("/log-in");
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" width="100%" gap="20px">
      <Stack
        direction="row"
        width="100%"
        sx={{ backgroundColor: "primary.main" }}
        height="125px"
        gap="4px"
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing={0} width="100%" maxWidth="1440px" ml={10}>
          <Typography fontSize="20px" color="white">
            Sign Up
          </Typography>
          <Typography variant="h5" color="white" fontWeight="bold">
            Welcome On Board!
          </Typography>
        </Stack>
      </Stack>

      <Stack alignItems="center" justifyContent="space-between" mt={3}>
        <Formik
          initialValues={{
            nickname: "",
            fullname: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            nickname: Yup.string().required("Nickname is required"),
            fullname: Yup.string().required("Full Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <Stack alignItems="center" gap="10px">
                <Avatar
                  src={image ? URL.createObjectURL(image) : ""}
                  sx={{ width: "6rem", height: "6rem" }}
                />
                <Button
                  variant="contained"
                  component="label"
                  endIcon={<PhotoCamera />}
                >
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </Button>

                <TextField
                  name="nickname"
                  label="Nickname"
                  size="small"
                  value={values.nickname}
                  onChange={handleChange}
                  fullWidth
                />
                <ErrorMessage
                  name="nickname"
                  component="div"
                  style={{ color: "red" }}
                />

                <TextField
                  name="fullname"
                  label="Full Name"
                  size="small"
                  value={values.fullname}
                  onChange={handleChange}
                  fullWidth
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  style={{ color: "red" }}
                />

                <TextField
                  name="email"
                  label="Email"
                  size="small"
                  value={values.email}
                  onChange={handleChange}
                  fullWidth
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />

                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  size="small"
                  value={values.password}
                  onChange={handleChange}
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />

                <Button variant="contained" color="primary" type="submit">
                  Sign Up
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
        <Divider sx={{ width: "100%", margin: "1rem 0" }} />
        <Typography>
          Already have an account?{" "}
          <Typography component={Link} to="/log-in">
            Login
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Signup;
