const connection = require('./connection.js');

// Import MySQL connection.
class ORM {
    connection;

    constructor(connection) {
        this.connection = connection;
    }

    // make queries use promises
    query = (queryString, vals) => {
        return new Promise((resolve, reject) => {
            this.connection.query(queryString, vals, function(err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    };

    printQuestionMarks(num) {
        const arr = [];

        for (let i = 0; i < num; i++) {
            arr.push('?');
        }
        return arr.toString();
    }

    objToSql(ob) {
        const arr = [];

        for (let key in ob) {
            const value = ob[key];
            // check to skip hidden properties
            if (Object.hasOwnProperty.call(ob, key)) {
                if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                    value = "'" + value + "'";
                }

                arr.push(key + '=' + value);
            }
        }
        return arr.toString();
    }

    selectAll(tableInput) {
        return this.query('SELECT * FROM ' + tableInput + ';');
    }

    insertOne(table, cols, vals) {
        let queryString = 'INSERT INTO ' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += this.printQuestionMarks(vals.length);
        queryString += ');';

        return this.query(queryString, vals);
    }

    updateOne(table, objColVals, condition) {
        let queryString = 'UPDATE ' + table;

        queryString += ' SET ';
        queryString += this.objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        return this.query(queryString);
    }

    deleteOne(table, condition) {
        let queryString = 'DELETE FROM ' + table;
        queryString += ' WHERE ';
        queryString += condition;

        return this.query(queryString);
    }
}

// Export an instance of the ORM object
module.exports = new ORM(connection);