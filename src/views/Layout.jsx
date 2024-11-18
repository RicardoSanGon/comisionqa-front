import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </div>
    </>
  );
}

export default Layout;