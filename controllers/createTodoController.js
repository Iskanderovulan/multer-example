import Todo from "../models/Todo.js"

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body
        const todo = {
            title,
            description,
            userId: req.user.userId,
            // todoImage: req.file.filename
        }
        req.file?.filename ? todo.todoImage = req.file.filename : null

        if (!title && !description && !req.file) {
            return res.status(400).send({ message: 'Title, description or image is required' })
        }

        const todoForMongoose = new Todo(todo)
        await todoForMongoose.save()
        return res.status(200).send({
            success: {
                message: 'Todo has been added successfully'
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export { createTodo }