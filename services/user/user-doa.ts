import { prisma } from "../../db";
import { ApolloError } from "apollo-server-errors";
import { AuthenticationError } from "apollo-server-express";
import { comparePassword, encryptPassword, createAccessToken, createRefreshToken, sendRefreshToken } from "../../helpers";
import { MyContext } from "../../types";

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
    });
    console.log("allUsers", allUsers);
  } catch (err) { }
};

const getUser = async (id: number) => {
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

const register = async (userInput: any) => {
  const { Profile, Role, ...otherProps } = userInput;
  const { Password, ...otherUserProps } = otherProps;
  const user = {
    ...otherUserProps,
    Password: await encryptPassword(Password),
    Profile: {
      create: Profile,
    },
    Admin: Role === "Admin" ? {} : undefined,
    Student: Role === "Student" ? {} : undefined,
    Teacher: Role === "Teacher" ? {} : undefined,
  };
  try {
    const userCreated = await prisma.user.create({
      data: user
    })
    const accessToken = createAccessToken({ userID: userCreated.ID });
    return { accessToken };
  } catch (err) {
    if (err.code === "P2002") {
      const attribute = err.meta.target.split("_")[0];
      throw new ApolloError(`${attribute} should be Unique`);
    }
  }
};

const login = async (email: string, password: string, { res }: MyContext) => {
  const userFound = await prisma.user.findUnique({
    where: {
      Email: email
    },
  });
  if (!userFound) throw new AuthenticationError("Wrong Email!");

  const isMatch = await comparePassword(password, userFound.Password);
  if (isMatch) {
    const accessToken = createAccessToken({ userID: userFound.ID, tokenVersion: userFound.tokenVersion });
    const refreshToken = createRefreshToken({ userID: userFound.ID, tokenVersion: userFound.tokenVersion });
    sendRefreshToken(res, refreshToken);
    return { accessToken };
  } else {
    throw new AuthenticationError("Wrong Password!");
  }
}



export { getUsers, getUser, register, login };
