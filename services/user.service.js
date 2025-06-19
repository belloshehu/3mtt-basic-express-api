const usersData = require("../constants/user.data");

class UserService {
	getUsers = () => {
		return usersData;
	};

	getUserById = (id) => {
		return usersData.find((user) => user.id === id) || null;
	};

	createUser = (user) => {
		// In a real application, you would save the user to a database
		// Here we just simulate adding the user to the usersData array
		const newUser = { id: usersData.length + 1, ...user };
		usersData.push(newUser);
		return newUser;
	};
}

module.exports = UserService;
