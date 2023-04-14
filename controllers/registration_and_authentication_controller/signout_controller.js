const signoutController = async (req, res) => {
	// jwt token should be revoked

	res.cookie("Bearer", "", {
		httpOnly: true,
		sameSite: "None",
		secure: true,
		maxAge: "0",
	});

	return res.status(200).json("Logged out");
};

module.exports = { signoutController };
