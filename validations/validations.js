const Joi = require("@hapi/joi");

const loginValidationSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6),
});

// LOAN APPLICATION VALIDATION
const imageUpdateValidationSchema = Joi.object({
  url: Joi.string().required(),
  email: Joi.string().min(6).required().email()
});
//REGISTRATION VALIDATION
const registerValidationSchema = Joi.object({
  studentID: Joi.string().min(6).max(11).required(),
  fullname: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  state: Joi.string().min(3).required(),
  dob: Joi.date().required(),
  imgurl:Joi.string().required(),
  password: Joi.string().min(5),
  
});

//EMAIL VALIDATION
const emailValidationSchema = Joi.object({
  email: Joi.string().min(6).required().email()
  
});
//FORM VALIDATION
const formValidationSchema = Joi.object({
  phone:Joi.string().min(6).max(11).required(),
  fullname: Joi.string().min(6).required(),
  othername: Joi.string().min(2).required(),
  surname: Joi.string().min(2).required(),
  english: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  lga: Joi.string().min(3).required(),
  state: Joi.string().min(3).required(),
  dob: Joi.date().required(),
  address:Joi.string().min(5).required(),
  religion:Joi.string().min(4).required(),
  appliedClass:Joi.string().min(3).required(),
  prevSch:Joi.string().min(3).required(),
  sex:Joi.string().min(4).required(),
  prevResult:Joi.string().min(3).required()
});
module.exports = { registerValidationSchema, formValidationSchema,imageUpdateValidationSchema, loginValidationSchema , emailValidationSchema };
