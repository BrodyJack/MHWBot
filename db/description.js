const sql = require('sqlite3'); // .verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'mhw.db');

module.exports = async (name, callback) => {
    const db = new sql.Database(dbPath, sql.OPEN_READONLY, err => {
        if (err) {
            console.error(err.message);
        }
    });

    const table = 'monster_text';
    const statement = `SELECT * FROM ${table} WHERE lang_id = 'en' AND name = ?`;

    db.get(statement, [name], (err, row) => {
        if (err) {
            throw err;
        }

        if (!row) {
            return callback(null);
        }

        callback(row.description);
    });

    db.close();
};