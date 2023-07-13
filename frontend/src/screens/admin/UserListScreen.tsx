import { Button, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const {
    data: users,
    isLoading: isLoadingOrders,
    error: isOrdersError,
    refetch,
  } = useGetUsersQuery();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      // delete user
      try {
        await deleteUser(id);
        refetch();
        toast.success('Product deleted successfully');
      } catch (error: any) {
        toast.error(error?.data.message ?? error.error);
      }
    }
  };

  if (isLoadingOrders) {
    return <Loader />;
  }

  if (isOrdersError) {
    return (
      <Message variant="danger">
        {(isOrdersError as any)?.data?.message ??
          (isOrdersError as any)?.message}
      </Message>
    );
  }

  return (
    <>
      <h1>Orders</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {(users ?? []).map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/user/${user._id}/edit`}>
                  <Button className="btn-sm mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  className="btn-sm"
                  variant="danger"
                  onClick={() => deleteHandler(user._id)}
                  disabled={isLoadingDelete}
                >
                  <FaTrash style={{ color: 'white' }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListScreen;
