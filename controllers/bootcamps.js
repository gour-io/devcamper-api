const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const ErrorHandler = require('../utils/errorResponse');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  public

exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps 
        })        
    } catch (error) {
        next(error);
    }
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  public

exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp) {
            return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        // next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        next(error);
    }
}

// @desc    create bootcamp
// @route   POST /api/v1/bootcamps
// @access  private

exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp 
        })        
    } catch (error) {
        // res.status(400).send({
        //     success: false,
        //     message: error.message
        // })
        next(error);
    }
}

// @desc    update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  private

exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!bootcamp) {
            return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404);
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        next(error);
    }
}

// @desc    delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  private

exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        
        if(!bootcamp) {
            return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404);
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        next(error);
    }
}
