import { useEffect, useState } from 'react';
import './Coordinate.css';
import axios from 'axios';

const Coordinate = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const corner = ['Corner 1', 'Corner 2', 'Corner 3', 'Corner 4'];
  const [selectedCorner, setSelectedCorner] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem('user')));
      // if(user.isAdmin === 'Admin'){
      //     setIsAdmin(true)
      // }
      // else{
      //     alert("You are not authorized to view this page")
      //     window.location.href = '/login'
      // }
    } else {
      alert('Please Login First');
      window.location.href = '/login';
    }
  }, []);

  const resetButton = (e) => {
    e.preventDefault();
    setCoordinates([]);
    setSelectedCorner(0);
  };

  const submitButton = async (e) => {
    e.preventDefault();
    if (coordinates.length !== 4) {
      alert('Please enter all the coordinates');
      return;
    }
    let arr = [];
    for (let i = 0; i < 4; i++) {
      let tmp = {
        latitude: coordinates[i].latitude,
        longitude: coordinates[i].longitude,
      };
      arr.push(tmp);
    }
    try {
      const res = await axios.post('http://localhost:5000/api/coordinate/add', arr);
      alert('Coordinates Added Successfully');
      window.location.href = '/teacher_dashboard';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="title">Add/Edit Coordinate</h1>
      <div className="coordinate-container">
        {coordinates.map((coordinate, index) => {
          return (
            <div key={index}>
              <h2>{corner[index]}</h2>
              <div>
                <strong>Latitude:</strong> {coordinate.latitude} <strong>Longitude:</strong>{' '}
                {coordinate.longitude}
              </div>
              <p></p>
            </div>
          );
        })}
        <div className="button-container">
          <button
            className="get-coordinates-button"
            onClick={() => {
              if (selectedCorner === 4) {
                alert('All Coordinates are set');
                return;
              }
              navigator.geolocation.getCurrentPosition((position) => {
                setCoordinates([...coordinates, position.coords]);
              });
              setSelectedCorner(selectedCorner + 1);
            }}
          >
            Get Coordinates from {corner[selectedCorner]}
          </button>
          <button className="reset-button" type="reset" onClick={resetButton}>
            Reset
          </button>
          <button className="submit-button" type="submit" onClick={submitButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coordinate;
