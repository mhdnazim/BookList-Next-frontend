'use client'
import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { colors } from '@mui/material';


const Header = () => {
  const router = useRouter()

  const handleLogin = () => {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('user_Id')
    window.localStorage.removeItem('role')
    router.push('/login')
  }

  return (
    <>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: "white" }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link href={'/home'} style={{ textDecoration: "none", color: "black" }}>BookShelf.com</Link>
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small"
        onClick={() => {handleLogin()}}>
          LogOut
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'center', overflowX: 'auto', columnGap : "20px", bgcolor: "white" }}
      >
        <Link href="/home" style={{ color:"black "}}>
            Home
          </Link>
        <Link href="/book/list" style={{ color:"black "}}>
            Books
          </Link>
        <Link href="/about" style={{ color:"black "}}>
            About
          </Link>
        <Link href="/home" style={{ color:"black "}}>
            Contact
          </Link>
      </Toolbar>
    </>
  )
}

export default Header