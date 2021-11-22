const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const taskRouter = new express.Router()


taskRouter.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get All tasks
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20 => get third page as each page = 10 tasks
// GET /tasks?sortBy=createdAt:asc
taskRouter.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const sortParams = req.query.sortBy.split(':')
        sort[sortParams[0]] = sortParams[1] === 'asc'? 1: -1
    }

    try {
        // const tasks = await Task.find({owner: req.user._id})  
        //await req.user.populate('tasks')
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
 
    } catch (error) {
        res.status(500).send(e)
    }
})

// Get Task By Id
taskRouter.get('/tasks/:id', auth, async (req, res) => {
    const task_id = req.params.id

    try {
        //const task = await Task.findById(task_id)

        const task = await Task.findOne({_id: task_id, owner: req.user._id})

        if (!task) {
            return res.status(404).send("Not Found")
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(e)
    }

})

// Update Task by ID
taskRouter.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation)
        return res.status(400).send("Error: invalid updates")
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
        if(!task) {
            return res.status(404).send("Not found")
        }
        
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete Task
taskRouter.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send("Not found")
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = taskRouter