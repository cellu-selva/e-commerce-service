'use strict'

const _ = require('lodash')
const db = require('../../helpers/db')

db.connectMongo()


const categories = [
  {
    name: 'cold pressed',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/citrus-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/citrus.jpg",
        "name": "CITRUS SLAP",
        "code": "₹ 145",
        "symbol": "₹",
        "price": "145",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Tender Coconut Water, Orange, Pineapple, Sweetlime",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/chalko-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/chalko.jpg",
        "name": "CHALKO",
        "code": "₹ 135",
        "symbol": "₹",
        "price": "135",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Activated Charcoal, Tender Coconut Water, Ginger",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/beet-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/beet.jpg",
        "name": "French Kiss",
        "code": "₹ 150",
        "symbol": "₹",
        "price": "150",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Apple, Beet, Carrot, Ginger",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/punk-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/punk.jpg",
        "name": "PUNK",
        "code": "₹ 150",
        "symbol": "₹",
        "price": "150",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Banana Stem, Arugampul (Bermuda Grass), Wheatgrass, Spirulina, Spinach, Bael Leaves, Lemon Grass, Lemon, Coconut Oil, Cumin, Himalayan Salt",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/greeny-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/greeny.jpg",
        "name": "GREENY",
        "code": "₹ 150",
        "symbol": "₹",
        "price": "150",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Broccoli, Drumstick Leaves, Lettuce, Capsicum, Celery, Cucumber, Lemon, Mint, Himalayan Salt",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Jade-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Jade.jpg",
        "name": "JADE",
        "code": "₹ 150",
        "symbol": "₹",
        "price": "150",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Amaranth, Fenugreek, Spinach, Cucumber, Bottle Gourd, Coriander, Ginger, Mint, Lemon, Himalayan Salt",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/eden-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/eden.jpg",
        "name": "EDEN",
        "code": "₹ 150",
        "symbol": "₹",
        "price": "150",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Cucumber, Spinach, Bottle Gourd, Coriander, Ginger, Mint, Lemon, Himalayan Salt",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Rabb-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Rabb.jpg",
        "name": "STONED RABBIT",
        "code": "₹ 150",
        "symbol": "₹",
        "price": "150",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Carrots, Turmeric, Ginger",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/owl-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/owl.jpg",
        "name": "ORANGE OWL",
        "code": "₹ 145",
        "symbol": "₹",
        "price": "145",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Orange, Carrot",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/pomo_1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/pomo_1.jpg",
        "name": "POMO-GRENADE",
        "code": "₹ 155",
        "symbol": "₹",
        "price": "155",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Tender Coconut Water, Pomegranate",
        "category": "5cbc71a01df6892eaff071b1"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/charger-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/charger.jpg",
        "name": "CHARGER",
        "code": "₹ 145",
        "symbol": "₹",
        "price": "145",
        "quantity": "300",
        "measuringUnit": "ml",
        "ingredient": "Watermelon, Pineapple",
        "category": "5cbc71a01df6892eaff071b1"
      }
    ],
  },
  {
    name: 'packages',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/make-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/make.jpg",
        "name": "Make It A Habit",
        "code": "7999",
        "symbol": "₹",
        "price": "9598",
        "noOfDays": "21",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Cleanse your body of toxins, alkalize it and rev up your metabolism. Choose any 2. Products from our menu and enjoy preservative free, healthy food delivered to you every day for 21 days."
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/10-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/10.jpg",
        "name": "10 Day Reset",
        "code": "3999",
        "symbol": "₹",
        "price": "4798",
        "noOfDays": "10",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "A reminder of promised health benefits of high energy without any added sugar. Get rid of piled up toxins and load upon deprived vitamins and minerals"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/detox-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/detox.jpg",
        "name": "Detox Week",
        "code": "2750",
        "symbol": "₹",
        "price": "3300",
        "measuringUnit": "ml",
        "noOfDays": "7",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Feel light in a week. Refuel your body with healthy nutrients and\nantioxidants without depriving yourself. Great way to lose some\nweight before a D day."
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/cold_07-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/cold_07.jpg",
        "name": "Cold Pressed Juices",
        "code": 1800,
        "symbol": "₹",
        "price": 2160,
        "noOfDays": 7,
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Two cold pressed juices delivered to you every day from a\nwide range of green, vegetable and fruit juices."
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/smoothies-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/smoothies.jpg",
        "name": "Smoothies",
        "code": "2499",
        "symbol": "₹",
        "price": 2998,
        "measuringUnit": "ml",
        "noOfDays": "7",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Two smoothies delivered to you every day. Before the workout, after the workout,\nbreakfast replacement – choose to have it at your convenience."
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/02/1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/02/1.jpg",
        "name": "One Day Cleanse",
        "code": "999",
        "symbol": "₹",
        "price": 1198,
        "noOfDays": 1,
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd466450827239",
        "benefits": "Choose 5 products from a wide range of smoothies,\njuices, and salads to de-bloat, repair, heal and give your digestive\nsystem its much needed to cleanse from processed food."
      }
    ]
  },
  {
    name: 'probiotics',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/xoxo-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/xoxo.jpg",
        "name": "XOXO",
        "code": "135",
        "symbol": "₹",
        "price": "135",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723a",
        "ingredient": "Yogurt, Coriander, Mint, Curry Leaves, Celery, Green Chili, Spice Mix, Himalayan Salt"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/assassin-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/assassin.jpg",
        "name": "Assassin",
        "code": "135",
        "symbol": "₹",
        "price": "135",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723a",
        "ingredient": "Yogurt, Strawberry, honey"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/halogen-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/halogen.jpg",
        "name": "Halogen",
        "code": "135",
        "symbol": "₹",
        "price": "135",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723a",
        "ingredient": "Yogurt, Mango"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/prob-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/prob.jpg",
        "name": "Mario",
        "code": "135",
        "symbol": "₹",
        "price": "135",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723a",
        "ingredient": "Yogurt, Musk Melon, Papaya, Orange, Psyllium husk"
      }
    ]
  },
  {
    name: 'salads',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/medi-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/medi.jpg",
        "name": "Mediterranean Medley (Paneer)",
        "code": "190",
        "symbol": "₹",
        "price": "190",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Purple Cabbage, Chinese Cabbage, Feta Cheese, Baby Corn, Zucchini, Carrot, Leek, Lettuce, Roasted Peanuts, Cashew Nuts"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/medi-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/medi.jpg",
        "name": "Mediterranean Medley (Chicken)",
        "code": "210",
        "symbol": "₹",
        "price": "210",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Purple Cabbage, Chinese Cabbage, Feta Cheese, Baby Corn, Zucchini, Carrot, Leek, Lettuce, Roasted Peanuts, Cashew Nuts"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/medi-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/medi.jpg",
        "name": "Mediterranean Medley (Eggs)",
        "code": "200",
        "symbol": "₹",
        "price": "200",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Purple Cabbage, Chinese Cabbage, Feta Cheese, Baby Corn, Zucchini, Carrot, Leek, Lettuce, Roasted Peanuts, Cashew Nuts"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/wild-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/wild.jpg",
        "name": "Wild Rice Party (Chicken)",
        "code": "210",
        "symbol": "₹",
        "price": "210",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Colored Capsicum, Lettuce, Chinese Cabbage, Purple Cabbage, Leeks, Feta Cheese"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1.jpg",
        "name": "Farm Frenzy (Chicken)",
        "code": "210",
        "symbol": "₹",
        "price": "210",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Paneer, Carrots, Bell Peppers, Onion, Cauliflower, Cashew Nuts, Biriyani Masala, Ghee, Himalayan Salt"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-1.jpg",
        "name": "Farm Frenzy (Eggs)",
        "code": "200",
        "symbol": "₹",
        "price": "200",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Paneer, Carrots, Bell Peppers, Onion, Cauliflower, Cashew Nuts, Biriyani Masala, Ghee, Himalayan Salt"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/wild-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/wild.jpg",
        "name": "Wild Rice Party (Eggs)",
        "code": "200",
        "symbol": "₹",
        "price": "200",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Colored Capsicum, Lettuce, Chinese Cabbage, Purple Cabbage, Leeks, Feta Cheese"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/wild-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/wild.jpg",
        "name": "Wild Rice Party (Paneer)",
        "code": "190",
        "symbol": "₹",
        "price": "190",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Colored Capsicum, Lettuce, Chinese Cabbage, Purple Cabbage, Leeks, Feta Cheese"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Salad_1-1.jpg",
        "name": "Farm Frenzy (Paneer)",
        "code": "190",
        "symbol": "₹",
        "price": "190",
        "quantity": "300gms",
        "measuringUnit": "grams",
        "category": "5cbc830bb3fd46645082723b",
        "ingredient": "Black Rice, Paneer, Carrots, Bell Peppers, Onion, Cauliflower, Cashew Nuts, Biriyani Masala, Ghee, Himalayan Salt"
      }
    ]
  },
  {
    name: 'smoothies',
    data: [
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/swag-1-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/swag-1.jpg",
        "name": "Swag",
        "code": "200",
        "symbol": "₹",
        "price": "200",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Almond milk, Guava, Chia seeds, Spirulina"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/thalaiva-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/thalaiva.jpg",
        "name": "Thalaiva",
        "code": "245",
        "symbol": "₹",
        "price": "245",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Milk, Whey Protein, Almonds"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/super-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/super.jpg",
        "name": "Super Nova",
        "code": "245",
        "symbol": "₹",
        "price": "245",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Milk, Whey Protein, Peanut Butter and Dark Chocolate"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/rogue-300x300.jpeg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/rogue.jpeg",
        "name": "Rogue",
        "code": "245",
        "symbol": "₹",
        "price": "245",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Milk, Whey Protein, Almonds, Sapota, Apple"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/newyorker-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/newyorker.jpg",
        "name": "New Yorker",
        "code": "245",
        "symbol": "₹",
        "price": "245",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, Milk, Whey Protein, Cocoa, Dark Chocolate, Almonds"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/barba-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/barba.jpg",
        "name": "Barbarian",
        "code": "200",
        "symbol": "₹",
        "price": "200",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Sapota, Avocado, Paneer, Coffee, Dates, Cocoa, Milk"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/Dyna-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/Dyna.jpg",
        "name": "Dynamight",
        "code": "245",
        "symbol": "₹",
        "price": "245",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Musk Melon, Papaya, Pistachios, Honey, Cardamom, Milk, Whey"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/nuts-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/nuts.jpg",
        "name": "Naked Nuts",
        "code": "200",
        "symbol": "₹",
        "price": "200",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, whole milk, Almonds, Pistachios, Walnuts, Cashews, Raisins and Figs"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/big-jo-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/big-jo.jpg",
        "name": "Big Jo",
        "code": "200",
        "symbol": "₹",
        "price": "200",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, whole milk, Peanut butter, Dark Chocolate"
      },
      {
        "logo": "https://www.pressato.in/wp-content/uploads/2019/01/first-300x300.jpg",
        "detailedLogo": "https://www.pressato.in/wp-content/uploads/2019/01/first.jpg",
        "name": "First Knight",
        "code": "200",
        "symbol": "₹",
        "price": "200",
        "quantity": "300",
        "measuringUnit": "ml",
        "category": "5cbc830bb3fd46645082723c",
        "ingredient": "Banana, whole milk, Almonds, Sapota, Apple"
      }
    ]
  }
]

const insertData = () => {
  try {
    console.log('inserting products')
    const ProductModel = require('../../models/product')
    _.each(categories, async (category) => {
      const daa = await ProductModel.insertMany(category.data)
      console.log('Process ended', daa)
    })
    
    // process.exit(1)
  } catch (error) {
    console.error('Error occured')
    console.error(error)
  }
}

insertData()
