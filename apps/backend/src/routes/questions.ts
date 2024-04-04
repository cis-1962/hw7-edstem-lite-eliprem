//Router for handling question updates

import express from "express";
import QuestionModel from "../models/question";
import requireAuth from "../middlewares/require-auth";

const QuestionsRouter = express.Router()

//GET route for fetching all questions
QuestionsRouter.get('/', async (req, res) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions: ', error: error.message });
    };
});

// GET route for fetching a question by ID
QuestionsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const question = await QuestionModel.findById(id);
        if (!question) {
            res.status(404).send('Question not found');
            return;
        }
        res.status(200).send(question);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching question: ', error: error.message });
    }
});

//POST route for adding a question with a body of questionText (should not contain author key, get that elsewhere)
QuestionsRouter.post('/add', requireAuth, async (req, res) => {
    const { questionText } = req.body as {
        questionText: string;
    };
    const author = req.session!.user;

    try {
        const addedQuestion = new QuestionModel({ questionText, author });
        await addedQuestion.save();
        res.status(200).send('Question added successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error adding question: ', error: error.message });
    };
});

//POST route for adding/updating an answer to a question with a body of _id and answer (_id is a built-in attribute of MongoDB)
QuestionsRouter.post('/answer', requireAuth, async (req, res) => {
    const { _id, answer } = req.body as {
        _id: string;  //is this type string?
        answer: string;
    };

    try {
        const question = await QuestionModel.findById(_id);
        
        if (!question) {
            res.status(404).send('Question not found')
            throw new Error('Question not in system'); 
        }

        question.answer = answer;
        await question.save();
        res.status(200).send('Answer added successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error adding answer: ', error: error.message });
    }
});

export default QuestionsRouter;