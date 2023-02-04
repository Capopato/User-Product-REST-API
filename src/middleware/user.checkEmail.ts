import User from "../models/user.models";

export const checkEmailInUsee = async (email: string) => {
  return await User.find({}, { email: email }, function (err, result) {
    console.log("Test");
    if (err) {
      console.log("Email already in use.");
    }
    return result;
  });
};
