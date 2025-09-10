
//@ts-ignore
export const passwordValidator = (value, helpers) => {
  if (value.length < 6) {
    return helpers.message('password must be upper 6 chars');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contains chars and numbers');
  }
  return value;
};

