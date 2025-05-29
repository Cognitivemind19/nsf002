import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";
import * as createCsvWriter from "csv-writer";

interface UserData {
  name: string;
  age: number;
  email: string;
  username: string;
  phone: string;
  address: string;
}

// export const generateFakeUserData = (count: number): UserData[] => {
//   const users: UserData[] = [];
//   for (let i = 0; i < count; i++) {
//     users.push({
//       id: i + 1,
//       name: faker.person.fullName(),
//       age: faker.number.int({ min: 18, max: 80 }),
//       email: faker.internet.email(),
//       phone: faker.phone.number(),
//       address: faker.location.streetAddress(),
//     });
//   }
//   return users;
// };

export const generateFakeUserData = (): UserData => {
  return {
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 80 }),
    email: faker.internet.email(),
    username: faker.internet.username(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
  };
};

export const generateMultipleFakeUserData = (count: number): UserData[] => {
  const users: UserData[] = faker.helpers.multiple(
    () => generateFakeUserData(),
    {
      count: count,
    }
  );
  return users;
};

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const testdataDir = path.resolve(srcDir, "data");

export const exportToJson = (data: UserData[], fileName: string) => {
  fs.writeFileSync(`${testdataDir}/${fileName}`, JSON.stringify(data, null, 2));
  console.log(`Data exported to ${fileName} successfully.`);
};

// generateFakeUserData(10).forEach((user) => {
//   console.log(
//     `ID: ${user.id}, Name: ${user.name}, Age: ${user.age}, Email: ${user.email}, Phone: ${user.phone}, Address: ${user.address}`
//   );
// });

export const exportTocsv = (data: UserData[], fileName: string) => {
  const csvContent = createCsvWriter.createObjectCsvWriter({
    path: `${testdataDir}/${fileName}`,
    header: [
      { id: "name", title: "Name" },
      { id: "age", title: "Age" },
      { id: "email", title: "Email" },
      { id: "username", title: "Username" },
      { id: "phone", title: "Phone" },
      { id: "address", title: "Address" },
    ],
  });
  csvContent.writeRecords(data).then(() => {
    console.log(`Data exported to ${srcDir}/${fileName} successfully.`);
  });
};
