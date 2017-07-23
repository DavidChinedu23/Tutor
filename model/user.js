var Sequelize = require('sequelize');

var User = undefined;
module.exports.connect = function(params){
	//Create database
	var sequelize = new Sequelize(
		params.dbname,
		params.username,
		params.password,
		params.params,
		);

	//checking connection status
	sequelize.authenticate().then(function () {
        console.log("-------------Database successfully connected!-------------");
    },function (err) {
        console.log("-------------Unsuccessfully connect database!-------------");
	   return;
    });

	// create table
	User = sequelize.define('Users',{
		username: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		password: Sequelize.STRING
	});

	// apply table to database
	sequelize.sync().then(function(){
		console.log("-------------Create table successfully!-------------");
	}, function(err){
		console.log("-------------Create table unsuccessfully with error: " + err +"-------------");
	});
}

// Add new user with username and password for purpose of Register
exports.insertUser = function(username, password){
	User.create({
			username: username,
			password: password
		}).then(function(user){
			console.log("---------Insert value successfully!--------");
		},function(err){
			console.log("--------Insert value unsuccessfully with error: " + err + "--------");
	});
}

// Find User with username and password for purpose of Login
exports.findUser = function(username, password){
	return new Promise((resolve, reject) => {
		User.find({where:{username: username, password: password}}).then( function(user){
			console.log("user = " + user);

			if(!user){
				return reject("------There no user with username = " + username + " and password: " + password + "-----");
			}else{
				return resolve ("Username: " + username + " Found!");
			}
		})
	});
}

// Find only username for purpose of Register
exports.findUsername = function(username){
	return new Promise((resolve, reject) => {
		User.find({where:{username: username}}).then( function(user){
			//console.log("user = " + user);
			if(!user){
				return reject("------There no user with username = " + username + "-----");
			}else{
				return resolve ("Username: " + username + " Found!");
			}
		})
	});
}
