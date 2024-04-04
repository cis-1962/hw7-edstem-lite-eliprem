//this is the individual component for a question that is going to be always present beside the sidebar

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Question = () => {
    const [question, setQuestion] = useState({
        _id: "",
        questionText: "",
        answer: "",
        author: ""
    });

    const [newAnswer, setNewAnswer] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchLoggedIn = async () => {
            try {
                const response = await axios.get('/api/account');
                setLoggedIn(response.data.loggedIn);
            } catch (error) {
                // eslint-disable-next-line no-alert
                alert('Error checking login status. Please try again.');
            }
        };

        const interval = setInterval(fetchLoggedIn, 2000);

        return () => clearInterval(interval);
    }, []);
    

    useEffect(() => {
    // Fetch question data using the _id from the URL
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/api/questions/${id}`);
        setQuestion(response.data);
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert("Error fetching question");
        //console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
    }, [id]);

    const handleAnswerQuestion = async () => {
        try {
            await axios.post('/api/questions/answer', {
                _id: question._id,
                answer: newAnswer
            });
            setQuestion(prevQuestion => ({
                ...prevQuestion,
                answer: newAnswer
            }));
            setNewAnswer("");
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert("Error submitting answer");
            //console.error("Error submitting answer:", error);
        }
    };

    return (
        <div id="contact">
            <div className="shadow">
                <h1>
                    {question.questionText}
                </h1>

                <b>Author: </b>
                <p>{question.author}</p>

                <b>Answer: </b>
                <p>{question.answer}</p>
            </div>

            {loggedIn ? ( //this condition is depending if user is logged in (different button options depending)
                <div className="flex-col shadow">
                    <p>Answer this question:</p>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Answer the question here"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <button type="button" className="btn btn-primary" onClick={handleAnswerQuestion}>
                        Submit Answer
                    </button>
                </div>
                ) : (
                    <span className="font-1"></span>
            )}
        </div>
    );
};

export default Question;