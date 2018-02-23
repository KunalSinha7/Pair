
	function getMasterListOfInterns(internRef, company, callback) {
		var master = {};
		internRef.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
    			if(childSnapshot.val().company == company){
    				var key = childSnapshot.key;
    				master[key] = {};
    				master[key]["firstName"] = childSnapshot.val().firstName;
    				master[key]["lastName"] = childSnapshot.val().lastName;
    				master[key]["email"] = childSnapshot.val().email;
    				master[key]["location"] = childSnapshot.val().lcoation;
    				master[key]["phone"] = childSnapshot.val().phone;
    			}
    		});
    		callback(master);
    	});
	}

	function getLocations(companyRef, company, callback) {
		var list = [];
		companyRef.child(company).child("listOfLocations").once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
	          var item = childSnapshot.val();
	          list.push(item);
	        });
	        callback(list);
		});
	}

	function getCompany(companyRef, pin, callback) {
		companyRef.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(childSnapshot.val().pin == pin)
					return childSnapshot.key;
			});
			callback(false);
		});
	}

	function getEmployee(employeeRef, ID, callback) {
		var list = [];
		var ref = employeeRef.child(ID);
		ref.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var data = childSnapshot.val();
				list.push(data);
			});
			callback(list);
		});
	}

	function getIntern(internRef, ID, callback) {
		var list = [];
		var ref = internRef.child(ID);
		ref.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var data = childSnapshot.val();
				list.push(data);
			});
			callback(list);
		});
	}

	function getPreferences(internRef, ID, callback) {
		var options = [];
		var ref = internRef.child(ID).child("options");
		ref.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				options.push(childSnapshot.val());
			})
			callback(options);
		})
	}

	function verifyEmployee(employeeRef, ID, password, callback) {
		var ref = employeeRef.child(ID).child("password");
		var correctPassword;
		ref.once("value").then(function(snapshot) {
			correctPassword = snapshot.val();
			if (password == correctPassword) {
				callback(true);
			}
			else {
				callback(false);
			}
		});
	}

	function verifyIntern(internRef, ID, password, callback) {
		var ref = internRef.child(ID).child("password");
		var correctPassword;
		ref.once("value").then(function(snapshot) {
			correctPassword = snapshot.val();
			if (password == correctPassword) {
				callback(true);
			}
			else {
				callback(false);
			}
		});
	}
