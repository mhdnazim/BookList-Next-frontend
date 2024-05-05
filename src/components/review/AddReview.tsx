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

interface Props {
    bookId : string
    open : boolean
    handleClickClose : () => void,
    setNewReview : any
    
}

const AddReview = ({ open, handleClickClose, bookId, setNewReview}: Props) => {
    const [value, setValue] = useState<boolean>(false)

    const schema = yup.object().shape({
        rating: yup.number().required(),
        review: yup.string().required()
    })

    const { register, handleSubmit, reset } = useForm({
    })

    function onSubmit(data:any) {
        schema.validate(data)
            .then(valid => console.log(valid))
            .catch(error => console.log(error))
        const { rating, review } = data
        data.book_id = bookId

        const storedToken = localStorage.getItem('access_token')

        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        }

        addReviewAction(data, headers)
    }

    const addReviewAction = async (data: any, headers: any) => {
        setNewReview(true)
        const addReview = await axios.post('https://booklist-node-backend.onrender.com/review/add', data, headers).then(res => {
            console.log(res.data, "addReview")
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
        reset({
                rating: 0,
                review: ""
            })
    }


    return (
        <>
                <Dialog
                    open={open}
                    onClose={handleClose}>
                    <DialogTitle>Add Review</DialogTitle>
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
                            <Button color="success" type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </Dialog>
        <CommonSnackBars value={value} setValue={setValue} />
                
        </>
    )
}

export default AddReview
