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

function getRandomSubjects(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

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
      uid: `UID${1000 + i}`,
      registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
      firstName: `StudentFirst${i}`,
      lastName: `StudentLast${i}`,
      email: `student${i}@example.com`,
      roll: `ROLL${2000 + i}`,
      subjects: getRandomSubjects(subjectsPool, 3),
    };
  }
});

export function fetchRandomFakeData(role = Roles.ADMIN, rollNo = 1) {
  return Promise.resolve(
    FakeData.filter((item) => item.role === role)[
      Math.min(rollNo, FakeData.length - 1)
    ]
  );
}
