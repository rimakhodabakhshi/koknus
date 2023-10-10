import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import DonIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

import { addUserSelected } from '../../redux/tableReducer';

export default function UserTable({ userData }) {
    // getting users data from redux state
    const users = useSelector((state) => state.usersSelected)

    const dispatch = useDispatch()

    const [filteredUsers, setFilteredUsers] = useState([])
    const [inputValue, setInputValue] = useState([])

    useEffect(() => {
        setFilteredUsers(userData)
    }, [userData])

    if (!!!userData) return null

    

    const handleSelectedUser = (user) => {
        const exist = users?.findIndex(e => e.id === user.id) === -1 ? false : true
        return (
            <IconButton onClick={() => !!!exist ? dispatch(addUserSelected(user)) : ""}>{exist ? <DonIcon fontSize="small" /> : <AddIcon fontSize="small" />}</IconButton>
        )
    }

    const handleFilterUsers=()=>{
        let emailText=inputValue.target.value
        const filterData = userData.filter(e => e.email.includes(emailText))
        setFilteredUsers(filterData)
    }
    return (
        <div className="table">
            <TextField id="outlined-basic" label="filter by Email" variant="outlined" onChange={setInputValue}/>
            <br/>
            <br/>
            <Button variant="outlined" onClick={()=>handleFilterUsers()}>Search</Button>
            <hr/>
            <TableContainer component={Paper} sx={{ maxHeight: "70vh" }} className='table'>
                <Table aria-label="users table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Website</TableCell>
                            <TableCell align="left">Add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow
                                key={user.id}
                            >
                                <TableCell align="left">{user.name}</TableCell>
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell align="left">{user.address.city}</TableCell>
                                <TableCell align="left">{user.website}</TableCell>
                                <TableCell align="center">{handleSelectedUser(user)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}