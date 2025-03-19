import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/food-log">Food Log</Link>
      <Link to="/weight-log">Weight Log</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
}

export default Navbar;
