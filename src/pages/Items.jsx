import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';

import { setPostsApiData, setUsersApiData } from '../redux/tableReducer'
import UserTable from '../components/tables/UserTable'
import PostTable from '../components/tables/PostTable'
import useApi from '../hook/api'

export default function Items() {
    // getting data from redux state
    const { usersApiData: usersOrg, postsApiData: postsOrg } = useSelector((state) => state)

    const dispatch = useDispatch()
    const { get } = useApi()

    useEffect(() => {
        // handle action
        initData()
    }, [])

    const initData = async () => {
        // getting data from apis
        let usersData = await get("https://jsonplaceholder.typicode.com/users")
        let postsData = await get("https://jsonplaceholder.typicode.com/posts")

        // setting data in redux state
        dispatch(setUsersApiData(usersData))
        dispatch(setPostsApiData(postsData))
    }

    return (
        <div>
            <div style={{ direction: 'rtl' }}>
                <Link to="/selected">
                    <Button variant="contained">Selected items</Button>
                </Link>
            </div>
            <hr />
            <br />
            <div className='table_container'>
                <UserTable userData={usersOrg} />
                <PostTable postData={postsOrg} />
            </div>
        </div>
    )
}