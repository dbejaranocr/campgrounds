const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campgrounds');
const campgroundController = require('../controllers/campgrounds');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.route('/')
    .get(catchAsync(campgroundController.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgroundController.createCampground));
    .post(upload.single('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send('Uploaded');
    });


router.get('/new', isLoggedIn, campgroundController.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundController.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundController.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.renderEditForm));


module.exports = router;