import { userAgents } from "../config/user-agent";

const indexController = {
	index: function index(req, res) {
		res.render("index.pug", {
			user_agents: userAgents.list,
		});
	},
};

export { indexController };
