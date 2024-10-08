import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body
           
        const existUser= await UserModel.findOne({email})
        if (existUser) {
            return res.status(401).json({success:false,message:"User already Exist"})
        }
            const hasepassword=await bcryptjs.hashSync(password,10)
        const newUser= new UserModel({
            name,email,password:hasepassword
        })
        
          await newUser.save()

          res.status(200).json({message:"user register successfully",newUser})
    } catch (error) {
        res.status(500).json({success:false,message:"interanl server error"})
        console.log(error)
    }
}


const Login=async(req,res)=>{
    try {
          const {email,password}=req.body

          const user=await UserModel.findOne({email})

          if (!user) {
              return res.status(404).json({success:false,message:"Invalid credentials"})
          }

          const ispassaowrdValid= await bcryptjs.compare(password,user.password)
          if (!ispassaowrdValid) {
            return res.status(404).json({success:false,message:"Invalid credentials"})
            
          }
               const token= jwt.sign({userId:user._id},process.env.JWT_SECRETE)

                res.cookie('token',token,{
                    httpOnly: true,
                    secure: false,
                    maxAge: 3600000,
                    
                })
              res.status(200).json({success:true,message:"Login successfully",user,token})

    } catch (error) {
        res.status(500).json({success:false,message:"interanl server error"})
        console.log(error)
    }
}
  const Logout=async(req,res)=>{
    try {
        res.clearCookie('token')
        res.status(200).json({message:"user Logout successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:"interanl server error"})
        console.log(error)
    }
  }
     const CheckUser=async(req,res)=>{
            try {
                const user=req.user
                if (!user) {
                    res.status(404).json({message:'User not found'})
                }
                res.status(200).json(user)

                
            } catch (error) {
                res.status(500).json({message:"internal server error"})
                console.log(error)
                
            }
     }


     //verification
     export const verifyEmail = async (req, res) => {
        try {
          const { userName, emailToken } = req.body;
          const user = await UserModel.findOne(userName);
          console.log(user);
      
          if (!user) {
            return res.status(404).json({ error: "No user found 120" });
          }
      
          try {
            const decoded = jwt.verify(emailToken, process.env.JWT_SECRET_KEY);
            console.log(decoded);
      
            await UserModel.updateOne(
              { userName: req.body.userName },
              { $set: { confirmedEmail: true } }
            );
      
            console.log("User found and email confirmed");
            return res.json({ status: "okay" });
          } catch (err) {
            console.error("Invalid email token", err);
            return res.status(400).json({ error: "Invalid email token" });
          }
        } catch (err) {
          console.error("Error finding user", err);
          return res
            .status(500)
            .json({ error: "Internal server error", message: err.message });
        }
      };
      
      export const updatePassword = async (req, res) => {
        try {
          const { email } = req.body;
          console.log("172 = ", req.body);
          
          const user = await UserModel.findOne({ email });
          
          if (!user) return res.status(404).json({ message: "User not found" });
          
          const emailToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
          });
          
          user.updatePasswordToken = emailToken; // Update the user instance
          user.updatePasswordExpires = Date.now() + 3600000; // 1 hour from now
          await user.save(); // Save the changes
      
          try {
            await sendResetEmail(email, emailToken);
          } catch (emailError) {
            return res.status(500).json({
              error: "Error sending verification email",
              message: emailError.message,
            });
          }
      
          res.status(200).json({ message: "Password reset email sent successfully" });
        } catch (error) {
          console.log("error message", error.message);
          return res.status(500).json({ message: 'Internal server error' });
        }
      };
      
      export const resetPassword = async (req, res) => {
        try {
          const { token } = req.params;
          const { newPassword, confirmNewPassword } = req.body;
      
          console.log("200");
          console.log("password = ", req.body);
      
          if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
          }
      
          // Decode the token to get the user ID
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Use your secret key
      
          const user = await UserModel.findOne({
            _id: decoded.id,
            updatePasswordToken: token,
            updatePasswordExpires: { $gt: Date.now() }
          });
      
          console.log("user = ", user);
      
          if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
          }
      
          const salt = await bcryptjs.genSalt(10); // Add salt for hashing
          user.password = await bcryptjs.hash(newPassword, salt);
      
          // Clear the password reset token and expiration
          user.updatePasswordToken = undefined;
          user.updatePasswordExpires = undefined;
      
          await user.save();
      
          console.log("userPassword = ", user.password);
      
          res.status(200).json({ message: 'Password successfully reset' });
        } catch (error) {
          console.error(error); // Log the error for debugging
          res.status(500).json({ message: 'Internal server error' });
        }
      };
      



export {register,Login,Logout,CheckUser}