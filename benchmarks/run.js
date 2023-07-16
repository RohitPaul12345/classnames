let fixtures = require('./fixtures');
let local = require('../');
let dedupe = require('../dedupe');
let localPackage = require('../package.json');

function log (message) {
	console.log(message);
}

try {
	let npm = require('classnames');
	let npmDedupe = require('classnames/dedupe');
	let npmPackage = require('./node_modules/classnames/package.json');
} catch (e) {
	log('There was an error loading the benchmark classnames package.\n' +
		'Please make sure you have run `npm install` in ./benchmarks\n');
	process.exit(0);
}

if (localPackage.version !== npmPackage.version) {
	log('Your local version (' + localPackage.version + ') does not match the installed version (' + npmPackage.version + ')\n\n' +
		'Please run `npm update` in ./benchmarks to ensure you are benchmarking\n' +
		'the latest version of this package.\n');
	process.exit(0);
}

let runChecks = require('./runChecks');
let runSuite = require('./runSuite');

fixtures.forEach(function (f) {
	runChecks(local, npm, dedupe, npmDedupe, f);
	runSuite(local, npm, dedupe, npmDedupe, f, log);
});
