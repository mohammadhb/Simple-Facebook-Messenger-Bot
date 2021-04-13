module.exports = {
	development: {
		url: process.env.POSTGRESQL_DEV_DATABASE_URL,
		database: process.env.POSTGRESQL_DEV_DATABASE_NAME,
		host: process.env.POSTGRESQL_DEV_DATABASE_HOST,
		username: process.env.POSTGRESQL_DEV_DATABASE_USER,
		password: process.env.POSTGRESQL_DEV_DATABASE_PASS,
		dialect: "postgres",
	},
	test: {
		url: process.env.POSTGRESQL_TEST_DATABASE_URL,
		database: process.env.POSTGRESQL_TEST_DATABASE_NAME,
		host: process.env.POSTGRESQL_TEST_DATABASE_HOST,
		username: process.env.POSTGRESQL_TEST_DATABASE_USER,
		password: process.env.POSTGRESQL_TEST_DATABASE_PASS,
		dialect: "postgres",
	},
	production: {
		url: process.env.POSTGRESQL_PROD_DATABASE_URL,
		database: process.env.POSTGRESQL_PROD_DATABASE_NAME,
		host: process.env.POSTGRESQL_PROD_DATABASE_HOST,
		username: process.env.POSTGRESQL_PROD_DATABASE_USER,
		password: process.env.POSTGRESQL_PROD_DATABASE_PASS,
		dialect: "postgres",
	}
};