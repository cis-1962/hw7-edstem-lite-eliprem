//this is the individual component for a question that is going to be always present beside the sidebar

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Question = () => {
    const [question, setQuestion] = useState({
        questionText: "",
        answer: "",
        author: ""
    });

    const { id } = useParams();

    useEffect(() => {
    // Fetch question data using the _id from the URL
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/api/questions/${id}`);
        setQuestion(response.data);
      } catch (error) {
        alert("Error fetching question");
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
    }, [id]);

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

            {/* <div>
                <Form action="edit">
                    <button type="submit">Edit</button>
                </Form>

                <Form
                    method="post"
                    action="destroy"
                    onSubmit={(event) => {
                        if (
                            !confirm(
                                "Please confirm you want to delete this record."
                            )
                        ) {
                        event.preventDefault();
                        }
                    }}
                    >
                    <button type="submit">Delete</button>
                </Form>
            </div> */}
        </div>
    );
};

export default Question;