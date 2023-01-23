import { useState } from 'react';
import './App.css';
import { TOKEN_KEY, USER_INFO } from './constant/constant';
import { AppContext } from './context/context';
import AppRouters from './routers/appRouters';
import { apiGet } from './services/services';


function App() {
  const [user, setUser] = useState(null);
  // when user login or refresh the page get all information of user
  const getUser = async () => {
    const { data } = await apiGet(USER_INFO)
    console.log(data)
    setUser(data)
  }
// when user logout
const logout = async () => {
  localStorage.removeItem(TOKEN_KEY)
  setUser(null)
}

  return (
    <div >
      <AppContext.Provider value={{
        setUser, user, getUser,logout
      }}>
        <AppRouters />
      </AppContext.Provider>
    </div>
  );
}

export default App;
