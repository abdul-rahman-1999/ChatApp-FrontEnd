import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'
import {useFormik} from "formik";
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import UserContext from './ContextAPI/UserContext';


const formValidationSchema = yup.object({
    email:yup.string().required(),
    password:yup.string().required().min(5),
  })

function Login() {

    let navigate = useNavigate()

    let {setUsername, setId} = useContext(UserContext)

    const {handleSubmit, values, handleChange,handleBlur,touched, errors} = useFormik({
      initialValues:{
        email:'',
        password:'',
      },
      validationSchema : formValidationSchema,
      onSubmit:(loginUser) => {
      login(loginUser)
      }
  })

  let login = async(loginUser) => {

    try{
      const res = await axios.post(`/login`,loginUser)
      setId(res.data.id)
      setUsername(res.data.username)
        if (res.data.msg === "Login Successfully") {
         navigate("/chatapp/chatpage")
          }else{
            alert("Invalid Credentials")
          }
     }catch(err){
      alert("Invalid Credentials")
     }
  
  }

  return <>
   
   <Box sx={{backgroundImage: `url(${"https://img.freepik.com/free-photo/young-friends-top-mountain-enjoying-mesmerizing-view_181624-30260.jpg?w=1380&t=st=1676604886~exp=1676605486~hmac=636d18ada6ec81c4728f1c1fe3f67a6df4645526571dbb532ac8d3c9dca3ae6a"})`,
  backgroundRepeat: "no-repeat",backgroundPosition:{xs:"right",sm:"top",md:"top"},backgroundSize:"cover",height:{xs:"100vh",md:"100vh"}}}>

  <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",flexDirection:{xs:"column",sm:"row-reverse"},width:"100%",margin:"0px auto",height:"100vh"}}>
  <Box sx={{width:{xs:"80%",sm:"40%",md:"40%"}}}>
    <h4 style={{color:"white",fontSize:"20px"}}>Make Cool Friends</h4>
    <p style={{color:"white",fontSize:"14px",textAlign:"justify",margin:0}}>Friend Finder is a social network template that can be used to connect people. The template offers Landing pages, News Feed, Image/Video Feed, Chat Box, Timeline and lot more.</p><br/>
    <p style={{color:"white",fontSize:"14px",margin:0}}>Why are you waiting for? Register now.</p>
  </Box>

<Box sx={{padding:"50px 30px",width:{xs:"70%",sm:"40%",md:"400px"},
background: "white",
borderRadius: "16px",}}>

        <h4 style={{color:"#27aae1"}}>SignIn to Your Account</h4>

        <form  onSubmit = {handleSubmit}>
        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",gap:3}}>

        <TextField
         id="outlined-basic"
          label="Email"
           variant="outlined"
           name="email"
           value={values.email}
           onBlur={handleBlur}
           onChange={handleChange}
           type="text"
           error = {touched.email && errors.email}
            helperText =  {touched.email && errors.email ? errors.email :null}
            />
           
        <TextField
         id="outlined-basic"
          label="Password"
           variant="outlined"
           name="password"
           value={values.password}
           onBlur={handleBlur}
           onChange={handleChange}
           type="password"
           error = {touched.password && errors.password}
            helperText =  {touched.password && errors.password ? errors.password :null}
            />

        <Button type="submit" sx={{backgroundColor:"#27aae1",padding:"15px"}} variant="contained">Signup</Button>
        <ToastContainer />
        </Box>
        </form>
        <h5 style={{margin:"10px",color:"black",textAlign:"center"}}>Dont have an Account <span style={{color:"black",cursor:"pointer"}} onClick={() => navigate('/chatapp/register')}>Click here to Register</span></h5>

</Box>
</Box>

  </Box>

  </>
}

export default Login