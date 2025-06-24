import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getCurrentUser } from '../Services/authService';

const Dashboard = () => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log("User fetched:", res.data); // Debug
      setUser(res.data);
    } catch (err) {
      console.error("User fetch failed", err); // See why it's failing
    }
  };

  fetchUser();
}, []);


  return (
    <>
      <Navbar user={user} />
      <Footer />
    </>
  );
};

export default Dashboard;
