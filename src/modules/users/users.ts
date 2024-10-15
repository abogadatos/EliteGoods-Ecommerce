// import { Injectable } from '@nestjs/common';

// type User = {
//   id: number;
//   fullName: string;
//   dni: number;
//   birthdate?: Date;
//   email: string;
//   password: string;
//   phone: number;
//   country?: string;
//   address?: string;
//   city?: string;
//   token: string;
//   isAdmin?: boolean;
// };

// @Injectable()
// export class UsersRepository {
//   private users: User[] = [
//     {
//       id: 1,
//       fullName: 'Eve Green',
//       dni: 87651234,
//       email: 'eve.green@example.com',
//       password: 'NBq8r2Lh',
//       phone: 5555678901,
//       country: 'Germany',
//       city: 'Berlin',
//       token: 'token901stu',
//     },
//     {
//       id: 2,
//       fullName: 'John Doe',
//       dni: 12345678,
//       email: 'john.doe@example.com',
//       password: '66xFkSIRFt84bnwgR',
//       phone: 5551234567,
//       country: 'USA',
//       city: 'New York',
//       token: 'token123abc',
//     },
//     {
//       id: 3,
//       fullName: 'Jane Smith',
//       dni: 87654321,
//       email: 'jane.smith@example.com',
//       password: 'ALyAtW',
//       phone: 5559876543,
//       country: 'Canada',
//       city: 'Toronto',
//       token: 'token456def',
//     },
//     {
//       id: 4,
//       fullName: 'Alice Johnson',
//       dni: 12349876,
//       email: 'alice.johnson@example.com',
//       password: 'r9ceCsxAF',
//       phone: 5558765432,
//       country: 'UK',
//       city: 'London',
//       token: 'token789ghi',
//     },
//     {
//       id: 5,
//       fullName: 'Bob Brown',
//       dni: 98761234,
//       email: 'bob.brown@example.com',
//       password: 'Z5t3NoEVjOfZxVEGvA',
//       phone: 5552345678,
//       country: 'Australia',
//       city: 'Sydney',
//       token: 'token012jkl',
//     },
//     {
//       id: 6,
//       fullName: 'Charlie Davis',
//       dni: 65432187,
//       email: 'charlie.davis@example.com',
//       password: 'u91Dp8tmg6HHF2',
//       phone: 5553456789,
//       country: 'New Zealand',
//       city: 'Auckland',
//       token: 'token345mno',
//     },
//     {
//       id: 7,
//       fullName: 'Dana White',
//       dni: 12348765,
//       email: 'dana.white@example.com',
//       password: '7ZnNmI9n6pWOTu1P8U',
//       phone: 5554567890,
//       country: 'Ireland',
//       city: 'Dublin',
//       token: 'token678pqr',
//     },
//     {
//       id: 8,
//       fullName: 'Frank Black',
//       dni: 98765432,
//       email: 'frank.black@example.com',
//       password: 'QduhMNFqSPZyGz',
//       phone: 5556789012,
//       country: 'France',
//       city: 'Paris',
//       token: 'token234vwx',
//     },
//     {
//       id: 9,
//       fullName: 'Grace White',
//       dni: 12345679,
//       email: 'grace.white@example.com',
//       password: 'iJuqTDA3RZBUzlpLvhl',
//       phone: 5557890123,
//       country: 'Italy',
//       city: 'Rome',
//       token: 'token567yz',
//     },
//     {
//       id: 10,
//       fullName: 'Hank Purple',
//       dni: 87654329,
//       email: 'hank.purple@example.com',
//       password: '46NvWZI3J19cTG5',
//       phone: 5558901234,
//       country: 'Spain',
//       city: 'Madrid',
//       token: 'token890abc',
//     },
//     {
//       id: 11,
//       fullName: 'Mara Ximena',
//       dni: 53554329,
//       email: 'mara.xime@example.com',
//       password: 'Password823190!',
//       phone: 5214901234,
//       country: 'Mexico',
//       city: 'Puebla',
//       token: 'token8902abc',
//     },
//   ];

//   getAllUsersFilter(page: number, limit: number) {
//     const startIndex = (page - 1) * limit;
//     const endIndex = startIndex + +limit;
//     const userList = this.users.slice(startIndex, endIndex);

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     return userList.map(({ password, ...user }) => user);
//   }

//   getUserById(id) {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const prueba = this.users.map(({ password, ...user }) => user);
//     return prueba.filter((user) => user.id === id);
//   }

//   createUserr(user: User) {
//     const id = this.users.length + 1;
//     user.id = id;

//     this.users.push(user);

//     const { password, ...userWithoutPass } = user;
//     password;
//     console.log(userWithoutPass);
//     console.log(user);
//     return {
//       message: `User created successfuly`,
//       newUserData: user,
//     };
//   }

//   deleteUser(id: number) {
//     const index = this.users.findIndex((user) => user.id === id);
//     const user = this.users[index];

//     this.users.splice(index, 1);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password, ...userWithoutPass } = user;
//     return userWithoutPass;
//   }

//   updateUser(id: number, user: Partial<User>) {
//     const oldUser = this.users.find((usuario) => usuario.id === +id);
//     if (!oldUser) {
//       return `Este usuario no existe`;
//     }

//     const updatedUser = { ...oldUser, ...user };

//     const index = this.users.findIndex((user) => user.id === id);
//     this.users[index] = updatedUser;

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password, ...userWithoutPassword } = updatedUser;

//     return updatedUser;
//   }

//   getUserByEmail(email: string) {
//     const userEmailExist = this.users.find((user) => user.email === email);
//     return userEmailExist;
//   }
// }
