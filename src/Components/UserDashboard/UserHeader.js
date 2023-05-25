import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import pic from './task.png'
const Header = () => {
  const handleSignOut = () => {
    // Implement sign out logic here
  };

  // Assuming you have user data available
  const user = {
    name: 'John Doe',
    
  };

  return (
    <Navbar bg="light" expand="lg" className="justify-content-between">
      <Navbar.Brand as={Link} to="/user">
        <Image src={pic} roundedCircle width={30} height={30} className="mr-2" />
        {user.name}
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">Home</Nav.Link>
        <Nav.Link as={Link} to="/user/profile">
          <FaSignOutAlt />
          Profile
        </Nav.Link>
        <Nav.Link className="text-danger" onClick={handleSignOut}>
          <FaSignOutAlt />
          Sign Out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
