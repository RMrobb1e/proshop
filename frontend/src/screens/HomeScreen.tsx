import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { pageNumber = '1' } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  console.log(isLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {data.products?.length > 0 &&
          data.products.map((product: any) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      <Paginate pages={data.pages} page={data.page} />
    </>
  );
};

export default HomeScreen;
