import {useState} from 'react';
export const CSVUpload = ({closeModal, upload
}) => {
    const [errorMessage, setErrorMessage] = useState(false);
    const uploadFile = () => {
        const input = document.getElementById('fileUpload');
        let fileSize = 0;
        if (!input.files) { // This is VERY unlikely, browser support is near-universal
            console.error("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!input.files[0]) {
            console.error("Please select a file before clicking 'Load'");
        } else {
            var file = input.files[0];
            fileSize = file.size;
        }
        if (fileSize/1000000 < 2) {
            upload()
        }
        else {
            setErrorMessage(true);
        }
    }
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
              <h2>Upload your csv</h2>
              <input type="file" id='fileUpload' />
              <button onClick={uploadFile} accept=".csv" className="submitButton">Submit</button>
              {errorMessage && <h2 className='error'>File size is too big</h2>}
            </div>
            
          </div>
    )
}