import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Robbie Admin',
    email: 'admin@ralm.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Robbie User 1',
    email: 'robbie_user1@ralm.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Robbie User 2',
    email: 'robbie_user2@ralm.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
];

export default users;
