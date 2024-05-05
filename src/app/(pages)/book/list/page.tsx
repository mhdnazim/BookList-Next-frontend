'use client'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, Link, MenuItem, Rating, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import AddBook from '@/components/books/AddBook'
import EditBook from '@/components/books/EditBook'
import CommonSnackBars from '@/components/snackBars/CommonSnackBar'
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material'

interface BookData {
    _id: string,
    name: string,
    author: string,
    genre: string,
    star_rating: number,
    published: string,
    price: number,
    language: string,
    image: string,
    isDeleted: Boolean,
    createdAt: string;
    updatedAt: string;
}

const defaultBookData ={
    _id: "",
    name: "",
    author: "",
    genre: "",
    star_rating: 0,
    published: "",
    price: 0,
    language: "",
    image: "",
    isDeleted: false,
    createdAt: "",
    updatedAt: ""
}

const List = () => {
  const router = useRouter()

    const [role, setRole] = useState<any>("")
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<boolean>(false)
    const [edit , setEdit] = useState<boolean>(false)
    const [book,setBook] = useState<BookData>(defaultBookData)
    const [fetchBooks, setFetchBook] = useState<BookData[]>([defaultBookData])
    const [work, setWork] = useState<boolean>(false)
    const [query, setQuery] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)

    const handleClickOpen = () => {
      setOpen(true)
    }
    const handleClickClose = () => {
      setOpen(false)
    }
    const handleEditOpen = (book: BookData) => {
      setEdit(true)
      setBook(book)
    }
    const handleEditClose = () => {
      setEdit(false)
    }

    const handleDelete = (bookId: string | number) => {
        // setWork(true)
        const storedToken = localStorage.getItem('access_token')

        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        }

         const deleteBookAction = async () => {
         const deleteBook = await axios.patch('https://booklist-node-backend.onrender.com/book/delete', {_id: bookId}, headers).   then(res => {
            console.log(res.data, "DeleteBook")
            setValue(true)
        })
            .catch(error => {
                console.log(error, "error")
                if (error.response.status === 500) {
                    alert("Something went wrong...!")
                }
            })
    }
    deleteBookAction()
    setWork(true)
    }

    
    // console.log(storedToken, "token")

    const handleView = (books: BookData) => {
        const id = books._id
        router.push(`/book/view/${id}/details`)
    }
    
    
    useEffect(() => {

        const data = {q: query, star_rating : rating, price}

        const storedToken = localStorage.getItem("access_token")
        const listBook = async () => {
        await axios.post(`https://booklist-node-backend.onrender.com/book/list/`, data, {
        headers: {Authorization: `Bearer ${storedToken}` } }).then(res=>{
            setFetchBook(res.data.data)
            }).catch(error => {
            console.log(error.message);
        })
        }
        listBook()
        setWork(false)
        
    }, [open,edit, work,query, rating, price])

    useEffect(() => {
        setRole(localStorage.getItem("role"))
        console.log(fetchBooks, "books")
        console.log(price, "price")
    },[fetchBooks, price,role])

  return (
    <>
        <Box id="banner" sx={{marginBottom : "40px"}}>
        <Grid container className="container">
          <Grid className="banner">
            <Typography className='title' variant="h1">
              Our Top selling Books Are Listed Here...
            </Typography>
          </Grid>
        </Grid>
    </Box>


    <Box  className="filters container">
    <Grid sx={{display:{ md: "flex"},justifyContent:"space-between",alignItems:"center"}}>
        <Typography variant='h2'>Top  Books</Typography>
        { role === "admin" ? <Button variant='contained' color='success' onClick={handleClickOpen} className='add' startIcon={<AddCircleOutline />}>Add</Button> : 
        <Button className='add' >hi</Button>
        }
        <AddBook open={open} handleClickClose={handleClickClose} />
        <EditBook edit={edit} handleEditClose={handleEditClose} book={book}/>
        <CommonSnackBars value={value} setValue={setValue} />
    </Grid>
    </Box>
    <Grid className="filters container"  sx={{ display: "flex", alignItems: "center" }}>
        <FormControl
        variant="filled"
        sx={{ m: 1 ,width: "100%" }}
        >
            <InputLabel id="demo-simple-select-filled-label">
                Sort Book By Price
            </InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={(e)=> setPrice(e.target.value as number)}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={1000}>Below ₹1000</MenuItem>
                <MenuItem value={500}>Below ₹500</MenuItem>
                <MenuItem value={200}>Below ₹200</MenuItem>
                <MenuItem value={100}>Below ₹100</MenuItem>
            </Select>
        </FormControl>
        <FormControl
        variant="filled"
        sx={{ m: 1, width: "100%" }}
        >
                <InputLabel id="demo-simple-select-filled-label">
                    Sort Book By Rating
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                //   value={rating}
                onChange={(e)=> setRating(e.target.value as number)}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={5}>5.0&#9733; Rating</MenuItem>
                    <MenuItem value={4}>4.0&#9733; Rating</MenuItem>
                    <MenuItem value={3}>3.0&#9733; Rating</MenuItem>
                    <MenuItem value={2}>2.0&#9733; Rating</MenuItem>
                    <MenuItem value={1}>1.0&#9733; Rating</MenuItem>
                </Select>
        </FormControl>
            <TextField
            required={true}
            id="outlined-required"
            name="search"
            label="Search"
            sx={{ width: "100%" }}
            onChange={(e)=> setQuery(e.target.value)}
            />
    </Grid>

    <Grid className="cards container" container sx={{display: {md: 'flex'}, justifyContent: 'center'}}>
        
        { fetchBooks.length === 0 ? 
            <Grid><Typography variant='h5' sx={{ color: "red"}}>No Book Found</Typography></Grid>
        :
        fetchBooks.map((books) => {
            return (
                <Grid item key={books._id} sm={4} md={4} lg={4} xs={12}
                    className="cards-item"
                    sx={{ width: "auto", height: "auto",marginBottom:"10px" }}>
                    <Card sx={{ maxWidth: "auto"}}>
                    <CardActionArea onClick={() => {handleView(books)}} >
                        {/* <Link
                        to={`/books/view/${books._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                        > */}
                        <CardMedia
                            component="img"
                            image={books.image}
                            height="400px"
                            width="350px"
                            alt="Book Name"
                        />
                        {/* <Image src="/cover.png" alt="me" width="350" height="400" /> */}
                        <CardContent>
                            { books.name.length > 24 ? 
                                <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                title={books.name} >
                                {books.name.substring(0, 24)}...
                            </Typography> : 
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                title={books.name} >
                                {books.name.substring(0, 24)}
                            </Typography>}
                            <Typography
                            variant="body2"
                            color="text.secondary"
                            >
                            {books.genre}
                            </Typography>
                            
                            <Typography component="legend">Rating</Typography>
                            <Rating value={books.star_rating} name="read-only" readOnly />
                            <Typography
                            variant="body2"
                            color="text.secondary"
                            >
                            ₹ {books.price}
                            </Typography>
                        </CardContent>
                        {/* </Link> */}
                        <CardActions
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                        >
                        </CardActions>
                    </CardActionArea>
                    { role === "admin" ? 
                    <Grid sx={{ display: "flex", justifyContent: "space-between", padding: "0px 10px"  }}>
                    <Button onClick={() => {handleEditOpen(books)}} startIcon={<Edit />}>
                            Edit
                        </Button>
                        <Button color='error' onClick={() => {handleDelete(books._id)}} startIcon={<Delete />}>Delete
                        </Button>
                    </Grid> :
                        <Button onClick={() => {handleView(books)}} color='warning'>View
                        </Button>
                        }
                    </Card>
                </Grid>
                 )
                }) }

    </Grid>
    </>
  )
}

export default List