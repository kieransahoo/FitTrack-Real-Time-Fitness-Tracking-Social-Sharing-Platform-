import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* <Header /> */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;