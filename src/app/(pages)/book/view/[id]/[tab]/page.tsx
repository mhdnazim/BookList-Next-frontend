'use client'
import View from '@/components/books/View'
import MainTab from '@/components/tabs/MainTab';
import BookView from '@/components/tabs/MainTab'
import { Box, Grid } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


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

const TabPage = ({params}: {params: {id: string, tab: string}}) => {
  const [viewedBook, setViewedBook] = useState<BookData>(defaultBookData)
  const [newReview, setNewReview] = useState(false)
  

  useEffect(() => {
        const storedToken = localStorage.getItem("access_token")
        const viewBook = async () => {
        await axios.post(`http://localhost:8100/book/view`, { _id: params.id } , {
        headers: {Authorization: `Bearer ${storedToken}` } }).then(res=>{
            setViewedBook(res.data.data)
            }).catch(error => {
            console.log(error.message);
        })
        }
        viewBook()
        
    }, [params.id])

    useEffect(() => {
        // console.log(viewedBook, "viewedBook from parent")
        console.log(newReview, "Value Changed of review")
    }, [viewedBook])

  return (
    <>
      <Box>
        <Grid container className='container' style={{ marginTop: "20px" }}>
          <Grid item xs={12} lg={6} >
              <View bookId={ params.id } bookDetails={ viewedBook } setNewReview={ setNewReview } />
          </Grid>
          <Grid item xs={12} lg={6} >
              <MainTab newReview={newReview} id={params.id} tab={params.tab || 'details'} bookDetails={viewedBook} setNewReview={ setNewReview }/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default TabPage