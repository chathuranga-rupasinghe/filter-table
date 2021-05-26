import { render } from '@testing-library/react';
import {CSVUpload} from './csvUploadComponent';

test('renders csvUploadComponent', () => {
const props ={
    closeModal:jest.fn(), 
    upload:jest.fn(), 
    
}
  const {getByText} = render(<CSVUpload {...props}/>);
  getByText('Upload your csv');
  getByText('Submit');
});