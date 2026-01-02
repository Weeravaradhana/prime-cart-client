export interface BaeUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  imageUrl?: string;
  publicId?: string;

}

export interface ConnectedUser extends BaeUser{
  authorities?: string[];
}
