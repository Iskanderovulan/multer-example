import Todo from "../models/Todo.js"
import { deleteTodoImage } from "../helpers/deleteTodoImage.js"


const editTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body


        const todo = await Todo.findById(id)
        if (todo.userId !== req.user.userId) {
            return res.status(400).send({ message: 'User validation failed' })
        }

        // Validate input
        if (!title && !description && !req.file) {
            return res.status(400).send({ message: 'Title, description or image is required' })
        }
        await deleteTodoImage(todo.todoImage)

        const updateObject = {}
        if (title) updateObject.title = title
        if (description) updateObject.description = description
        if (req.file) updateObject.todoImage = req.file.filename


        await Todo.findByIdAndUpdate(id, updateObject)
        res.status(200).send({ message: 'TODO IS EDITED' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Internal server error' })
    }
}

export { editTodo }