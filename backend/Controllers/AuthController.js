const UserModel = require("../Models/user");
const MeterDataModel = require("../Models/MeterData");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req , res) => {
    try{
        const {name, email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json
                ({ 
                    message : 'User is already exist, you can login', 
                    success:false
                });
        }
        const userModel = new UserModel({name, email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(200)
                .json
                ({ 
                    message : 'Signup successfully', 
                    success: true
                });
    }catch(err){
        res.status(500)
                .json
                ({ 
                    message : 'Internal server error', 
                    success: false
                });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const submit = async (req, res) => {
  try {
    const { userId, reading, date } = req.body;

    // Validate user existence
    const user = await UserModel.findById(userId);
    console.log("user",user)
    if (!user) {
      return res.status(403).json({
        message: 'You are not a valid user',
        success: false
      });
    }

    // Prepare meter data payload
    const meterData = new MeterDataModel({
      userId,
      reading,
      date // optional — will use schema default if not provided
    });

    // Save to DB
    await meterData.save();

    return res.status(201).json({
      message: 'Meter reading submitted successfully',
      success: true,
    });

  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};



module.exports = {
    signup,
    login,
    submit
}