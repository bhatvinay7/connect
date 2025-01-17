<<<<<<< HEAD
import axios from './axios';
const postparticipantsDetails= async (body)=>{
    try{
  const response= await axios.post('/api/register',body);
=======
import myaxios from './axios';
const postparticipantsDetails= async (body)=>{
    try{
  const response= await myaxios.post('/api/register',body);
>>>>>>> 026f6a24fb5288054bc3d3fdf8d46e487398fcf1
    return response.data;
    }
  catch(err){
    throw err
  }
}
export {postparticipantsDetails};