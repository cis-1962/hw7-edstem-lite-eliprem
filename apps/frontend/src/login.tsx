import axios from "axios";
import { useState } from "react";
import { Link,  useNavigate } from 'react-router-dom';


function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleSignUp = async () => {
        try {
            //const response = await axios.post('/api/account/signup', { username, password });
            
            history('/');
        } catch (error) {
            alert('Log In failed.');
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form className="flex-col">
                <input
                    className='item'
                    type='text'
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}>
                </input>
                <input
                    className='item'
                    type='text'
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
                <button className='item' onClick={handleSignUp}>Log In</button>
                <p>Don&apos;t have an account?</p>
                <Link to="/signup">Sign up here!</Link>
            </form>
        </div>
    );
};

export default LogIn;