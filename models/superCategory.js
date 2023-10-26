const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const superCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true },
});

superCategorySchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const SuperCategory = mongoose.model("SuperCategory", superCategorySchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        slug: Joi.string().required().label("Slug"),
        image: Joi.string().required().required().label("Image"),
        status: Joi.string().required().label("Status"),
    });
    return schema.validate(data);
};

module.exports = { SuperCategory, validate };