import { prisma } from "../../../db";
import { register } from "../../../services/user/user-doa";
import { MyContext } from "../../../types";

const userMutations = {
  register: async (_: any, args: { userInput: any; }, { req, res }: MyContext,) => {
    return register(args.userInput);
  },
  revokeToken: async (_: any, args: { id: number; }, { req, res }: MyContext,) => {
    try {
      await prisma.$executeRaw(`update user set tokenVersion = tokenVersion+1 where ID = ${args.id}`);
    }
    catch (err) {
      return false;
    }
    return true;
  },
  //updateUser: async (_, args) => {},
};

export default userMutations;
