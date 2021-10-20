/**
 * Module which exports the correct error message according the given status, using the property **throw**.
 * 
 * Its first parameter is the corresponding status and the second one is the message that you would like
 * to return. 
 * For exemple: 
 * 
 * const function = (data) => {
   const { error } = JoiSchema.validate(data);
   if (error) throw validateError(400, 'hello world');
}
 */
module.exports = {
    validateError: (status, message) => ({
      status,
      message,
    }),
  };