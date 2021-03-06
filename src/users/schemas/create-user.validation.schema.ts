import * as Joi from '@hapi/joi';

export const CreateUserSchema: Joi.ObjectSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  roles: Joi.array().required(),
});
