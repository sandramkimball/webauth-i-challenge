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
            <H2>Behold the Legends</H2>
            {require.session && (
                <div>
                    {users.map(user=> (
                        <LI key={user.user}>{user.username}</LI>
                    ))}
                </div>
            )}
            
        </div>
    )
}

export default UserList;

const LI = styled.li`
    margin: 10px auto;
    font-size: 20px;
    color: white;
    list-style: none;
    :hover{
        transform: scale(1.1);
        cursor: pointer;
    }
`;

const H2 = styled.h2`
    font-family: 'Pompiere', cursive;
    font-size: 36px;
`;

 /* font-family: 'Voltaire', sans-serif;
font-family: 'Pompiere', cursive;
font-family: 'Aref Ruqaa', serif; */