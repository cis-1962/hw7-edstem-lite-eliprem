import { useNavigate } from "react-router-dom";


function EdStem () {

    const navigate = useNavigate();
    const routeLogin = () => {
        const path = "/login"
        navigate(path);
    }
    
    
    return (
        <>
            <div id="sidebar">
                <button className='item' onClick={routeLogin}>Log in to submit a question!</button>
                <h1>Questions</h1>
            </div>
        </>
    )
}

export default EdStem;