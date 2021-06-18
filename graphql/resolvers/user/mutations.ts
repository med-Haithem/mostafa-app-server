import { createUser } from "../../../services/user/user-doa";

const userMutations = {
  createUser: async (_: any, args: { userInput: any; }) => {
    return createUser(args.userInput);
  },
  //updateUser: async (_, args) => {},
};

export default userMutations;
