const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
        
    }).required()
});

module.exports.reviewSchema = Joi.object({   // ye sab issliye taaki koi hoppscotch ya postmen a external post req na bej pai 
    review : Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
})