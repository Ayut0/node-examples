const profiles = require('../Model/users.json')

const showProfile = (req, res) => {
    res.render('profile', { profiles: Object.values(profiles) })
}

module.exports = { showProfile };