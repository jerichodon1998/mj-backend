// imports
const bcrypt = require("bcrypt");

// my imports
const User = require("../../models/User");

const saltRounds = 10;

const signupController = async (req, res) => {
	const { firstname, lastname, email, username, password } = req.body;

	//
	if (!firstname || !lastname || !email || !password || !username) {
		return res.status(400).json("Provide input to all required fields");
	}

	const userEmailExist = await User.findOne({ email });
	const userUsernameExist = await User.findOne({ username });

	// check if email/username already exist
	if (userEmailExist) {
		return res.status(400).json("Email already taken");
	}
	if (userUsernameExist) {
		return res.status(400).json("Username already taken");
	}

	// hash password
	bcrypt.hash(password, saltRounds, function (err, hash) {
		if (err) {
			return res.status(500).json(err);
		}

		User.create({ firstname, lastname, email, username, password: hash })
			.then((response) => {
				return res.status(201).json("User created");
			})
			.catch((err) => {
				return res.status(500).json(err);
			});
	});
};

module.exports = { signupController };
