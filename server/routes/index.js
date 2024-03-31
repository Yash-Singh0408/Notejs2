const express = require('express');
const router = express.Router();
const mainController= require ('../controller/mainController');


//*App Routes(listing)
router.get('/',mainController.homepage);
router.get('/about',mainController.about);


//Exporting Routes 
module.exports = router;