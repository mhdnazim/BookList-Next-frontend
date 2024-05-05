import React, { useContext, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Grid } from "@mui/material"
import * as yup from 'yup'
import axios from "axios"
import { useForm } from "react-hook-form"
import CommonSnackBars from "../snackBars/CommonSnackBar"

interface Props {
    open : boolean
    handleClickClose : () => void
}

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    author: yup.string().required(),
    genre: yup.string().required(),
    star_rating: yup.number().required(),
    published: yup.string().required(),
    price: yup.number().required(),
    language: yup.string().required()
})
const AddBook = ({ open, handleClickClose}: Props) => {
    const [value, setValue] = useState<boolean>(false)
    const [profile, setProfile] = useState([])
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    // const unique_id = getRandomInt(10, 100)

    useEffect(() => {
        console.log(image, "useEffect")
        if (image) {
        const img: any = image
        URL.createObjectURL(img)
        setPreview(URL.createObjectURL(img))
        }
    }, [image])


    const { register, handleSubmit, reset } = useForm({
    })

    const handleFile = (e: any) => {
      console.log('hi')
      setImage(e.target.files[0])
      // console.log(e.target.files[0], "handle image")
    }
    

    function onSubmit(data:any) {
        schema.validate(data)
            .then(valid => console.log(valid))
            .catch(error => console.log(error))
        console.log(data,"hi")
        const { name, author, genre, star_rating, published, price, language, image } = data


        console.log(image, "image")

        const formData = new FormData()
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

        AddBookAction(formData, headers)
    }

    const AddBookAction = async (data: any, headers: any) => {
        const addBook = await axios.post('https://booklist-node-backend.onrender.com/book/add', data, headers).then(res => {
            console.log(res.data, "addBook")
            setValue(true)
            setPreview("")
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
        handleClickClose()
        setPreview("")
        reset({
                name: "",
                author: "",
                genre: "",
                star_rating: null,
                published: "", 
                price: null, 
                language: "", 
                image: ""
            })
    }


    return (
        <>
                <Dialog
                    open={open}
                    onClose={handleClose}>
                    <Grid item sx={{ display: "flex", justifyContent: "space-between"}}>
                        <DialogTitle>Add new Book</DialogTitle>
                    </Grid>
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
                                        required
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
                            <Button color="success" type="submit">Add</Button>
                        </DialogActions>
                    </form>
                </Dialog>
        <CommonSnackBars value={value} setValue={setValue} />
        </>
    )
}

export default AddBook
