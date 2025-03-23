import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { deleteUserThunk, getuserThunk } from '../redux/admin.slice';
import { useNavigate,Link} from "react-router-dom";

function AdminUsers() {
const result = useSelector((state) => state.admin.users);
// console.log(result);
const dispatch = useDispatch();
const navigate=useNavigate()



const token= localStorage.getItem("token");
useEffect(()=>{
  if(!token){
navigate("/login");
  }
},[token]);

useEffect(()=>{
dispatch(getuserThunk());
},[]);


async function handleDelete(id) {
  try{
   await dispatch(deleteUserThunk(id)).unwrap();
   dispatch(getuserThunk());
  }catch(e){
console.log(e.message);
  } 
}

  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>sno</th>
        <th>Profile</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Address</th>
        <th>City</th>
        <th>ZipCode</th>
        <th>Dob</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        result && result.length>0 ? result.map((res,index)=>(
          <tr key={index}>
          <td>{index+1}</td>
          <td>
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar"
                      />
                    </div>
                  </td>
          <td>{res.fname}</td>
          <td>{res.lname}</td>
          <td>{res.email}</td>
          <td>{res.mobile}</td>
          <td>{res.address}</td>
          <td>{res.city}</td>
          <td>{res.zipPostalCode}</td>
          <td>{res.dob}</td>
          <td>
          <Link to={`/updateadmin/${res._id}`}><button  className="btn capitalize btn-success">Edit</button></Link> &nbsp;{" "}
            <button className='btn capitalize btn-error' onClick={()=>handleDelete(res._id)}>delete</button>
          </td>
  
        </tr>
        )) : (
          <tr>
            <td colSpan="11" className="text-center font-semibold">
              No Users Available
            </td> 
          </tr>
        )
      }
     
      </tbody>
      </table>
</div>
  );
}

export default AdminUsers;
    
    