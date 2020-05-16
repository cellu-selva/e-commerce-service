'use strict'

const CategoryModel = require('../models/category')

const db = require('../helpers/db')
const data = [
  {
    "_id": "5cbc71a01df6892eaff071b1",
    "isDeleted": false,
    "name": "cold pressed",
    "code": "1",
    "description": "Cold-pressed juice is made with a hydraulic press that uses pressure to extract the maximum amount of liquid from raw fresh fruits and vegetables. No additional heat or oxygen is used in the process, meaning that no nutrients are lost in the heat of traditional pasteurization. Fruits and vegetables are great sources of vitamins, minerals and antioxidants. We provide you a way to get a lot of these compounds in one sitting.",
    "shortDescription": "Cold pressed juice is made with a hydraulic press that uses pressure to extract the maximum amount of liquid from raw fresh fruits and vegetables.",
    "logo": "https://www.pressato.in/wp-content/uploads/2019/03/cold_crea.jpg",
    "__v": 0,
    "createdAt": "2019-04-21T13:35:28.712Z",
    "updatedAt": "2019-04-21T13:35:28.712Z"
  },
  {
    "_id": "5cbc830bb3fd466450827239",
    "isDeleted": false,
    "name": "packages",
    "code": "2",
    "description": "no description",
    "shortDescription": "",
    "logo": "https://www.pressato.in/wp-content/uploads/2019/03/prob_crea.jpg",
    "__v": 0,
    "createdAt": "2019-04-21T14:49:47.915Z",
    "updatedAt": "2019-04-21T14:49:47.915Z"
  },
  {
    "_id": "5cbc830bb3fd46645082723a",
    "isDeleted": false,
    "name": "probiotics",
    "code": "3",
    "description": "Our probiotic drink is loaded with good, helpful bacteria from yogurt, and a well curated selection of fruits and veggies that are high in nutritive value and great in taste! The bacteria in yogurt is good for your gut as it has several digestive benefits and allergies. The fruits and veggies in our probiotic drink help promote digestive wellness and load your body with minerals to keep infections out of the way. Regularly consumed our probiotics help in regulating blood sugar levels and moods.",
    "shortDescription": "Our probiotic drink is loaded with good, helpful bacteria from yogurt, and a well curated selection of fruits",
    "logo": "https://www.pressato.in/wp-content/uploads/2019/03/prob_crea.jpg",
    "__v": 0,
    "createdAt": "2019-04-21T14:49:47.915Z",
    "updatedAt": "2019-04-21T14:49:47.915Z"
  },
  {
    "_id": "5cbc830bb3fd46645082723b",
    "isDeleted": false,
    "name": "salads",
    "code": "4",
    "description": "Our salads apart from their natural good taste and great texture alongside wonderful colours and aromas, eating a large serving of fresh, raw vegetables each day can have significant health benefits. Leafy greens and raw veggies are a superb source of natural fiber and consuming enough fiber each day can aid in weight loss and healthy weight maintenance. Loaded with vitamins and minerals, eating a salad a day increase the level of powerful antioxidants in your blood.",
    "shortDescription": "Our salads apart from their natural good taste and great texture alongside wonderful colors and aromas, eating a large serving of fresh",
    "logo": "https://www.pressato.in/wp-content/uploads/2019/03/salads_crea.jpg",
    "__v": 0,
    "createdAt": "2019-04-21T14:49:47.915Z",
    "updatedAt": "2019-04-21T14:49:47.915Z"
  },
  {
    "_id": "5cbc830bb3fd46645082723c",
    "isDeleted": false,
    "name": "smoothies",
    "code": "5",
    "shortDescription": "Smoothies are champions in getting essential nutrients in a one quick meal that is filled with adequate calories",
    "description": "Smoothies are champions in getting essential nutrients in a one quick meal that is filled with adequate calories and saturated with natural saccharinity. Unlike milkshakes and malts, smoothies derive their rich flavor and nutritious nature from fruits, veggies, nuts and seeds.",
    "logo": "https://www.pressato.in/wp-content/uploads/2019/03/smoothies_crea.jpg",
    "__v": 0,
    "createdAt": "2019-04-21T14:49:47.915Z",
    "updatedAt": "2019-04-21T14:49:47.915Z"
  }
]

db.connectMongo()

const insertParams = async () => {
  try {
    console.log('inserting native custom parameters')
    await CategoryModel.deleteMany({ isNative: true })
    let status = await CategoryModel.insertMany(data)
    console.log('Process ended')
    process.exit(1)
  } catch (error) {
    console.error('Error occured')
    console.error(error)
  }
}

insertParams()
