const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

const router = Router()

router.get('/', auth, async (req, resp) => {
    try {
        const user = await User.findOne({_id: req.user.userId})
        await resp.json(user.email)
    } catch (e) {
        await resp.status(500).json({message: "Something went wrong!"})
    }
})

module.exports = router