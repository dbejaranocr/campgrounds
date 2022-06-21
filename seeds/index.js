const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/YelpCamp_by_me', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});


const sample = array => array[Math.floor(Math.random() * array.length)];

async function seedDB() {
    await Campground.deleteMany({});
    // const c = new Campground({ title: 'Purple Field' });
    // await c.save();
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61e112b6c2e13fef3185c15a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "lorem ipsum dolor sit amet",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbejaranocr/image/upload/v1643999861/YelpCamp/308799682_esuulk.jpg',
                    filename: 'YelpCamp/308799682_esuulk',
                },
                {
                    url: 'https://res.cloudinary.com/dbejaranocr/image/upload/v1643999861/YelpCamp/_4qJL2jJmgEd_wywwdk.jpg',
                    filename: 'YelpCamp/_4qJL2jJmgEd_wywwdk',
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});