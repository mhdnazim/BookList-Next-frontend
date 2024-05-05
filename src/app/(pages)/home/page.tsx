'use client'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { useTheme } from '@mui/material/styles';
import axios from 'axios'


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
}[]

const defaultBookData =[{
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
}]

interface reviewsData {
    _id: string,
    user: {
        first_name : string,
        last_name : string
    },
    book: {
        name : string
    },
    rating: number,
    review: string,
    createdAt: string;
    updatedAt: string;
}[]

const defaultReviewData =[{
   _id: "",
    user: {
        first_name : "",
        last_name : ""
    },
    book: {
        name : ""
    },
    rating: 0,
    review: "",
    createdAt: "",
    updatedAt: "",
}]

const Home = () => {
  const theme = useTheme();
     const [fetchBooks, setFetchBook] = useState<BookData[]>(defaultBookData)
     const [topBooks , setTopBooks] = useState<BookData[]>(defaultBookData)
     const [reviews , setReviews] = useState<reviewsData[]>(defaultReviewData)

   useEffect(() => {
        const storedToken = localStorage.getItem("access_token")
        const listBook = async () => {
        await axios.post(`https://booklist-node-backend.onrender.com/book/list/`, null, {
        headers: {Authorization: `Bearer ${storedToken}` } }).then(res=>{
            const apiData = res.data.data;
            console.log(apiData , "apiData")
            setFetchBook(apiData)
            }).catch(error => {
            console.log(error.message);
        })
        }
        listBook()

        const listReviews = async () => {
        await axios.post(`https://booklist-node-backend.onrender.com/review/list`, null, {
        headers: {Authorization: `Bearer ${storedToken}` } }).then(res=>{
            const apiData = res.data.data;
            console.log(apiData , "apiData")
            setReviews(apiData)
            }).catch(error => {
            console.log(error.message);
        })
        }
        listReviews()

        
        
    }, [])

     useEffect(() => {
        const filteredList = fetchBooks.sort((a,b) => a.star_rating - b.star_rating  ).slice(fetchBooks.length-2)
        console.log(filteredList, "filtered list")
        console.log(reviews, "reviews")
        setTopBooks(filteredList)
     },[fetchBooks,reviews])

    // useEffect(() => {
    //     console.log(fetchBooks, "books from home")
    //     console.log(topBooks, "top books");
    // },[fetchBooks, topBooks])
  
  return (
    <>
    <Box id="banner">
        <Grid container className="container">
          <Grid className="banner">
            <Typography className='title' variant="h2">
              Books are a uniquely <br /> portable magic.
            </Typography>
            <Typography variant="h6">
                Books are important for the mind, heart, and soul. <br /> But don't take it from us: These quotes about reading speak for themselves
            </Typography>
          </Grid>
        </Grid>
    </Box>

      <Box id="top_rated" sx={{margin : "30px auto"}}>
        <Grid container className='container'>
           <Grid xs={12}>
             <Typography variant='h3' sx={{marginBottom : "30px"}}>
                Top Rated Books
            </Typography>
           </Grid>
             <Grid item xs={12} sx={{display: {md: 'flex'}, justifyContent: 'center'}} className="cards-item">
                 {topBooks.map((books) => {
                return (
                   <Grid key={books._id} item xs={12} sm={12} md={6} lg={4} >
                    <Card sx={{ maxWidth: "auto" }} className='cards'>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="300px"
                            image={books.image}
                            alt="Book Name"
                            />
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
                            <Typography variant="body2" color="text.secondary">
                                {books.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {books.genre}
                            </Typography>
                            <Typography component="legend">Rating</Typography>
                                <Rating value={books.star_rating} name="read-only"  readOnly />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                   </Grid>
               )
              })} 
             </Grid>
        </Grid>
      </Box>

      <Box id="reviews" sx={{padding : "30px 0"}}>
        <Grid container className='container'>
            <Grid xs={12}>
                <Typography variant='h2' sx={{ color: "white" }}>
                    Top Reviews
                </Typography>
            </Grid>
            <Grid xs={12}>
                <Carousel>
                            {reviews.map((review) => {
                                return (
                    <Grid key={ review._id }>
                        <Card sx={{ flexDirection:{ xs : 'column' }, display: "flex" , justifyContent : 'center', alignItems : 'center'}}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                                alt="Live from space album cover"
                            />
                                    <Grid xs={12} lg={10} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {`${review.user.first_name} ${review.user.last_name}`}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {review.book.name}
                                    </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex',flexDirection:"column" ,alignItems: 'center', pl: 1, pb: 1 }}>
                                    
                                        <Typography component="legend">Rating : </Typography>
                                        <Rating value={review.rating} name="read-only"  readOnly /> <br />
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {review.review}
                                    </Typography>
                                    </Box>
                                </Grid>
                            </Card>
                    </Grid>
                            )
                                })}
                </Carousel>
            </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Home