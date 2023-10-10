import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import RedoIcon from '@mui/icons-material/Redo';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { clearAllItems, removePostItem, removeUserItem } from '../redux/tableReducer';

export default function ItemsSelected() {
    // getting data from redux state
    const { usersSelected, postsSelected } = useSelector((state) => state)

    const dispatch = useDispatch()

    function generateUserData() {
        return usersSelected.map((user) => (
            <div key={user.id}>
                <ListItemText
                    primary={`${user.name} / ${user.website}`}
                    secondary={`Email: ${user.email}`}
                />
                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removeUserItem(user))}>
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                </ListItem>
            </div>
        ))
    }

    function generatePostData() {
        return postsSelected.map((post) => (
            <div key={post.id}>
                <ListItemText
                    primary={`${post.title}`}
                    secondary={`Body: ${post.body}`}
                />
                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => dispatch(removePostItem(post))}>
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                </ListItem>
            </div>
        ))
    }
    return (
        <div>
            <div style={{ direction: 'rtl' }}>
                <Link to="/items">
                    <IconButton edge="end" aria-label="delete" size='large'>
                        <RedoIcon color='primary' />
                    </IconButton>
                </Link>
            </div>
            <hr />
            <br />
            <div className='list_container'>
                <Button variant="contained" onClick={()=>dispatch(clearAllItems())}>Clear all</Button>
                <List dense={false} sx={{ width: "50vw" }}>
                    {generateUserData()}
                    {generatePostData()}
                </List>
                {!!!usersSelected.length & !!!postsSelected.length ?<Alert severity="warning">No items were found to view</Alert>:null}
            </div>
        </div>
    )
}
