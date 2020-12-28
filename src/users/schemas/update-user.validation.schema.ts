import * as Joi from '@hapi/joi';

export const UpdateUserSchema: Joi.ObjectSchema = Joi.object({
  userName: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
});
