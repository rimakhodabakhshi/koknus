import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import DonIcon from '@mui/icons-material/Done';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

import { addPostSelected } from '../../redux/tableReducer';

export default function PostTable({ postData }) {
    // getting posts data from redux state
    const posts = useSelector((state) => state.postsSelected)

    const dispatch = useDispatch()

    const [filteredPosts, setFilteredPosts] = useState([])
    const [inputValue, setInputValue] = useState([])

    useEffect(() => {
        setFilteredPosts(postData)
    }, [postData])

    if (!!!postData) return null

    const handleSelectedPost = (post) => {
        const exist = posts?.findIndex(e => e.id === post.id) === -1 ? false : true
        return (
            <IconButton onClick={() => !!!exist ? dispatch(addPostSelected(post)) : ""}>{exist ? <DonIcon fontSize="small" /> : <AddIcon fontSize="small" />}</IconButton>
        )
    }

    const handleFilterPosts = () => {
        let titleText = inputValue.target.value
        const filterData = postData.filter(e => e.title.includes(titleText))
        setFilteredPosts(filterData)
    }

    return (
        <div className='table'>
            <TextField id="outlined-basic" label="filter by Title" variant="outlined" onChange={setInputValue} />
            <br />
            <br />
            <Button variant="outlined" onClick={() => handleFilterPosts()}>Search</Button>
            <hr />
            <TableContainer component={Paper} sx={{ maxHeight: "70vh" }} >
                <Table aria-label="posts table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Body</TableCell>
                            <TableCell align="left">Add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPosts.map((post) => (
                            <TableRow
                                key={post.id}
                            >
                                <TableCell align="left">{post.title}</TableCell>
                                <TableCell component="th" scope="row">
                                    {post.body}
                                </TableCell>
                                <TableCell align="center">{handleSelectedPost(post)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}