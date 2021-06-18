import { createUser } from "../../../services/user/user-doa";

const userMutations = {
  createUser: async (_, args) => {
    return createUser(args.userInput);
  },
  //updateUser: async (_, args) => {},
};

export default userMutations;
