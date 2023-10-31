import { createContext } from 'react';

const UserContext = createContext({
  user: null, // { email, name, token }
  setUser: () => {}
});

export default UserContext;
