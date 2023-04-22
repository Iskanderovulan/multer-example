import { Schema, model } from 'mongoose'


const TodoSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: false,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    todoImage: {
        type: Buffer, // or Uint8Array
    },

}, { timestamps: true });


export default model('Todo', TodoSchema)
