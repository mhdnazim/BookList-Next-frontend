'use client'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Rating, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import AddReview from '../review/AddReview'
import { AddComment } from '@mui/icons-material'

type Props = {
    bookId: string,
    bookDetails : BookData,
    setNewReview : any

}


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

const View = ({ bookId, bookDetails, setNewReview }: Props) => {

    // const [viewedBook, setViewedBook] = useState<BookData>(defaultBookData)
    const [open, setOpen] = useState<boolean>(false)

    // console.log(bookId , "BookId from view")

    const handleAddReview = () => {
        setOpen(true)
    }

    const handleClickClose = () => {
      setOpen(false)
    }

    // useEffect(() => {
    //   setNewReview(true)
    //   setNewReview(false)
    // }, [setNewReview])
    

  return (
    <>
    <Grid className="cards container" container sx={{display: {md: 'flex'}, justifyContent: 'center', margin : '0 auto'}}>
        <Grid item 
        // sm={4} md={4} lg={6} 
        xs={12}
            className="cards-item"
            sx={{ width: "230px", height: "auto",marginBottom:"10px" }}>
            <Card sx={{ maxWidth: "auto"}}>
            <CardActionArea>
                {/* <Link
                to={`/books/view/${books._id}`}
                style={{ textDecoration: "none", color: "black" }}
                > */}
                <CardMedia
                    component="img"
                    image={bookDetails.image}
                    height="300px"
                    alt="Book Name"
                />
                <CardContent>
                    <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    >
                    {bookDetails.name}
                    </Typography>
                    
                </CardContent>
                {/* </Link> */}
                <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                </CardActions>
            </CardActionArea>
                <Button onClick={() => {handleAddReview()}} color='success' startIcon={<AddComment />}>
                            Add Review
                        </Button>
            </Card>
        <AddReview bookId={bookId} open={open} handleClickClose={handleClickClose} setNewReview={ setNewReview}/>
        </Grid>

        <Grid item sm={4} md={4} lg={6} xs={12}
            className="cards-item"
            sx={{ width: "230px", height: "auto",marginBottom:"10px" }}>

        </Grid>
    </Grid>
    </>
  )
}

export default View