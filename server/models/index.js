const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    isAdmin: {type: DataTypes.BOOLEAN, default: false},
    name: {type: DataTypes.STRING, allowNull: false}
})


const Profile = sequelize.define('profiles', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    birthdate: {type: DataTypes.DATE, allowNull: true},
    city: {type: DataTypes.STRING, allowNull: true}
})

const Session = sequelize.define('session', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, allowNull: false},
})

// const Role = sequelize.define('role', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, defaultValue: "USER"}
// })

// const Gender = sequelize.define('gender', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false}
// })

User.hasOne(Session)
User.hasMany(Profile)
// Profile.belongsTo(User)

// Role.hasMany(User)
// User.belongsTo(Role)

// Gender.hasMany(Profile)
// Profile.belongsTo(Gender)

module.exports = {
    User,
    Profile,
    Session
}
