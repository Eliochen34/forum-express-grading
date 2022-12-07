const { Restaurant, Category } = require('../models')
// const { imgurFileHandler } = require('../../helpers/file-helpers')

const adminService = {
  getRestaurants: (req, cb) => {
    Restaurant.findAll({
      raw: true, // 把原本sequelize做出來的一包instance轉換成一包簡單的javascript物件
      nest: true, // 如果不加nest: true，和類別相關的資料會長得像這樣: restaurants['Category.id']
      include: [Category]
    })
      .then(restaurants => cb(null, { restaurants }))
      .catch(err => cb(err))
  },
  deleteRestaurant: (req, cb) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't exist!")

        return restaurant.destroy() // 直接使用sequelize的方法，所以不加raw: true
      })
      .then(deletedRestaurant => cb(null, { restaurant: deletedRestaurant }))
      .catch(err => cb(err))
  }
}

module.exports = adminService
