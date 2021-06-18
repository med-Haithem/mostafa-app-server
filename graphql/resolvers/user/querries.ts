import { getUsers, getUser } from "../../../services";
const userQueries = {
  getUsers: async (_: any, args: any) => {
    return [];
  },
  getUser: async (_: any, args: { id: any; }) => {
    const result = await getUser(args.id);
    return result;
  },
};

export default userQueries;
