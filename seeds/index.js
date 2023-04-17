//127.0.0.1:27017
// 64359d09e8d4574a492fa092
//author: '64359d09e8d4574a492fa092',
/*
url: 'https://res.cloudinary.com/dgf0rq8nx/image/upload/v1681326876/YelpCamp/os8wiv4stdclkcqpacib.jpg',
                    filename: 'YelpCamp/os8wiv4stdclkcqpacib'
                },
                {
                    url: 'https://res.cloudinary.com/dgf0rq8nx/image/upload/v1681326874/YelpCamp/spm8cbz6b1xcnrjeqe1m.jpg',
                    filename: 'YelpCamp/spm8cbz6b1xcnrjeqe1m'
*/
const mongoose = require("mongoose");
const cities = require("./citiesIE");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const dbUrl = 'mongodb+srv://our-first-user:JBT6eiIaPIUSb4ti@cluster0.bnchgb1.mongodb.net/?retryWrites=true&w=majority'/*process.env.DB_URL*/ /*|| "mongodb://127.0.0.1:27017/yelp-camp"*/;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "64359d09e8d4574a492fa092",
      location: `${cities[random1000].name}, ${cities[random1000].county}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dgf0rq8nx/image/upload/v1681413240/YelpCamp/fikrk4wxedncnkypoubp.jpg",
          filename: "YelpCamp/fikrk4wxedncnkypoubp",
        },
        {
          url: "https://res.cloudinary.com/dgf0rq8nx/image/upload/v1681413241/YelpCamp/hfvmxmqs2xflqstqz0wo.jpg",
          filename: "YelpCamp/hfvmxmqs2xflqstqz0wo",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
