const express = require('express');
const router = express.Router();
const dashboardController= require('../controller/dashboardController');
const { isLoggedin } = require('../middleware/checkAuth')
/**
 * Dashboard Route
 */

router.get('/dashboard', isLoggedin, dashboardController.dashboard)
router.get('/dashboard/item/:id', isLoggedin, dashboardController.dashboardViewNote);  //For viewing notes
router.get('/dashboard/add', isLoggedin, dashboardController.dashboardAddNote) //For Adding notes
router.post('/dashboard/add', isLoggedin, dashboardController.dashboardAddNoteSubmit) //For Submiting notes
router.put('/dashboard/item/:id', isLoggedin, dashboardController.dashboardUpdateNote);  //For updating notes
router.delete('/dashboard/item-delete/:id', isLoggedin, dashboardController.dashboardDeleteNote);  //For Deleting notes
router.get('/dashboard/search', isLoggedin, dashboardController.dashboardSearch) //For searching notes
router.post('/dashboard/search', isLoggedin, dashboardController.dashboardSearchSubmit) //For searching notes


module.exports= router;