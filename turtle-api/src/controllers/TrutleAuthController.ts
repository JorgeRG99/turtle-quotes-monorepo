import { AuthModel } from '../models/AuthModel';
import { validateUser } from '../schemas/User';

export class TurtleAuthController {
  static login(req, res) {
    res.send('login');
  }

  static async register(req, res, next) {
    try {
      const validationResult = validateUser(req.body);

      if (!validationResult.success) {
        res.status(422).json({error: validationResult.error});

        return
      } 

      const newUser = await AuthModel.register({ ...req.body });

      res.status(200).json({
        message: 'User created successfully',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
