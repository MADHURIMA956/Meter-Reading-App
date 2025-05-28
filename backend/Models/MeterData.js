const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeterSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  reading: {
    type: Number, 
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const defDate = new Date();
      defDate.setHours(0, 0, 0, 0);
      return defDate;
    }
  }
  
});

const MeterDataModel = mongoose.model('meterdatas', MeterSchema);
module.exports = MeterDataModel;
