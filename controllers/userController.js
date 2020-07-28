const User = require('../models/userModel');
const catchAsync =  require('./../utils/catchAsync');
const factory = require('./handlerFactory');
// const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedField) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedField.includes(el)) newObj[el] = obj[el]
    });

    return newObj;
}

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please /updateMyPassword', 400));
    }
    
    // 2) Filtered out unwanted fields name that are not allowed to be updated.
    
    // body.role: 'admin'--> so, x is use here. it only contains name and email and nothing else
    // const user = await User.findById(req.user.id);
    // user.name = 'Jonas';
    // await user.save();
    
    const filterBody = filterObj(req.body, 'name', 'email'); 
    
    // 2) Uddate user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, { 
        new: true,
        runValidators: true
    });
    
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false });
    
    res.status(201).json({
        status: 'success',
        data: null
    });
});


exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined. Please use /signup instead',
    })
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do not update passwords this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser  = factory.deleteOne(User);




// exports.getAllUsers = catchAsync(async(req, res) => {
//     const users = await User.find();

//     // SEND RESPONSE
//     res.status(200).json({
//         status: 'succcess',
//         requestedAt: req.requestTime,
//         results: users.length,
//         data: {
//             users
//         }
//     });
// });

// exports.getUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined',
//     })
// };

// exports.updateUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined',
//     })
// }; 

// exports.deleteUser = (req, res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined',
//     })
// };