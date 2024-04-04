import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
//import useSWR from "swr";



function EdStem() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const routeLogin = () => {
        const path = "/login"
        navigate(path);
    }

    //checking if user is logged in
    useEffect(() => {
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('/api/account');
            setLoggedIn(response.data.loggedIn);
            if (response.data.loggedIn) {
                setUsername(response.data.username);
            }
            } catch (error) {
                //console.error('Error checking login status:', error);
                // eslint-disable-next-line no-alert
                alert('Error checking login status. Please try again.');
            }
        };
        const interval = setInterval(checkLoginStatus, 2000);

        return () => clearInterval(interval);
    }, []);

    //get request for list of questions
    useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data);
      } catch (error) {
        //console.error('Error fetching questions:', error);
        // eslint-disable-next-line no-alert
        alert('Error fetching questions. Please try again.');
      }
    };

    const interval = setInterval(fetchQuestions, 2000);

    return () => clearInterval(interval);
    }, []);

    const handleLogout = async (e) => {
        try {
            e.preventDefault();
            await axios.post('/api/account/logout');
            // Redirect or handle logout success
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert('Logout failed.');
        }
    };

    const handleAddQuestion = async () => {
        try {
            await axios.post('/api/questions/add', { questionText: newQuestion });
            setShowModal(false);
            setNewQuestion('');
            // Fetch updated questions
            const response = await axios.get('/api/questions');
            setQuestions(response.data);
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert('Error adding question. Please try again.');
        }
    };

    //modal stuff:
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    
    return (
        <>
            <h2>
                <span className="font-2">EdStem Question Center</span>
                {loggedIn ? ( //this condition is depending if user in logged in
                    <div className="flex-row">
                        <span className="font-1 padright">Hi {username}  </span>
                        <Link to={`login`} onClick={handleLogout}>Log out</Link>
                    </div>

                ) : (
                    <span className="font-1"></span>
                )}
            </h2>
            <div className="flex-row">
                <div id="sidebar">
                    {loggedIn ? ( //this condition is depending if user is logged in (different button options depending)
                        <Button className='item' onClick={handleShowModal} data-toggle="modal" data-target="#myModal">Add a new question!</Button>
                    ) : (
                        <button className='item' onClick={routeLogin}>Log in to submit a question!</button>
                    )}

                    {showModal && (
                        <div className="modal-container">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add a New Question</h5>
                                    {/* <button type="button" className="close" onClick={handleCloseModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button> */}
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter question here"
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                    <span style={{ marginRight: '10px' }}></span>
                                    <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>
                                        Save Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <h1>Questions</h1>
                    <nav>
                        <ul>
                            {questions && 
                                questions.map((question) => (
                                    <li key={question._id}>
                                        <Link to={`/questions/${question._id}`}>
                                            {question.questionText}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>

                <div id="detail">
                    <Outlet/>
                </div>
            </div>
                                

        </>
    )
}

export default EdStem;