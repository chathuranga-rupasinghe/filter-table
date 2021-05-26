import axios from "axios";

const endPoint = "https://nphc-hr.free.beeceptor.com/employees";
export const getEmployees = () => {
  return axios.get(endPoint);
};
export const deleteEmployee = (id) => {
  return axios.delete(endPoint+":"+id);
};
export const updateEmployee = (payload) => {
  return axios.put(endPoint,payload);
};
export const uploadCSV = (payload) => {
    return axios.post(endPoint+'/upload',payload);
}