import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface QuestionInterface {
  questionText: string;
  answer: string;
  author: string;
}

export const QuestionSchema = new Schema<QuestionInterface>({
  questionText: { type: String, required: true },
  answer: { type: String, default: '' },
  author: { type: String, required: true },
});


const QuestionModel = mongoose.model<QuestionInterface>('Question', QuestionSchema);

export default QuestionModel;