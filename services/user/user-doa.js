import { prisma } from "../../db";
import { ApolloError } from "apollo-server-errors";

const getUsers = async (
  skip = 0,
  take = 10,
  orderBy = {
    ID: "desc",
  }
) => {
  try {
    const allUsers = await prisma.user.findMany({
      take,
      skip,
      orderBy,
    });
    console.log("allUsers", allUsers);
  } catch (err) {}
};

const getUser = async (id) => {
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        ID: id,
      },
      include: {
        Profile: true,
      },
    });
    return userFound;
  } catch (err) {
    console.log("err", err);
  }
};

const createUser = async (userInput) => {
  const { Profile, Role, ...otherProps } = userInput;
  const user = {
    ...otherProps,
    Profile: {
      create: Profile,
    },
    Admin: Role === "Admin" ? {} : undefined,
    Student: Role === "Student" ? {} : undefined,
    Teacher: Role === "Teacher" ? {} : undefined,
  };
  try {
    const userCreated = await prisma.user.create({
      data: user,
      include: {
        Profile: true,
      },

    })
    console.log("éuserCreated", userCreated.Profile.CreatedAt.toISOString());
    return userCreated;
  } catch (err) {
    if (err.code === "P2002") {
      const attribute = err.meta.target.split("_")[0];
      throw new ApolloError(`${attribute} should be Unique`);
    }
  }
};

export { getUsers, getUser, createUser };
