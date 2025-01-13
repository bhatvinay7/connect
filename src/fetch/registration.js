import myaxios from './axios';
const postparticipantsDetails= async (body)=>{
    try{
  const response= await myaxios.post('/api/register',body);
    return response.data;
    }
  catch(err){
    throw err
  }
}
export {postparticipantsDetails};