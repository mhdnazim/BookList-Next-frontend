'use client'
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormLabel, Radio, RadioGroup } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomizedSnackBars from '@/components/snackBars/snackBarRegsiter';
import * as yup from 'yup'

function Copyright(props: any) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface registerData {
  confirmPassword : string
}

const defaultTheme = createTheme();
const Register = () => {


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("")

    const router = useRouter()

    const [input , setInput] = useState<registerData>({
          confirmPassword : ""
      })

      const schema = yup.object().shape({
    first_name: yup.string().required("hh"),
    last_name: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    date_of_birth: yup.string().required(),
    phone_number: yup.number().required().min(10)
    });

      const { register , handleSubmit } = useForm({ });

      const handleNormalInputs = (e:any) => {
      const { name, value } = e.target
      setInput({ ...input, [name]: value })
      // console.log(input.confirmPassword, "inputs")
    }

    const onSubmit = async (data: any) => {
      schema.validate(data)
            .then(valid => console.log(valid))
            .catch(error => console.log(error))
      if ( input.confirmPassword === data.password) {
         addUser(data)
      }else {
        setValue("Password doesn't matches...")
        setOpen(true)
      }
    }

 const addUser = async (data: any) => {
      const UserRegister = await axios.post('https://booklist-node-backend.onrender.com/user/register', data).then(res => {
        console.log(res.data , "addUser")
        router.push('/login')})
        .catch(error => {console.log(error , "error")
        if (error.response.status === 500){
        setValue("Please fill the form correctly...")
        setOpen(true)
            // alert("Something went wrong...!")
        }
    })
      // router.push('/login')
      }

  return (
    <>
     <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  // name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  {...register("first_name")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  // name="last_name"
                  autoComplete="family-name"
                  {...register("last_name")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
               <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    // name="gender"
                    >
                    <FormControlLabel 
                    {...register("gender")} id='gender' value="female" control={<Radio />} label="Female"/>
                    <FormControlLabel 
                    {...register("gender")} id='gender' value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </Grid>
               <Grid item xs={12} sm={6}>
                <label htmlFor="published" style={{ fontSize: "12px", color: "#808080" }}>Date of Birth*</label>
                <TextField
                  autoComplete="given-name"
                  // name="date_of_birth"
                  required
                  fullWidth
                  type='date'
                  id="date_of_birth"
                  autoFocus
                  {...register("date_of_birth")}
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  // name="phone_number"
                  required
                  fullWidth
                  id="phone_number"
                  label="Phone Number"
                  autoFocus
                  {...register("phone_number")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  // name="email"
                  autoComplete="email"
                  {...register("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  // name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="confirmPassword"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  onChange={ (e) => {handleNormalInputs(e)}}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <CustomizedSnackBars open={open} setOpen={setOpen} value={value} />
      </Container>
    </ThemeProvider>
    </>
  )
}

export default Register