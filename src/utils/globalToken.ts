let forgotPasswordToken: string | null = null;

export const setForgotPasswordToken = (token: string | null) => {
  forgotPasswordToken = token;
};

export const getForgotPasswordToken = () => forgotPasswordToken;
