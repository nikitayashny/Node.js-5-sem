const oracledb = require('oracledb');

(async function() {
  try {
    const connection = await oracledb.getConnection({
      user: 'SYSTEM',
      password: '123',
      connectString: '//localhost:1521/XEPDB1'
    });

    const result = await connection.execute('SELECT * FROM Pulpit');

    console.log(result.rows);

    await connection.close();
  } catch (error) {
    console.error(error);
  }
})();