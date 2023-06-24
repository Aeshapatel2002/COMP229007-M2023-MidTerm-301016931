var express = require('express');
var router = express.Router();

let carController = require('../controllers/car');

// Helper function for guard purposes
function requireAuth(req, res, next) {
  // Check if the user is logged in
  if (req.isAuthenticated()) {
    return next();
  } else {
    // Store the original URL in the session to redirect the user back after successful authentication
    req.session.originalUrl = req.originalUrl;
    res.redirect('/users/sign'); // Redirect to the login page if the user is not authenticated
  }
}

/* GET list of items */
router.get('/list', carController.carList);

// Route for Details
router.get('/details/:id', carController.details);

// Routers for edit
router.get('/edit/:id', requireAuth, carController.displayEditPage);
router.post('/edit/:id', requireAuth, carController.processEditPage);

// Delete
router.get('/delete/:id', requireAuth, carController.performDelete);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, carController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, carController.processAddPage);

module.exports = router;
