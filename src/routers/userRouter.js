const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const userRouter = new express.Router()

userRouter.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

})  

// Get All Users
userRouter.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
        console.log("login error")
        res.status(400).send(e)
    }
})

// User logout 
userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// User logout all
userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send()        
    }
})

// Update User
userRouter.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation)
        return res.status(400).send("Error: invalid updates")
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        
        /*if(!req.user) {
            return res.status(404).send("Not found")
        }*/

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete User 
userRouter.delete('/users/me', auth, async (req, res) => {

    try {
        /* const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send("Not found")
        }*/
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload image with jpg, jpeg or png type'))
        }
        cb(undefined, true)
    }

})
// upload profile photo
userRouter.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
     req.user.avatar = buffer //req.file.buffer 
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

userRouter.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

userRouter.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = userRouter