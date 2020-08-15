import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId: { type: String, required: true },
    todoDetails: { type: String, required: true },
    isCompleted: { type: Boolean },
    createdOn: { type: Date },
});

export default todoSchema;