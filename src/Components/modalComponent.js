export const ModalComponent = ({
    closeModal, 
    changeName, 
    changeLogin, 
    changeSalary, 
    submit,
    personName,
    login,
    salary
}) => {
    return (
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
                <input onChange={(e)=>changeName(e.target.value)} value={personName} type="text"/>
              </div>
              <div className="textWrapper">
                <label>Login</label>
                <input onChange={(e)=>changeLogin(e.target.value)} value={login} type="text"/>
              </div>
              <div className="textWrapper">
                <label>Salary</label>
                <input onChange={(e)=>changeSalary(e.target.value)} value={salary} type="number"/>
              </div>
              <button onClick={submit} className="submitButton">Submit</button>
            </div>
          </div>
    )
}