const {Router} = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')

const router = Router()

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password length should be 6 symbols or more').isLength({min: 6})
    ],
    async (req, resp) => {
     try {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return resp.status(400).json({
                errors: errors.array(),
                message: 'Incorrect register data'
            })
        }
        const {email, password} = req.body

        const person = await User.findOne({email})

        if(person) {
            return resp.status(400).json({message: "This user already exists!"})
        }

        const salt = await bcrypt.genSalt(6)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({email, password: hashedPassword})
        await user.save()

        resp.status(201).json({message: "User was created!"})

    } catch (e) {
        resp.status(500).json({message: "Something went wrong!"})
    }
})

router.post('/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Password length should be 6 symbols or more').isLength({min: 6})
    ],
    async (req, resp) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return resp.status(400).json({
                errors: errors.array(),
                message: 'Incorrect log-in data'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            return resp.status(400).json({message: "This user already is not found! Please, try again!"})
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match) {
            return resp.status(400).json({message: "Password incorrect! Please, try again!"})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        resp.json({token, userId: user.id})

    } catch (e) {
        resp.status(500).json({message: "Something went wrong!"})
    }
})

module.exports = router