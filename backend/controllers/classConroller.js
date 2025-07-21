import {  Class } from "../models/classSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createClass = async (req, res, next) => {
  console.log(req.body);
  const {grade } = req.body;
  try {
    if (!grade ) {
      handleValidationError("Please Fill Form!", 400);
  }
  await Class.create({ grade });
  res.status(200).json({
    success: true,
    message: "Class Created!",
  }); 
  } catch (err) {
    next(err);
  }
};

export const getAllClasses = async (req, res, next) => {
  try {
  const classes = await Class.find();
  res.status(200).json({
    success: true,
    classes,
  });  
  } catch (err) {
    next(err);
  }
};

export const getClassCount = async (req, res, next) => {
  try {
    const count = await Class.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

export const deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Class ID is required"
      });
    }

    const deletedClass = await Class.findByIdAndDelete(id);
    
    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};
 
