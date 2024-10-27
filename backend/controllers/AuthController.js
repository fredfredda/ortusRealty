const isLoggedin = (req,res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(200).json({isLoggedIn: false});
        } else {
            return res.status(200).json({isLoggedIn: true});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

export { isLoggedin };