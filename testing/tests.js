/* eslint-env mocha */
const server = require('./server');
const request = require('supertest');

const TEST_1 = (done) => {
	request(server)
		.get('/images/aerial.jpg')
		.expect(302)
		.end(done);
};

const TEST_2 = (done) => {
	request(server)
		.get('/images/bridge.jpg')
		.expect(302)
		.end(done);
};

const TEST_3 = (done) => {
	request(server)
		.get('/images/country.jpg')
		.expect(302)
		.end(done);
};

describe('CloudinaryMiddleware tests', () => {
	it('can fetch aerial', TEST_1);
	it('can fetch bridge', TEST_2);
	it('can fetch country', TEST_3);
});
