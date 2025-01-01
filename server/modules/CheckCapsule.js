const { Capsules } = require("../Schema/Schema")
const mongoose = require('mongoose')
async function checkCapsuleStatus(req,res,next) {
    try {
        const { release_time, release_day, release_statuse } = await Capsules.find()
        const days = Date.parse(release_day) - Date.now();

        const time = release_time.split(':')
        const hours = new Date(Date.now()).getHours() == time[0]
        const minutes = new Date(Date.now()).getMinutes() == time[1]
        if (days + 1 < 0 || days + 1 == 0 && hours <= 0 && minutes <= 0) {
            release_statuse = true
        }
        return next()
    } catch (err) {
        console.log(err)
    }
}

module.exports = checkCapsuleStatus