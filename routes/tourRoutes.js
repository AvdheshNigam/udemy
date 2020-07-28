const express = require('express');
const fs = require('fs');
const tourController = require('./../controllers/tourController');
//const {getAllTours, createTour, getTour, deleteTour} = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController'); Delete

const reviewRouter = require('./reviewRoutes');

const router = express.Router();

//Middleware function
// router.param('id', tourController.checkID);

// Create a checkBody middleware
// If checkBody contain name and price property
// If not send back 400 (bad request)
// Add it post to the handler stack

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

router
    .use('/:tourId/reviews', reviewRouter);

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route('/tour-stats')
    .get(tourController.getTourStats);
    router
    .route('/monthly-plan/:year')
    .get(authController.protect, 
        authController.restrictTo('admin', 'lead-guide', 'guide'), 
        tourController.getMonthlyPlan);

router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getToursWithin);

// /tours-within?distance=233&center=-40,45&unit=mi
// tours-within/233/center/-40,45/unitmi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(authController.protect, 
        authController.restrictTo('admin', 'lead-guide'), 
        tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(authController.protect, 
            authController.restrictTo('admin', 'lead-guide'), 
            tourController.updateTour)
    .delete(authController.protect, 
            authController.restrictTo('admin', 'lead-guide'), 
            tourController.deleteTour);

module.exports = router;
