const pool= require('./db');
async function testConnection(){
	try{
		const conn= await pool.getConnection();
		// const rows= await conn.query("SELECT 1 as val");
		rows = await conn.query("SELECT * FROM ProductWithImages");
		console.log(rows);
		conn.release();
	}catch(err){
		console.error("connection Error", err);
	}
}
testConnection();