import { isAuthenticated } from "../../../helpers";
import { getUsers, getUser, login } from "../../../services";
import { MyContext } from "../../../types";
const userQueries = {
  getUsers: async (_: any, args: any) => {
    return [];
  },
  getUser: async (_: any, args: { id: any; }) => {
    const result = await getUser(args.id);
    return result;
  },
  login: async (_: any, args: { email: string, password: string }, context: MyContext) => {

    return await login(args.email, args.password, context);
  }
}


export default userQueries;
