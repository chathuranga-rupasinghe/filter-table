import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard page', () => {
  const {getByText} = render(<App />);
  getByText('Click here to upload your csv');
  getByText('Id');
  getByText('Name');
  getByText('Login');
  getByText('Salary');
});
