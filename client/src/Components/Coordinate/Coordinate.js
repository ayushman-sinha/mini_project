import e from 'cors';
import {useEffect,useState} from 'react'
import './Coordinate.css'
import axios from 'axios'

const Coordinate = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [isAdmin,setIsAdmin] = useState(false)
    const [coordinates,setCoordinates] = useState([])
    const corner=['Corner 1','Corner 2','Corner 3','Corner 4'];
    const [selectedCorner,setSelectedCorner] = useState(0)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setLoggedIn(true);
            setUser(JSON.parse(localStorage.getItem('user')));
            // if(user.isAdmin === 'Admin'){
            //     setIsAdmin(true)
            // }
            // else{
            //     alert("You are not authorized to view this page")
            //     window.location.href = '/login'
            // }
        }
        else{
            alert("Please Login First")
            window.location.href = '/login'
        }
    },[]);
    const resetButton = (e) => {
        e.preventDefault()
        setCoordinates([])
        setSelectedCorner(0)
    }
    const submitButton = async(e) => {
            e.preventDefault()
            const coordinates = {
                
            }
            try{
                const res = await axios.post('http://localhost:5000/api/coordinate/add',coordinates)
                
            }
            catch(err){
                console.log(err)
            }
    }
  return (
    <div>
        <h1>Add/Edit Coordinate</h1>
        <div className='coordinate_container'>
            {coordinates.map((coordinate,index)=>{
                return(
                    <div key={index}>
                        <h2>{corner[index]}</h2>
                        <div><strong>Latitude:</strong> {coordinate.latitude} <strong>Longitude:</strong> {coordinate.longitude}</div>
                        <p></p>
                        
                    </div>
                )
            })}
            Get Coordinates from {corner[selectedCorner]}&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={()=>{
                if(selectedCorner === 4){
                    alert("All Coordinates are set")
                    return
                }
                navigator.geolocation.getCurrentPosition((position)=>{
                    setCoordinates([...coordinates,position.coords])
                })
                setSelectedCorner(selectedCorner+1)
            } }>Get Coordinates</button>
            <p></p>
            <button type='reset' onClick={resetButton}>Reset</button>
            <button type='submit' onClick={submitButton}>Submit</button>
        </div>
    </div>
  )
}

export default Coordinate