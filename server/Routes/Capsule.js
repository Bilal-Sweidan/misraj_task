const express = require('express')
const router = express.Router()

const { Capsules, Accounts } = require('../Schema/Schema')

router.post('/create', async (req, res) => {
    console.log(req.body)
    const { userId, title, text_content, day, time } = req.body
    try {

        const capsule = await Capsules.create({
            title,
            text_content,
            release_day: day,
            release_time: time,
        })
        const account = await Accounts.updateOne({ _id: userId }, { $push: { capsules: capsule._id } })

        res.status(200).json({ message: "time capsule has added", success: true });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "time capsule adding fail", success: false });
    }
})

// const { checkCapsuleStatus } = require('../modules/CheckCapsule')
router.get('/:capsule_id', async (req, res) => {
    const { capsule_id } = req.params
    try {
        const data = await Capsules.findOne({ _id: capsule_id })
        const days = Date.parse(data.release_day) - Date.now() +1;
        // const time = data.release_time.split(':')
        // const hours = new Date(Date.now()).getHours() == time[0]
        // const minutes = new Date(Date.now()).getMinutes() == time[1]
        console.log(days)
        if (days <= 0 ) {
            await Capsules.updateOne({ _id: capsule_id } , {release_statuse : true})
            res.status(200).json(data)
        }else{
            const all_data = await Capsules.findOne({ _id: capsule_id }).select("-text_content")
            res.status(200).json(all_data)
        }
    } catch (err) {
        console.log(err)
    }
})


// async function checkCapsuleStatus(req, res, next) {
//     try {
//         const  data = await Capsules.find()
//         console.log(data)
//         const days = Date.parse(release_day) - Date.now();
//         const time = release_time.split(':')
//         const hours = new Date(Date.now()).getHours() == time[0]
//         const minutes = new Date(Date.now()).getMinutes() == time[1]
//         if (days + 1 < 0 || days + 1 == 0 && hours <= 0 && minutes <= 0) {
//             release_statuse = true
//         }
//         return next()
//     } catch (err) {
//         console.log(err)
//     }
// }

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

router.put('/edit', async (req, res) => {
    const { capsule_id , title , text_content, day , time} = req.body
    try {
        await Capsules.updateOne({ _id: capsule_id }, { title,text_content,release_day : day ,release_time : time })
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({ success: false })
        console.log(err)
    }
})

module.exports = router