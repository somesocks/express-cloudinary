
const Vet = require('vet');
const { optional, isBoolean, isString, isFunction, matchesOneOf } = Vet;
const { matches } = Vet.Object;
const { isArrayOf } = Vet.Array;
const { assert } = Vet.Utils;

const inspect = require('object-inspect');

const minimatch = require('minimatch');

const URI = require('urijs');

const Cloudinary = require('cloudinary');

const isValidMatcher = matchesOneOf(isString, isFunction);

const isValidConfig = matches({
	cloudinary: {
		cloud_name: isString,
		api_key: isString,
		api_secret: isString,
		secure: optional(isBoolean),
		cdn_subdomain: optional(isBoolean),
	},
	shouldRedirect: optional(isValidMatcher),
	noCDNFlag: optional(isString),
	enable: optional(isBoolean),
	buildCloudinaryRequest: optional(isFunction),
});

isValidConfig.assert = assert(
	isValidConfig,
	(config) => `CloudinaryMiddleware: invalid config ${inspect(config)}`
);

const globMatcher = (pattern) => (req) => minimatch(req.path, pattern);

const defaultShouldRedirect = (req) => true;

const getRequestMatcher = (req) => req.method === 'GET';

const noCDN = (flag) => (req) => req.query && req.query.hasOwnProperty(flag);

const cloudinaryRequestBuilder = (config) => (req) => {
	let url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

	url = URI(url)
		.addQuery(config.noCDNFlag || 'nocdn')
		.toString();

	const params = {
		type: 'fetch',
	};

	if (req.query && req.query.width) {
		params.width = req.query.width;
	}

	if (req.query && req.query.height) {
		params.height = req.query.height;
	}

	if (req.query && req.query.quality) {
		params.quality = req.query.quality;
	} else {
		params.quality = 'auto:best';
	}

	if (req.query && req.query.crop) {
		params.crop = req.query.crop;
	}

	url = Cloudinary.url(url, params);

	return url;
};

function CloudinaryMiddleware(config) {
	isValidConfig.assert(config);

	const isGetRequest = getRequestMatcher;

	const shouldRedirect =
		(isFunction(config.shouldRedirect) ? config.shouldRedirect : null) ||
		(isString(config.shouldRedirect) ? globMatcher(config.shouldRedirect) : null) ||
		defaultShouldRedirect;

	const hasNoCDNFlag = noCDN(config.noCDNFlag || 'nocdn');

	const buildURL = cloudinaryRequestBuilder(config);

	// TODO figure out how to have multiple instances of Cloudinary here
	Cloudinary.config(config.cloudinary);

	return function cloudinaryMiddleware(req, res, next) {
		if (
			!isGetRequest(req) ||
			!shouldRedirect(req) ||
			hasNoCDNFlag(req)
		) {
			next();
			return;
		}

		const cloudinaryURL = buildURL(req);

		res.redirect(302, cloudinaryURL);
	};
}


module.exports = CloudinaryMiddleware;
