import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
function Layout() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
