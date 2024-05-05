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
import { Reviews } from "@mui/icons-material"
import CommonSnackBars from "../snackBars/CommonSnackBar"

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

interface Props {
    open : boolean
    handleClickClose : () => void,
    myReview : reviewsData,
    setNewReview : any
    
}

const EditReview = ({ open, handleClickClose, myReview, setNewReview}: Props) => {
    const [value, setValue] = useState<boolean>(false)

    const schema = yup.object().shape({
        rating: yup.number().required(),
        review: yup.string().required()
    })

    const { register, handleSubmit, reset } = useForm({
    })

    const initialValue = (myReview: reviewsData) => {
         reset({
                rating : myReview.rating,
                review : myReview.review
            })
    }

    useEffect(() => {
        console.log(myReview, "from edit review")
        initialValue(myReview)
    },[myReview])

    function onSubmit(data:any) {
        schema.validate(data)
            .then(valid => console.log(valid))
            .catch(error => console.log(error))
        const { rating, review } = data
        data._id = myReview._id
        data.user = myReview.user._id

        console.log(data, "full new data of review")

        const storedToken = localStorage.getItem('access_token')

        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        }

        editReviewAction(data, headers)
    }

    const editReviewAction = async (data: any, headers: any) => {
        setNewReview(true)
        const editReview = await axios.patch('https://booklist-node-backend.onrender.com/review/edit', data, headers).then(res => {
            console.log(res.data, "editReview")
            setValue(true)
        })
            .catch(error => {
                console.log(error, "error")
                if (error.response.status === 500) {
                    alert("Something went wrong...!")
                }
            })
            handleClose()
            setNewReview(false)
            
    }

    const handleClose = () => {
        handleClickClose()
    }


    return (
        <>
                <Dialog
                    open={open}
                    onClose={handleClose}>
                    <DialogTitle>Edit Review</DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="rating"
                                        label="Rating"
                                        type="number"
                                        InputProps={{ inputProps: { max: 5, min: 1 } }}
                                        fullWidth
                                        variant="standard"
                                        {...register("rating")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="review"
                                        label="Review"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        {...register("review")}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </Dialog>
        <CommonSnackBars value={value} setValue={setValue} />
        </>
    )
}

export default EditReview
