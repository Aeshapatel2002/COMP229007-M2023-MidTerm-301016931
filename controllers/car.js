// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = async function(req, res, next) {  
    try {
        let carsList = await CarModel.find({});

        res.render('cars/list', {
            title: 'Cars List', 
            CarsList: carsList,
            userName: req.user ? req.user.username : ''
        })  
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Gets a car by id and renders the details page.
module.exports.details = async (req, res, next) => {
    try {
        let id = req.params.id;
        let carToShow = await CarModel.findById(id);

        res.render('cars/details', {
            title: 'Car Details', 
            car: carToShow
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    res.render('cars/add_edit', {
        title: 'Add a new Car',
        car: {}  // Blank value for the car property
    });
}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = async (req, res, next) => {
    try {
        let carData = req.body;
        // Exclude the _id property when creating a new car object
        let newCar = new CarModel({
            make: carData.make,
            model: carData.model,
            year: carData.year,
            kilometers: carData.kilometers,
            doors: carData.doors,
            seats: carData.seats,
            color: carData.color,
            price: carData.price
        });

        await newCar.save();
        res.redirect('/cars/list');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = async (req, res, next) => {
    try {
        let id = req.params.id;
        let carToEdit = await CarModel.findById(id);

        res.render('cars/add_edit', {
            title: 'Edit Car',
            car: carToEdit
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = async (req, res, next) => {
    try {
        let id = req.body.id;
        let updatedCarData = req.body;

        await CarModel.findByIdAndUpdate(id, updatedCarData);
        res.redirect('/cars/list');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Deletes a car based on its id.
module.exports.performDelete = async (req, res, next) => {
    try {
        let id = req.params.id;
        await CarModel.findByIdAndRemove(id);
        res.redirect('/cars/list');
    } catch (error) {
        console.log(error);
        next(error);
    }
}
