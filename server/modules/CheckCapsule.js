const { Capsules } = require("../Schema/Schema")
const moment = require('moment')
const mongoose = require('mongoose')
async function checkCapsuleStatus(req, res, next) {
    try {
        const data = await Capsules.find()
        data.forEach(async capsule => {
            const utc_time = moment(capsule.release_day.toISOString().substring(0, 11) + capsule.release_time + `:00`)
            const local_time = utc_time.local()
            const remaining = moment.duration(utc_time.diff(moment().local()))
            const remaining_days = remaining.asDays()
            const remaining_hours = remaining.asDays() * 24
            const remaining_minutes = Math.floor(remaining_hours * 60)
            const remaining_seconds = remaining_minutes * 60
            if(remaining_days <= 0 && remaining_hours <= 0 && remaining_minutes <= 0 ){
                await Capsules.updateOne({ _id: capsule._id }, { release_statuse: true })
            }
        });
        return next()
    } catch (err) {
        console.log(err)
    }
}

module.exports = checkCapsuleStatus