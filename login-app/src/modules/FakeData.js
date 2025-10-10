import { Roles } from "./Types";

const roles = [Roles.ADMIN, Roles.STUDENT];
const subjectsPool = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "English",
  "CS",
  "Economics",
];

export const FakeData = Array.from({ length: 20 }, (_, i) => {
  const role = roles[Math.floor(Math.random() * roles.length)];

  if (role === "ADMIN") {
    return {
      role,
      uid: `UID${1000 + i}`,
      registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
      firstName: `AdminFirst${i}`,
      lastName: `AdminLast${i}`,
      email: `admin${i}@example.com`,
    };
  } else {
    return {
      role,
      roll: `ROLL${2000 + i}`,
      subjects: Array.from(
        new Set(
          Array.from(
            { length: Math.floor(Math.random() * 5) + 1 },
            () => subjectsPool[Math.floor(Math.random() * subjectsPool.length)]
          )
        )
      ),
    };
  }
});

export function fetchRandomFakeData(rollNo) {
  return Promise.resolve(FakeData[1]);
}
