import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie =  (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_TOKEN);
    res.cookie("jwt", token ,{
        httpOnly: false, //xss
        secure: true,
        samesite: "none", //csrf
    });
};

export default createTokenAndSaveCookie;