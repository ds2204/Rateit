// auth.tsx
import React, { useState } from 'react';
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { mutationLogin, LoginArgs, LoginResponse } from './mutation'; // Import LoginArgs and LoginResponse
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const mutation: UseMutationResult<LoginResponse, Error, LoginArgs> = useMutation<LoginResponse, Error, LoginArgs>({
        mutationFn: mutationLogin,
        onSuccess: (data) => {
            if (data.success) {
                localStorage.setItem('guest_session_id', data.guest_session_id);
                navigate('/');
            } else {
                // Handle unsuccessful login
                console.error('Login was not successful');
            }
        },
        onError: (error) => {
            // Handle error
            console.error('Error during login:', error);
        }
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ username, password });
    };

    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="blue" textAlign="center">
                    Welcome! Login with your credentials below
                </Header>
                <Form size="large" onSubmit={handleLogin}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button color="violet" size="large" fluid type="submit" loading={mutation.isLoading}>
                            Login
                        </Button>
                        {mutation.isError && <div style={{ color: 'red' }}>Error: {mutation.error.message}</div>}
                        {mutation.isSuccess && <div style={{ color: 'green' }}>Success: You are logged in!</div>}
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};
