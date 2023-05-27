import {React,useState,useEffect} from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import pic from './task.png'
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [username, setUsername] = useState("");

  const params = new URLSearchParams(window.location.search);
  const usernameParam = params.get('name');
  useEffect(() => {
  if(usernameParam){
    setUsername(usernameParam);
  }},[usernameParam]);
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate('/');
  };



  return (
    <Navbar bg="light" expand="lg" className="justify-content-between">
      <Navbar.Brand as={Link} to="/user">
        <Image src={pic} roundedCircle width={30} height={30} className="mr-2" />
        {username}
      </Navbar.Brand>
      <Nav>
        
       
        <Nav.Link className="text-danger" onClick={handleSignOut}>
          <FaSignOutAlt />
          Sign Out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
