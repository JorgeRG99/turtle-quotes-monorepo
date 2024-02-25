import { ErrorCode } from "../config";
import { connection } from "../services/db-connection";
import { CustomError } from "../utils/classes/CustomError";
import util from 'util';


export async function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];        
        const query = util.promisify(connection.query).bind(connection);
        const user = await query('SELECT * FROM users WHERE token = ?', [token]); 

        if(!user[0]) throw new CustomError('Unauthorized', ErrorCode.Unauthorized);

        next();
    } catch(error) {
        next(error)
    }
}
