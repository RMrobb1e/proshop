import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
  if (pages < 1) return <></>;

  const generateKeywordTo = (page) =>
    keyword ? `/search/${keyword}/page/${page + 1}` : `/page/${page + 1}`;

  return (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={!isAdmin ? generateKeywordTo(x) : `/admin/product-list/${x + 1}`}
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
