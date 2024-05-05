'use client'
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import Reviews from './Reviews';
import { Grid } from '@mui/material';
import AuthorDetails from './AuthorDetails';
import BookDetails from './BookDetails';


interface Props {
    id : string
    tab: string
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

const MainTab = ({ id, tab,  bookDetails,newReview, setNewReview }: Props) => {
    const [activeTab, setActiveTab] = useState('details')
    const router = useRouter()
    const handleChange = (event: SyntheticEvent, value: string)=> {
        setActiveTab(value)
        console.log(value)
        router.push(`/book/view/${id}/${value}`)
    }
    useEffect(()=> {
        if (tab && tab !== activeTab ) {
            setActiveTab(tab)
        }
    }, [])
  return (
    <TabContext value={activeTab}>
    <Grid sx={{display: "flex", justifyContent:"center" }}>
      <MuiTabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
    >
        <Tab value='details' label='Details' />
        <Tab value='author' label='Author'  />
        <Tab value='review' label='Review'  />
    </MuiTabList>
    </Grid>
    <Box sx={{ mt: 4, display: "flex", justifyContent:"center"  }}>
            <>
                <TabPanel sx={{ p: 0 }} value='details'>
                   <BookDetails bookDetails={bookDetails}/>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='author'>
                   <AuthorDetails bookDetails={bookDetails}/>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='review'>
                   <Reviews newReview={newReview} setNewReview={setNewReview} bookDetails={bookDetails}/>
                </TabPanel>
            </>
    </Box>
</TabContext>
  )
}

export default MainTab
