const express = require('express')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
const router = express.Router()

const { Capsules, Accounts } = require('../Schema/Schema')
const  checkCapsuleStatus  = require('../modules/CheckCapsule')
router.post('/capsules',checkCapsuleStatus, async (req, res) => {
    const {user_id} = req.body
    try {
        const {capsules} = await Accounts.findOne({ _id: user_id })
        const capsule = await Capsules.find({ _id: capsules })
        res.status(200).json(capsule)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})



module.exports = router