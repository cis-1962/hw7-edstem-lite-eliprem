import axios from "axios";
import { useState } from "react";
import { Link,  useNavigate } from 'react-router-dom';


function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
 
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('/api/account/login', { username, password });  //don't need /api?
        
            navigate("/");
        }  catch (error) {
            console.error(error.response.data);
            // eslint-disable-next-line no-alert
            if (error.response.status === 401) {
            alert('Invalid username or password.');
        } else {
            alert('Login failed. Please try again later.');
        }
        }

    };

    return (
        <div>
            <h1>Log In</h1>
            <form className="flex-col" onSubmit={handleLogin}>
                <input
                    className='item'
                    type='text'
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}>
                </input>
                <input
                    className='item'
                    type='password'
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
                <button className='item' type="submit">Log In</button>
                <p>Don&apos;t have an account?</p>
                <Link to="/signup">Sign up here!</Link>
            </form>
        </div>
    );
};

export default LogIn;