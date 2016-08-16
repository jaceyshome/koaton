'use strict';
const path = require("upath");
const fs = require('fs');
let utils;
require("colors");
module.exports = {
	cmd: "install",
	description: "SetUps a recent clonned proyect.",
	args: [],
	options: [],
	action: function*() {
		utils = require("../utils");
		try {
			yield utils.mkdir(path.join(process.cwd(),"node_modules"));
			process.stdout.write(`   ${"Linking".cyan}: global koaton`);
			fs.symlinkSync(path.join(__dirname, "/../../"), path.join(process.cwd(), "/node_modules/koaton"));
			console.log(": done".green);
		} catch (e) {
			console.log(": already exists".green);
		}
		yield utils.shell("Installing bower dependencies",["bower","install"],process.cwd());
		return yield utils.shell("Installing npm dependencies", ["npm", "install", "--loglevel", "info"], process.cwd());
	}
};
