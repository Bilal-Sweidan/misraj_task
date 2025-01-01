const bcryptjs = require('bcryptjs')
function Hash(password){
    const salt = bcryptjs.genSaltSync()
    return bcryptjs.hashSync(password,salt)
}

function Compare(raw,hashed){
    return bcryptjs.compareSync(raw,hashed)
}

module.exports = { Hash , Compare }