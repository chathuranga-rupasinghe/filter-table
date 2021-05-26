import { useState, useEffect } from "react";
import { getEmployees, deleteEmployee, updateEmployee, uploadCSV } from '../Api/api';
import {ModalComponent} from '../Components/modalComponent';
import {CSVUpload} from '../Components/csvUploadComponent'

function Dashboard() {
  const [isCloseModal, setIsCloseModal] = useState(true);
  const [personName, setPersonName] = useState('')
  const [login, setLogin] = useState('')
  const [salary, setSalary] = useState('')
  const [minSalary, setMinSalary] = useState(0)
  const [maxSalary, setMaxSalary] = useState()
  const [data, setData] = useState();
  const [message, setMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(true);
  const [openCSVModal,setOpenCSVModal] = useState(false);
  const [apiData, setApiData] = useState([])
  const getEmployeesData = () => {
    getEmployees()
      .then((res) => {
        setApiData(res.data);
        setData(res.data);
      })
      .catch((error) =>
        console.error("API error. Refresh the page")
      )
  }
  useEffect(() => {
    getEmployeesData();
  }, []);
  const closeModal = () => {
    setIsCloseModal(true);
  }
  const closeCSVModal = () => {
    setOpenCSVModal(false);
  }
  const upload = () => {
    uploadCSV().then(()=>{
      closeCSVModal()
      setIsSuccessMessage(true);
      setMessage('CSV uploaded Successfully');
      setTimeout(()=>{
        setMessage("");
      },3000)
    }).catch(()=>{
      closeCSVModal()
      setIsSuccessMessage(false);
        setMessage('Error uploading CSV');
        setTimeout(()=>{
          setMessage("");
        },3000)
    })
  }
  const deleteUser = (id) => {
    deleteEmployee(id).then((res)=>{
      getEmployeesData();
      setIsSuccessMessage(true);
      setMessage('User deleted Successfully');
      setTimeout(()=>{
        setMessage("");
      },3000)
    })
    .catch((error) =>
      {
        console.error("API error. Refresh the page");
        setIsSuccessMessage(false);
        setMessage('Error deleting user');
        setTimeout(()=>{
          setMessage("");
        },3000)
      }
    )
  }
  const openModal = (id) => {
    
    const selectedVal = data.find(val=>val.id===id);
    setPersonName(selectedVal?.fullName||'');
    setLogin(selectedVal?.username||'');
    setSalary(selectedVal?.salary||'');
    setIsCloseModal(false);
  }
  const search = () => {
    if(maxSalary){
      setData(apiData.filter(val=>{
        return parseFloat(val.salary) >= parseFloat(minSalary) && parseFloat(val.salary) <= parseFloat(maxSalary)
      }))
    } else {
      setData(apiData.filter(val=>{
        return parseFloat(val.salary) >= parseFloat(minSalary || 0)
      }))
    }
  }
  const submitChange = () => {
    setIsCloseModal(true);
    updateEmployee().then((res)=>{
      getEmployeesData();
      setIsSuccessMessage(true);
      setMessage('User updated Successfully');
      setTimeout(()=>{
        setMessage("");
      },3000)
    }).catch(()=>{
        console.error("API error. Refresh the page");
        setIsSuccessMessage(false);
        setMessage('Error updating user');
        setTimeout(()=>{
          setMessage("");
        },3000)
    })
  }
  return (
    <div className="App">
      <div onClick={()=>setOpenCSVModal(true)} className="csvUpload">Click here to upload your csv</div>
      <input value={minSalary} onChange={(e)=>setMinSalary(e.target.value)} placeholder='Min Salary' className="minSalary" type="number"/>-
      <input value={maxSalary} onChange={(e)=>setMaxSalary(e.target.value)} placeholder='Max Salary' className="maxSalary" type="number"/>
      <button onClick={search} className="search">Search</button>
      <table>
        <tr className="trHeader">
          <th>
            Id
          </th>
          <th>
            Name
          </th>
          <th>
            Login
          </th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
        {
          data?.map((val)=>(
            <tr>
              <td>{val.id}</td>
              <td>{val.fullName}</td>
              <td>{val.username}</td>
              <td>{val.salary}</td>
              <td>
                <button className="edit" onClick={()=>openModal(val.id)}>Edit</button>
                <button onClick={()=>deleteUser(val.id)} className="delete">Delete</button>
              </td>

            </tr>
          ))
        } 
      </table>
     {message && (<h3 className={isSuccessMessage?'success':'error'}>{message}</h3>)}
      {
        !isCloseModal && (<ModalComponent
          closeModal={closeModal}
          personName={personName}
          changeName={setPersonName}
          login={login}
          changeLogin={setLogin}
          salary={salary}
          changeSalary={setSalary}
          submit={submitChange}
        />
         
        )
      }
      { 
        openCSVModal && <CSVUpload upload = {upload} closeModal={closeCSVModal}/>
      }
    </div>
  );
}

export default Dashboard;
