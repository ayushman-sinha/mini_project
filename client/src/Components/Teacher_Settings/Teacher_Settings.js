import {useState,useEffect} from 'react'
import axios from 'axios'



const Teacher_Settings = () => {
    const [master,setMaster] = useState({})
    useEffect(() => {
        axios.get('http://localhost:5000/api/override/getOverride')
        .then(res => {
            console.log(res.data.master)
            setMaster(res.data.master)
        })
        .catch(err => console.log(err))
    },[])
    const handleMaster = () => {
        axios.post('http://localhost:5000/api/override/master', {
            master_override: !master.master_override,
            attendance_override: master.attendance_override,
            teacher: master.teacher
        })
        .then(res => {
            console.log(res.data)
            setMaster(res.data.master)
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
        <h1>Teacher Settings</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
            Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
            Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
            Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
            Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
        </p>
        <p>            
        </p>
        <button onClick={handleMaster }>
            {master.master_override ? "Disable Master Override" : "Enable Master Override"}
        </button>
    </div>
  )
}

export default Teacher_Settings