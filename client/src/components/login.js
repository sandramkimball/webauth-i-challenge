import React from 'react';
import axiosWithAuth from '../utilis/axiosWithAuth';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

class Login extends React.Component{
    state = {
        credentials: {
            username: '',
            password: '',
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    };

    login = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/api/auth/login', this.state.credentials)
        .then (res=> {
            return <Redirect to='/UserList'/>
            // this.props.history.push('api/users')
        })
        .catch(err=>console.log('Wrong move, witch.', err))
    };

    render(){
        return (
            <div>
            <Form>
                <input
                    type='text'
                    name='username'
                    value={this.state.credentials.username}
                    placeholder='username'
                    onChange={this.handleChange}
                />

                <input
                    type='password'
                    name='password'
                    value={this.state.credentials.password}
                    placeholder='password'
                    onChange={this.handleChange}
                />

                <Button type='submit' onClick={this.login}>Login</Button>

            </Form>
            </div>
        )
    }
}

export default Login;

const Form = styled.form`
    max-width: 35%;
    padding: 15px 5px;
    background: rgb(123, 141, 137);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    input{
        border: none;
        width: 80%;
        height: 30px;
        margin: 15px auto;
    }
`;
const Button = styled.button`
    width: 100px;
    background: none;
    padding: 10px 0;
    margin: 0 auto;
    font-size: 18px;
    border: 1px solid black;
    :hover{
        transform: scale(1.2)
    }
`;