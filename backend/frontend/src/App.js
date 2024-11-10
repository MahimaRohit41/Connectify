import { Toaster } from 'react-hot-toast';
import './App.css';
import Signup from './components/Signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import { useAuth } from './context/AuthProvider';
import Right from './Home/Left/Right/Right';
import Left from './Home/Left/Left';

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route path="/" 
        element={
          authUser ? (
            <div className="drawer lg:drawer-open">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex flex-col items-center justify-center">
                <Right />
              </div>
              <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu w-80 min-h-full bg-black text-base-content">
                    <Left />
                  </ul>
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/signup" element={authUser ? <Navigate to="/" />: <Signup/>}/>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login/>}/>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
