const express = require('express')

const router = express.Router()
// Schema
const { Capsules, Accounts } = require('../Schema/Schema')
// modules
const  checkCapsuleStatus  = require('../modules/CheckCapsule')
const {upload} = require('../modules/Multer')

router.post('/create',upload.single('image'), async (req, res) => {
    const { userId, title, text_content, day, time } = req.body
    try {
        const capsule = await Capsules.create({
            title,
            text_content,
            release_day: day,
            release_time: time,
            image: req.file.filename
        })
        const account = await Accounts.updateOne({ _id: userId }, { $push: { capsules: capsule._id } })

        res.status(200).json({ message: "time capsule has added", success: true });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "time capsule adding fail", success: false });
    }
})


router.get('/:capsule_id', checkCapsuleStatus, async (req, res) => {
    const { capsule_id } = req.params
    try {
        const data = await Capsules.findOne({ _id: capsule_id })
        if (data.release_statuse) {
            res.status(200).json(data)
        } else {
            const all_data = await Capsules.findOne({ _id: capsule_id }).select("-text_content -image")
            res.status(200).json(all_data)
        }
    } catch (err) {
        console.log(err)
    }
})


router.post('/delete', async (req, res) => {
    const { capsule_id, user_id } = req.body
    try {
        await Capsules.deleteOne({ _id: capsule_id })
        await Accounts.updateOne({ _id: user_id }, { $pull: { capsules: capsule_id } })
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({ success: false })
        console.log(err)
    }
})

router.put('/edit',upload.single('image'), async (req, res) => {
    const { capsule_id, title, text_content, day, time } = req.body
    try {
        await Capsules.updateOne({ _id: capsule_id }, { title, text_content, release_day: day, release_time: time , image : req.file.filename , release_statuse : false })
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({ success: false })
        console.log(err)
    }
})

module.exports = router