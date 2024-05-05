import React, { useContext, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Grid } from "@mui/material"
import * as yup from 'yup'
// import { useForm } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { useForm } from "react-hook-form"
import CommonSnackBars from "../snackBars/CommonSnackBar"

interface BooksData {
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

interface Props {
    edit : boolean
    handleEditClose : () => void
    book : BooksData
}

const EditBook = ({ edit, handleEditClose, book}: Props) => {

    const [value, setValue] = useState<boolean>(false)
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")

    const { register, handleSubmit, reset } = useForm({ })

     // Output: "yyyy-mm-dd"
        // const converted = formattedDate.toString().slice(10).split("-").reverse().join("-")

    const initialValue = (book: BooksData) => {
         reset({
                name: book.name,
                author: book.author,
                genre: book.genre,
                star_rating: book.star_rating,
                published: bookDate, 
                price: book.price, 
                language: book.language, 
                image: book.image
            })
    }
    
    const date = new Date(book.published);
   const formattedDate = date.toLocaleDateString('en-GB', {
       year: 'numeric' ,
       month: '2-digit',
       day: '2-digit'
    });
    // console.log(formattedDate.toString().split("/").reverse().join("-"));

    const bookDate = formattedDate.toString().split("/").reverse().join("-")
    
    useEffect(() => {
        console.log(book , "from useEffect")
        initialValue(book)
        // console.log(book.image , "image")
        setPreview(book.image)
    }, [book])

     useEffect(() => {
        console.log(image, "useEffect")
        if (image) {
        const img: any = image
        URL.createObjectURL(img)
        setPreview(URL.createObjectURL(img))
        }
    }, [image])
    // console.log(book, "bookId")

    const handleFile = (e: any) => {
        console.log('hi')
        setImage(e.target.files[0])
    }

    const schema = yup.object().shape({
        name: yup.string().required(),
        author: yup.string().required(),
        genre: yup.string().required(),
        star_rating: yup.number().required(),
        published: yup.string().required(),
        price: yup.number().required(),
        language: yup.string().required()
    })

    function onSubmit(data:any) {
        schema.validate(data)
            .then(valid => console.log(valid))
            .catch(error => console.log(error))
        // console.log(data)
        const { name, author, genre, star_rating, published, price, language, image } = data

        const formData = new FormData()
        formData.append("_id", book._id)
        formData.append("name", name)
        formData.append("author", author)
        formData.append("genre", genre)
        formData.append("star_rating", star_rating)
        formData.append("published", published)
        formData.append("price", price)
        formData.append("language", language)
        formData.append("image", image[0])

        const storedToken = localStorage.getItem('access_token')

        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "content-type": "multipart/form-data"
            }
        }

         EditBookAction(formData, headers)
    }

    const EditBookAction = async (data: any, headers: any) => {
        const EditBook = await axios.patch('https://booklist-node-backend.onrender.com/book/edit', data, headers).then(res => {
            console.log(res.data, "editBook")
            setValue(true)
        })
            .catch(error => {
                console.log(error, "error")
                if (error.response.status === 500) {
                    alert("Something went wrong...!")
                }
            })
            handleClose()
    }

    const handleClose = () => {
        handleEditClose()
    }


    return (
        <>
                <Dialog
                    open={edit}
                    onClose={handleClose}>
                    <DialogTitle>Edit Book</DialogTitle>
                    <Grid sx={{ textAlign: "center"}}>
                        <img
                        src={preview}
                        alt="You cover image will appear Here..."
                        loading="lazy"
                        height={150}
                        />
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="name"
                                        label="Book Title"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        {...register("name")}
                                        
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="author"
                                        label="Author"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        {...register("author")}
                                        
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="genre"
                                        label="Genre"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        {...register("genre")}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="language"
                                        label="Language"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        {...register("language")}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="price"
                                        label="Price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        {...register("price")}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <label htmlFor="published" style={{ fontSize: "12px", color: "#808080" }}>Published Date *</label>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="published"
                                        type="date"
                                        InputProps={{ inputProps: { max: new Date().toJSON().slice(0, 10), min: null } }}
                                        fullWidth
                                        variant="standard"
                                        {...register("published")}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        // required
                                        margin="dense"
                                        id="image"
                                        label="Image"
                                        type="file"
                                        fullWidth
                                        variant="standard"
                                        {...register("image")}
                                        onChange={(e)=> handleFile(e)} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="star_rating"
                                        label="Star Rating"
                                        type="number"
                                        InputProps={{ inputProps: { max: 5, min: 1 } }}
                                        fullWidth
                                        variant="standard"
                                        {...register("star_rating")}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Update</Button>
                        </DialogActions>
                    </form>
                </Dialog>
        <CommonSnackBars value={value} setValue={setValue} />
        </>
    )
}

export default EditBook
