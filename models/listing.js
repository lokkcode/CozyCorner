const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = require("./review.js");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },

    description : {
        type : String, 
    },


    image : {
        url : String,
        filename : String,
    },


    price :{
        type : Number
    },
    location : {
        type : String,
        required : true,
    },
    country : {
        type : String,
    },


    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],


    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry:{
        type:{
            type: String, // Don't do `{ location: { type: String } }`,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            require: true
        },
    },

    // currently adding features of filter backend    -- pending
    category: {
        type : String,
        enum: ["Trending", "Rooms", "Iconic city", "Mountains", "Amazing pools", "Camping", "Farms", "Arctic"],
    }
    

});


listingSchema.post("findOneAndDelete", async(listing)=>{    //asnyc type middleware define kr rhe h 
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
    
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;       