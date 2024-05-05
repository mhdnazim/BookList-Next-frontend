import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
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

const BookDetails = ({ bookDetails }: Props) => {

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
            { bookDetails.name }
          </Typography> <br />
          <Typography variant="body2" color="text.secondary">
            Author : { bookDetails.author }
          </Typography> <br />
          <Typography variant="body2" color="text.secondary">
            Genre : { bookDetails.genre }
          </Typography> <br />
          <Grid sx={{ display: "flex" , justifyContent: "center"}}>
              <Typography variant="body2" color="text.secondary">Rating : </Typography>
              <Rating value={bookDetails.star_rating} name="read-only" readOnly />
          </Grid> <br />
          <Typography variant="body2" color="text.secondary">
            Published : { bookDate }
          </Typography> <br />
          <Typography variant="body2" color="text.secondary">
            Language : { bookDetails.language }
          </Typography> <br />
          <Typography variant="body2" color="text.secondary">
            Price : ₹ { bookDetails.price }
          </Typography>
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

export default BookDetails