import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Rating, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditReview from '../review/EditReview';
import { EditRounded } from '@mui/icons-material';

interface Props {
    bookDetails : {
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
    },
    newReview : boolean,
    setNewReview : any
}

interface reviewsData {
    _id: string,
    user: {
        first_name : string,
        last_name : string,
        _id : string
    },
    book: {
        name : string
    },
    rating: number,
    review: string,
    createdAt: string;
    updatedAt: string;
}

const defaultReviewData =[{
  _id: "",
    user: {
        first_name : "",
        last_name : "",
        _id : ""
    },
    book: {
        name : ""
    },
    rating: 0,
    review: "",
    createdAt: "",
    updatedAt: "",
}
]

const myReviewData ={
  _id: "",
    user: {
        first_name : "",
        last_name : "",
        _id : ""
    },
    book: {
        name : ""
    },
    rating: 0,
    review: "",
    createdAt: "",
    updatedAt: "",
}


const Reviews = ( { bookDetails, newReview, setNewReview }: Props ) => {


    const [reviews , setReviews] = useState<reviewsData[]>(defaultReviewData)
    const [open, setOpen] = useState<boolean>(false)
    const [myReview, setMyReview] = useState<reviewsData>(myReviewData)

    const handleClickClose = () => {
      setOpen(false)
    }

    const handleEditReview = (review: reviewsData) => {
      setOpen(true)
      setMyReview(review)
    }

    const userId = localStorage.getItem("user_Id")

    console.log(userId , "id from review ")

     useEffect(() => {
        console.log(bookDetails._id, "test id")
        if (bookDetails._id) {
          const storedToken = localStorage.getItem("access_token")
          const viewReview = async () => {
          await axios.post(`http://localhost:8100/review/view`,  {_id: bookDetails._id}  , {
          headers: {Authorization: `Bearer ${storedToken}` } }).then(res=>{
              setReviews(res.data.data)
              }).catch(error => {
              console.log(error.message);
          })
        }
        viewReview()
        console.log("worked")
      }   
    }, [bookDetails._id,newReview])

    useEffect(() => {
        console.log(reviews, "review from child")
    }, [reviews])


  return (
    <>
      {reviews.length === 0 ? 
      <Grid><Typography variant='h5' sx={{ color: "red"}}>No reviews</Typography></Grid> :
      reviews.map((review) => {
        return (
          <Card key={review._id}  style={{ maxWidth: "350px", marginBottom: "20px"}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${ review.user.first_name } ${ review.user.last_name }`}
            {/* { review.user.first_name } */}
          </Typography> <br />
          <Grid sx={{ display: "flex" , justifyContent: "center"}}>
              <Typography variant="body2" color="text.secondary">Rating : </Typography>
              <Rating value={review.rating} name="read-only" readOnly />
          </Grid> <br />
          <Typography variant="body2" color="text.secondary">
             { review.review } 
          </Typography> <br />
        </CardContent>
      </CardActionArea>
      <CardActions>
       { userId === JSON.stringify(review.user._id) ? 
        <Button onClick={() => {handleEditReview(review)}} startIcon={<EditRounded />} >Edit Review</Button> : 
         <Button sx={{ textDecoration: "none", color: "blue" }}></Button>
        }
      </CardActions>
    </Card> 
        )
      })}
      <EditReview myReview={myReview} setNewReview={setNewReview}  open={ open } handleClickClose={ handleClickClose } />
    </>
  )
}

export default Reviews