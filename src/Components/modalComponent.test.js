import { render } from '@testing-library/react';
import {ModalComponent} from './modalComponent';

test('renders modalComponent', () => {
const props ={
    closeModal:jest.fn(), 
    changeName:jest.fn(), 
    changeLogin:jest.fn(), 
    changeSalary:jest.fn(), 
    submit:jest.fn(),
    personName: 'Harry',
    login: 'hpotter',
    salary:2000,
}
  const {getByText} = render(<ModalComponent {...props}/>);
  getByText('Edit');
  getByText('Name');
  getByText('Salary');
  getByText('Submit');
});