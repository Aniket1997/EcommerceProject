const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {defaultImagePath} = require('../secret');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Missing'],
        trim: true,
        minlenght: [3,'Username can be minimum 3 chararcters'],
        maxlenght: [31,'Username can be maximum 31 chararcters'],
    },
    email: {
        type: String,
        required: [true, 'Email is Missing'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
          validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email"
      },
    },
    password: {
      type: String,
      required: [true, 'Username is Missing'],
      trim: true,
      minlenght: [6,'Username can be minimum 6 chararcters'],
      set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: 
    {
      type: String,
      default: defaultImagePath,
    },
    address: 
    {
      type: String,
      require : [true,'User address is needed'],
    },
    phoneNumber: 
    {
      type: String,
      require : [true,'User phone is needed'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Hashing the password before saving it to the database
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return false;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
