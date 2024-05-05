import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
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
}
}

const AuthorDetails = ({ bookDetails }: Props) => {
  // console.log(bookDetails, "author")

  const date = new Date(bookDetails.published);
   const formattedDate = date.toLocaleDateString('en-GB', {
       year: 'numeric' ,
       month: '2-digit',
       day: '2-digit'
    });

    const bookDate = formattedDate.toString().split("/").join("-")

  return (
    <>
      <Card style={{ maxWidth: "350px"}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { bookDetails.author }
          </Typography> <br />
          <Typography variant="body2" color="text.secondary">
             { bookDetails.author } is a very famous writer in the world. His book named { bookDetails.name } published on { bookDate }. He is one of the most prolific and versatile writers in modern literature. He was awarded the highest literary award in India Jnanpith for his work { bookDetails.name }.
          </Typography> <br />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          
        </Button>
      </CardActions>
    </Card>
    </>
  )
}

export default AuthorDetails