const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
})








/*
const me = new User({
    name: "    elafifi  ",
    email: "    ElAfifi@yahoo.com         ",
    password: "123456"
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log(error)
})*/


/*const myTask = new Task({
    description: "   description 2     ",
})

myTask.save().then(task => {
    console.log(task)
}).catch(error => {
    console.log("Error: ", error);
})
*/