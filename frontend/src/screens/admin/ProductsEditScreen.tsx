import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductsEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  console.log(productId);
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: isLoadingUpload }] =
    useUploadProductImageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      refetch();
      toast.success('Product updated successfully');
      navigate('/admin/product-list');
    } catch (error: any) {
      toast.error(error?.data.message ?? error.error);
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();

    formData.append('image', file);
    try {
      console.log(formData);
      const { image, message } = await uploadProductImage(formData).unwrap();
      toast.success(message);
      setImage(image);
    } catch (error: any) {
      toast.error(error?.data.message ?? error.error);
    }
  };

  if (isLoading || isLoadingUpdate) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <Link to="/admin/product-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name ?? ''}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price ?? ''}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Form.Group>
          {/* IMAGE HERE */}
          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image ?? ''}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control
              type="file"
              // lab="Choose file"
              onChange={uploadFileHandler}
            />
          </Form.Group>
          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand ?? ''}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock ?? ''}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category ?? ''}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description ?? ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductsEditScreen;
