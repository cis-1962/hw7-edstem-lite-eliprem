import axios from "axios";
import { useState } from "react";
import { Link,  useNavigate } from 'react-router-dom';


function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleSignUp = async () => {
        try {
            //const response = await axios.post('/api/account/signup', { username, password });
            
            history('/');
        } catch (error) {
            alert('Sign up failed.');
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
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
                <button className='item' onClick={handleSignUp}>Sign Up</button>
                <p>Already have an account?</p>
                <Link to="/login">Log in here!</Link>
            </form>
        </div>
    );
};

export default Signup;