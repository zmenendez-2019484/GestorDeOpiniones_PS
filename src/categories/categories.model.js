const mongoose = require('mongoose');
export const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
export const Category = mongoose.model('Category', CategorySchema);