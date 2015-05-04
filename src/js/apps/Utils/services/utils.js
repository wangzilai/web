const sleep = require('co-sleep');

module.exports = /*@ngInject*/function(co) {
	const self = this;

	this.hexify = (binaryString) => openpgp.util.hexstrdump(binaryString);

	this.def = (call, def) => {
		try {
			return call();
		} catch(err) {
			return def;
		}
	};

	this.getRandomString = (size) => openpgp.util.hexstrdump(openpgp.crypto.random.getRandomBytes(size));

	this.uniq = (array, key = null) => {
		if (!key)
			key = c => c;

		return [...array.reduce((map, c) => {
			map.set(key(c), c);
			return map;
		}, new Map()).values()];
	};

	this.uniqMap = (array, map) => self.uniq(array.map(map));

	this.toArray = (obj) => {
		return Object.keys(obj).reduce((a, k) => {
			a.push(obj[k]);
			return a;
		}, []);
	};

	this.sleep = (time) => co(function *(){
		yield sleep(time);
	});

	this.wait = (condition, checkTimeout = 100) => co(function *(){
		while (!condition()) {
			yield self.sleep(checkTimeout);
		}
	});

	this.getEmailFromAddressString = (address) => address.match(/<([^>]+)>/)[1];
};