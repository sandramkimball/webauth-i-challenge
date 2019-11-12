import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utilis/axiosWithAuth";
import styled from 'styled-components';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/users`)
        .then(res=> {
            console.log('List of Users: ', res.data);
            setUsers(res.data);
        })
        .catch(err=> console.log(err))
    }, []);

    return(
        <div>
            <h2>Behold the Legends:</h2>
            {users.map(user=> (
                <LI key={user.user}>{user.username}</LI>
            ))}
        </div>
    )
}

export default UserList;

const LI = styled.li`
    margin: 3px;
    font-size: 24px;
`;