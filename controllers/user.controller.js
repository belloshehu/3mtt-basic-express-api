const UserService = require("../services/user.service");

class UserController {
	userService = new UserService();
	createUser = (req, res) => {
		const user = req.body;
		// Here you would typically save the user to a database
		this.userService.createUser(user);
		res.status(201).json({ message: "User created successfully", user });
	};

	getUsers = (req, res) => {
		// This would typically fetch users from a database
		const users = this.userService.getUsers();
		res.status(200).json(users);
	};

	getUserById = (req, res) => {
		const userId = parseInt(req.params.id, 10);
		// This would typically fetch the user from a database
		const user = this.userService.getUserById(userId);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	};
}

module.exports = UserController;
