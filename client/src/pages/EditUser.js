import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer/FormContainer';
import * as userAction from '../actions/userAction';
import * as userConstants from '../constants/userConstants';
import ErrorMessage from '../components/Message/errorMessage';
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Link, Navigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import * as routes from '../constants/routes';
import { FaCheck } from "react-icons/fa6";
import 'react-confirm-alert/src/react-confirm-alert.css';

const UpdateUser = () => {
  const userId = useParams().userId;
  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { loading: updateLoading, error: updateError, success: updateSuccess } = userUpdateDetails;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error, success } = userDetails;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [Success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.getUser(userId));
    // eslint-disable-next-line
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    // eslint-disable-next-line
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const UpdateData = {
      name,
      email,
      role,
    };
    dispatch(userAction.updateUser(userId, UpdateData));
  };

  const ConfirmedAlert = () => {
    if (updateSuccess) {
      return confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui-alert">
              <div className="success-img">
                <FaCheck size={35} style={{color: "#2b2b52"}}/>
              </div>
              <h3 className="font-weight-bold text">User updated successfully</h3>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose();
                  dispatch({ type: userConstants.USER_EDIT_RESET });
                  setSuccess(true);
                }}
              >
                OK
              </Button>
            </div>
          );
        },
      });
    }
  };

  return (
    <>
      {Success && <Navigate to={routes.USERS} />}
      {updateError && (
        <ErrorMessage header="Something went wrong" message={updateError} reset={userConstants.USER_EDIT_RESET} />
      )}
      <Link to={routes.USERS} className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <FormContainer>
            <h1>Edit User</h1>
            <Form onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                variant="outlined"
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="brand"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormControl variant="outlined" sx={{marginY: "16px", minWidth: 120,}}>
                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setRole(e.target.value)}
                  label="Role"
                  value={role}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateLoading}
                sx={{color: '#fff',}}
              >
                {updateLoading ? <CircularProgress color="inherit" /> : <>Update</>}
              </Button>
            </Form>
          </FormContainer>
          {ConfirmedAlert()}
        </>
      )}
    </>
  );
};

export default UpdateUser;
