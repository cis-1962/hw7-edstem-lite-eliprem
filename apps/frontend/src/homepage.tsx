import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useSWR from "swr";

// import { getContacts } from "../questions";

// export async function loader() {
//   const contacts = await getContacts();
//   return { contacts };
// }

const fetcher = (url) => axios.get(url).then((res) => res.data);

// const res = await fetch('/api/questions', { method: 'GET' });
// const questionData = (await res.json()) as { message: string };



function EdStem() {
    //const { data: userData } = useSWR('/api/account', fetcher);
    // const { data: questions } = useSWR('/api/questions', fetcher);
    // const [loggedIn, setLoggedIn] = useState(false);
    //const [newQuestion, setNewQuestion] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [answer, setAnswer] = useState('');

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
            await axios.post('/api/questions', { questionText: newQuestion });
            setShowModal(false);
            setNewQuestion('');
            // Fetch updated questions
            const response = await axios.get('/api/questions');
            setQuestions(response.data);
        } catch (error) {
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
                        <button className='item' onClick={handleShowModal}>Add a new question!</button>
                    ) : (
                        <button className='item' onClick={routeLogin}>Log in to submit a question!</button>
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
                    <Outlet />
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a New Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="questionText">
                            <Form.Control type="text" placeholder="Enter question here" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddQuestion}>
                            Save Question
                        </Button>
                    </Modal.Footer>
            </Modal>
        </>
    )
}

export default EdStem;