'use strict';

const mongoose = require('mongoose');

const foodSchema = mongoose.foodSchema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  type: { type: String, uppercase: true, enum: ['FRUIT', 'VEGTABLE', 'PROTIEN'] },
});

const foodModel = mongoose.model('food', foodSchema);

module.exports = foodModel;