const sql = require("mariadb");
const pool = sql.createPool({
	host: "localhost",
	user: "root",
	// password: "",
	database: "grosery",
	connectionLimit: 5,
});
module.exports = pool;

// class sqlConnection {
// 	connect2sql() {

// 	}
// }

// const myCon = new sqlConnection();
// myCon.connect2sql();
