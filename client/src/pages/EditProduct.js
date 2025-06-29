import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, Navigate } from "react-router-dom";
import FormContainer from "../components/FormContainer/FormContainer";
import * as productAction from "../actions/productAction";
import * as productConstants from "../constants/productConstants";
import ErrorMessage from "../components/Message/errorMessage";
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import confirmationImg from "../assets/confirmation.png";
import { confirmAlert } from "react-confirm-alert";
import * as routes from "../constants/routes";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaCheck } from "react-icons/fa6";

const EditProduct = () => {
  const { productId } = useParams(); // Use useParams for routing
  const dispatch = useDispatch();

  // Selectors for product and update status
  const productData = useSelector((state) => state.Product);
  const { loading, product, error, success } = productData;

  const updateProductDetails = useSelector(
    (state) => state.updateProductDetails
  );
  const {
    loading: EditProductLoading,
    error: EditProductError,
    success: EditProductSuccess,
  } = updateProductDetails;

  // Component State
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [successNavigate, setSuccessNavigate] = useState(false);

  // Fetch product details on mount
  useEffect(() => {
    if (!success) {
      dispatch(productAction.product(productId));
    }
  }, [dispatch, productId, success]);

  // Populate form fields when product data is available
  useEffect(() => {
    if (success) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [success, product]);

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    const UpdateData = {
      name,
      brand,
      price,
      category,
      countInStock,
      description,
    };
    dispatch(productAction.EditProduct(productId, UpdateData));
  };

  // Confirm Alert
  const ConfirmedAlert = () => {
    if (EditProductSuccess) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className="custom-ui-alert">
            <div className="success-img">
              <FaCheck size={35} style={{ color: "#2b2b52" }} />
            </div>
            <h3 className="font-weight-bold text">
              Product updated successfully
            </h3>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => {
                onClose();
                dispatch({ type: productConstants.EDIT_PRODUCT_RESET });
                setSuccessNavigate(true);
              }}
            >
              OK
            </Button>
          </div>
        ),
      });
    }
  };

  // Navigate on success
  if (successNavigate) return <Navigate to={routes.PRODUCTS} />;

  return (
    <>
      {EditProductError && (
        <ErrorMessage
          header="Something went wrong"
          message={EditProductError}
          reset={productConstants.EDIT_PRODUCT_RESET}
        />
      )}
      <Link to={routes.PRODUCTS} className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <FormContainer>
            <h1>Edit Product</h1>
            <Form onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="brand"
                label="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                id="price"
                label="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                id="countInStock"
                label="Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows={4}
                id="description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl variant="outlined" fullWidth sx={{ marginY: 2 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Shirt">T-shirt</MenuItem>
                  <MenuItem value="Pants">Pant</MenuItem>
                  <MenuItem value="Vest">Vest</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={EditProductLoading}
              >
                {EditProductLoading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <>Update</>
                )}
              </Button>
            </Form>
          </FormContainer>
          {ConfirmedAlert()}
        </>
      )}
    </>
  );
};

export default EditProduct;
