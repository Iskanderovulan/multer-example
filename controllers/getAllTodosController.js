import Todo from "../models/Todo.js"

const getAllTodos = async (req, res) => {
    try {
        console.log(req.user)
        const { userId } = req.user
        console.log(req.params.page, 'check')
        const page = req.params.page || 1; // default to page 1 if no page parameter is provided
        const limit = 5; // number of items to return per page
        const skip = (page - 1) * limit; // calculate the number of items to skip based on the current page and the limit

        const todos = await Todo.find({ userId }).skip(skip).limit(limit);
        const totalTodos = await Todo.countDocuments({ userId });
        const totalPages = Math.ceil(totalTodos / limit) || 1


        const clientTodos = todos.map(todo => {
            const { userId, __v, ...rest } = todo.toObject();
            if (rest.todoImage) {
                rest.todoImage = `${req.protocol}://${req.get('host')}/uploads/${todo.todoImage}`;
            }
            return rest;
        });
        console.log(todos.length)
        res.status(200).send({
            todos: clientTodos,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error: {
                message: 'Internal Server Error'
            }
        });
    }
}

export { getAllTodos }