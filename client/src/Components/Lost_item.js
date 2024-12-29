import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Paper,
  Grid,
  Button,
  Typography,
  Stack,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText
} from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js';
import * as Yup from 'yup';

const LostItem = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const usertoken = window.localStorage.getItem("token");
  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user._id : null;
  };

  const config = { headers: { token: usertoken } };

  const schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Item type is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    number: Yup.string().required('Phone number is required'),
  });

  const handleImageUpload = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (error) {
      const errorMessages = error.inner.map((err) => err.message);
      toast.error(errorMessages.join('\n'));
      return;
    }

    if (!image || image.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);
    const promises = [];

    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      const storageRef = ref(storage, `/images/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      const promise = new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const uploaded = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(uploaded);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
          }
        );
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then((urls) => {
        const newItem = { ...values, img: urls };
        axios.post('http://localhost:4000/Items/newItem', newItem, config)
          .then(() => {
            toast.success('Item listed successfully.');
            setLoading(false);
            window.location.href = "/mylistings";
          })
          .catch((error) => {
            toast.error('Something went wrong.');
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error('Something went wrong.');
        setLoading(false);
      });
  };

  return (
    <Stack width="100%" pt="60px" alignItems="center">
      <Typography fontSize="30px" color="primary">
        If your item is lost or you found someone's item, Post it Here!
      </Typography>
      <Stack width="100%" maxWidth="1440px" direction="row" justifyContent="center" alignItems="center">
        <Formik
          initialValues={{
            name: '',
            userId: getUserId(),
            description: '',
            type: '',
            location: '',
            date: '',
            number: ''
          }}
          validationSchema={schema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, handleChange }) => (
            <Container component="main" maxWidth="sm">
              <Paper variant="outlined" sx={{ p: 4 }}>
                <Form>
                  <Typography variant="h6">Picture</Typography>
                  <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload} />
                  </Button>

                  <Typography variant="h6" mt={2}>Item Details</Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Item name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Where did you find/lost it?"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="When did you find/lost it?"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="How can we contact you?"
                        name="number"
                        value={values.number}
                        onChange={handleChange}
                      />
                    </Grid>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel>Item Type</InputLabel>
                      <Select
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                      >
                        <MenuItem value="Lost">Lost It</MenuItem>
                        <MenuItem value="Found">Found It</MenuItem>
                      </Select>
                      <FormHelperText>Please select the type of item</FormHelperText>
                    </FormControl>

                    <Grid item xs={12} mt={2}>
                      <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Submitting...' : 'Create post'}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Paper>
            </Container>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default LostItem;
