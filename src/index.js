const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const bcrypt = require('bcryptjs')


const app = express()
const port = process.env.PORT

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        /*if(!file.originalname.endsWith('.pdf')) {
            return cb(new Error('Please, upload a pdf'))
        }*/

        if (!file.originalname.match(/\.(doc|docx)/)) {
            return cb(new Error('Please, upload a doc or docx'))
        }

        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message })
})

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port' + port)
})


/*app.use((req, res, next) => {
    if(req.method === 'GET') {
        res.send('GET method is disabled')
    } else {
        next()
    }
})*/


/*
const Task = require('./models/task')
const User = require('./models/user')
const main = async () => {
    /*const task = await Task.findById('6196ad143c9cea5219d06b48')
    await task.populate('owner')
    console.log(task.owner)/

    const user = await User.findById('6196ab3fe80bb3eb34d7a64e')
    await user.populate('tasks')
    console.log(user.tasks)
}

main()
*/




/*
const pet = {
    name: 'hal'
}

pet.toJSON = function () {
    console.log(this)
    return this
}

console.log(JSON.stringify(pet))
*/


/*
const jwt = require('jsonwebtoken')

const myfunction = async () =>{
    const token = jwt.sign({ _id: 'abc123' }, 'thismynewcourse', {expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token, 'thismynewcourse')
    console.log(data)
}

myfunction()
*/
















/*const myFunction = async () => {
    const password = 'Red123456'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Red123456', hashedPassword)
    console.log(isMatch)
}

myFunction()

*/




// Using Promises
/* const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const Task = require('./models/task.js')

const app = express()
const port = process.env.port || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch(error => {
        res.send(error)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then(user => {
        if(!user) {
            return res.status(404).send("Not Found")
        }

        res.send(user)
    }).catch(e => {
        res.status(500).send(e)
    })

    //console.log(req.params)
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task);
    }).catch(error => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
}) 

// Get All tasks
app.get('/tasks', (req, res) => {
    const task = Task.find({}).then(tasks => {
        res.status(200).send(tasks)
    }).catch(e => {
        res.status(500).send(e)
    }) 
})

// Get Task By Id
app.get('/tasks/:id', (req, res) => {
    const task_id = req.params.id

    Task.findById(task_id).then(task => {
        if (!task) {
            return res.status(404).send("Not Found")
        }
        res.status(200).send(task)
    }).catch(e => {
        res.status(500).send(e)
    })
}) */