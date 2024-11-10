import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie =  (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_TOKEN);
    res.cookie("jwt", token ,{
        httpOnly: true, //xss
        secure: true,
        samesite: "strict", //csrf
    });
};

export default createTokenAndSaveCookie;