import { useState } from "react";
import './App.css';
const sampleArr = [
  {
   id:1,
   name:"Amit",
   login:"single",
   salary:1250,
  },
  {
    id:2,
    name:"Raj",
    login:"single",
    salary:2250,
   },
   {
    id:3,
    name:"Wen lee",
    login:"single",
    salary:12250,
   },
   {
    id:4,
    name:"Albert",
    login:"single",
    salary:250,
   },
   {
    id:5,
    name:"Mark",
    login:"single",
    salary:4250,
   }
];
function App() {
  const [isCloseModal, setIsCloseModal] = useState(true);
  const [personName, setPersonName] = useState('')
  const [login, setLogin] = useState('')
  const [salary, setSalary] = useState('')
  const [minSalary, setMinSalary] = useState(0)
  const [maxSalary, setMaxSalary] = useState()
  const [data, setData] = useState(sampleArr);
  const closeModal = () => {
    setIsCloseModal(true);
  }
  const openModal = (id) => {
    
    const selectedVal = data.find(val=>val.id===id);
    setPersonName(selectedVal?.name||'');
    setLogin(selectedVal?.login||'');
    setSalary(selectedVal?.salary||'');
    setIsCloseModal(false);
  }
  const search = ()=>{
    if(maxSalary){
      setData(sampleArr.filter(val=>{
        return val.salary >= parseFloat(minSalary) && val.salary <= parseFloat(maxSalary)
      }))
    } else {
      setData(sampleArr.filter(val=>{
        return val.salary >= parseFloat(minSalary || 0)
      }))
    }
  }
  return (
    <div className="App">
      <input value={minSalary} onChange={(e)=>setMinSalary(e.target.value)} placeholder='Min Salary' style={{marginBottom:'5px', marginRight:'5px'}} type="number"/>-
      <input value={maxSalary} onChange={(e)=>setMaxSalary(e.target.value)} placeholder='Max Salary' style={{marginBottom:'5px', marginLeft:'5px'}} type="number"/>
      <button onClick={search} className="search">Search</button>
      <table>
        <tr style={{background: '#9dc2bd'}}>
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
          data.map((val)=>(
            <tr>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.login}</td>
              <td>{val.salary}</td>
              <td>
                <button className="edit" onClick={()=>openModal(val.id)}>Edit</button>
                <button className="delete">Delete</button>
              </td>

            </tr>
          ))
        }
        
      </table>
      {
        !isCloseModal && (
          <div className="imgModalWrapper">
            <div className="modalOverlay"></div>
            <div className="imgModal">
              <button
                data-testid="close-btn"
                onClick={closeModal}
                className="closeBtn"
              >
                Close
              </button>
              <h2>Edit</h2>
              <div className="textWrapper">
                <label>Name</label>
                <input value={personName} type="text"/>
              </div>
              <div className="textWrapper">
                <label>Login</label>
                <input value={login} type="text"/>
              </div>
              <div className="textWrapper">
                <label>Salary</label>
                <input value={salary} type="text"/>
              </div>
              <button className="submitButton">Submit</button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;
