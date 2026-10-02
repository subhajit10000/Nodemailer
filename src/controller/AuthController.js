const User = require("../model/User.js");
const { sendverificationCode } = require("../utils/Email.js");
const register = async (req,res) => {
    try {
        const { email, name, gender, phone, password } = req.body;
        if (!email || !name || !gender || !phone || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email or phone already exists" });
        }
        
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        const user = await User.create({
            email,
            name,
            gender,
            phone,
            password,
            verificationCode,
            verificationCodeExpires
        });

        sendverificationCode(user.email, verificationCode);


        res.status(201).json({ success: true, message: "User registered successfully. Verification code sent to your email.", user:{
            id: user._id,
            email: user.email,
            name: user.name,
            gender: user.gender,
            phone: user.phone,
        } });


    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const login = async (req, res) => {
    try {
        const { email, code } = req.body;

        // 1. Validate request body
        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: "Email and code are required"
            });
        }

        // 2. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 3. Check if already verified
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User is already verified"
            });
        }

        // 4. Check whether verification code exists
        if (!user.verificationCode) {
            return res.status(400).json({
                success: false,
                message: "No verification code found. Please request a new one."
            });
        }

        // 5. Check code expiration
        if (
            !user.verificationCodeExpires ||
            new Date() > user.verificationCodeExpires
        ) {
            user.verificationCode = null;
            user.verificationCodeExpires = null;
            await user.save();

            return res.status(400).json({
                success: false,
                message: "Verification code has expired. Please request a new one."
            });
        }

        // 6. Check verification code
        if (String(code) !== String(user.verificationCode)) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code"
            });
        }

        // 7. Verify user
        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;

        await user.save();

        // 8. Success response
        return res.status(200).json({
            success: true,
            message: "User verified successfully"
        });

    } catch (error) {
        console.error("Error verifying user:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = { register, login };