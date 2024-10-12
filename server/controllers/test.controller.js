export const shouldBeLoggedIn = async (req, res) => {
    // We can get userId from the middleware since we passed the userId to req. Using req.userId, the value can be reached
    // console.log(req.userId);



    res.status(200).json({ message: "You are Authenticated!" });
}