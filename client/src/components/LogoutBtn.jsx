import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function HomeNB() {

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/auth/logout", {})
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  )
}
