import { getUsers, getUser } from "../../../services";
const userQueries = {
  getUsers: async (_, args) => {
    return [];
  },
  getUser: async (_, args) => {
    const result = await getUser(args.id);
    return result;
  },
};

export default userQueries;
