import { IPostImage } from "./postType";

export interface IUser {
  userID: string;
  username: string;
  email: string;
  description: string;
  icon: IPostImage;
  password: string;
  dateCreated: Date;
}