import axios from "axios";
import toast from "react-hot-toast";


const createApi = "/api/v1/create";
const checkEmail= "/api/v1/checkMail";
const loginApi = "/api/v1/login";
const deleteCardApi = "/api/v1/deleteCard";
const getAllUsersApi="/api/v1";
const deleteUserApi= "/api/v1/deleteAdmin";
const updateUserApi="/api/v1//updateUser";

const productsApi="https://dummyjson.com/products"

async function create(formData) {

    try {
        const response = await axios.post(createApi, formData);
        const result = response.data;

        return result;

    } catch (e) {
        console.log(e);
    }
};

export async function checkMail(formData) {
    try {
        const response = await axios.post(checkEmail,
            {
                email: formData.get("email"),
            }
        );
        if (response.status === 200) {
            return await create(formData);
        }
    } catch (e) {
        if (e.response && e.response.data.message === "email registered") {

            throw new Error(toast.error("user already exists"));
            
        }

    }
};

//login api//>>>>

export async function login(data) {
    try {
        const response = await axios.post(loginApi, data);
        if (response.data) {
            // alert("logged in successfully");
            toast.success("logged in successfully");
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            return response.data;
        }
    } catch (e) {
        if (e.response.data.message === "Email not found")
            throw new Error( toast.error("Email not found"));
           
        if (e.response.data.message === "Invalid password")
            throw new Error(toast.error("Invalid password"));
            
       
    }
};

// card post

export async function cardPost(formData) {
   try{
const response=await axios.post("http://localhost:8000/api/v1/addCard",formData);
if(response.data) toast.success("course added successfully");
return response.data;
   } catch(e){
throw new Error(e.message)
   }
};

// ! get all cards

export async function getAllCards() {
    try{
const response = await axios.get("http://localhost:8000/api/v1/cards");
return response.data.cards;
    }catch(e){
        throw new Error(e.message);
    }
    
};

//! delete cards

export async function deleteCard(id) {

    try{
const response= await axios.delete(`${deleteCardApi}/${id}`);
if(response){
    toast.success("card deleted successfully");
    return response.data;
}else{
    alert("can not delete card");
}
    }catch(e){
throw new Error (e.message);
    }
    
};

// ! update card

export async function updateCard({id,formData}) {
    try{
        const response=await axios.put(`http://localhost:8000/api/v1/updateCard/${id}`,formData);
        if(response){
            toast.success("card updated successfully");
          return response.data;  
        }
    }catch(e){
throw new Error(e.message);
    }
    
};

// getAlluser----

export async  function getAllUser() {

    try{
const response= await axios.get(getAllUsersApi);
return response.data.data;
    }catch(e){
console.log(e);
    }
};

// delete user Api

export async function deleteUser(id) {
    
    try{
const response = await axios.delete(`${deleteUserApi}/${id}`);
if(response){
    toast.success("user deleted successfully");
    return response.data;
}
    }catch(e){
throw new Error("api error", e.message);
    }

};

//updateUser Api
export async function updateUser({id,formData}) {
    try{
const response=await axios.put(`${updateUserApi}/${id}`,formData);

if (response){
    toast.success("user update successfully");
    return response.data;
}
    }catch(e){
        throw new Error (e.message);
    }
    
};

// product Api calll

export async function productApiCall() {
    try{
const response=await axios.get(productsApi);
return response.data.products;
    }catch(e){
console.log(e);
    }
    
};