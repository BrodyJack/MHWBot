const sql = require('sqlite3'); // .verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'mhw.db');

module.exports = async (name, callback) => {
    const db = new sql.Database(dbPath, sql.OPEN_READONLY, err => {
        if (err) {
            console.error(err.message);
        }
    });

    const monsterTable = 'monster';
    const monsterTextTable = 'monster_text';
    const statement = `SELECT 
    has_weakness,
    weakness_fire,
    weakness_water,
    weakness_ice,
    weakness_thunder,
    weakness_dragon,
    weakness_poison,
    weakness_sleep,
    weakness_paralysis,
    weakness_blast,
    weakness_stun
    FROM ${monsterTable} WHERE id = (SELECT id FROM ${monsterTextTable} WHERE lang_id = 'en' AND name = ?)`;


    db.get(statement, [name], (err, row) => {
        if (err) {
            throw err;
        }

        if (!row) {
            return callback(null);
        }

        callback(row);
    });

    db.close();
};