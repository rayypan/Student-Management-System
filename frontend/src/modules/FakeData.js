import { Roles } from "./Types";

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

export const FakeData = [
  {
    role: Roles.ADMIN,
    uid: `UID${0}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `AdminFirst${0}`,
    lastName: `AdminLast${0}`,
    email: `admin${0}@example.com`,
  },
  {
    role: Roles.ADMIN,
    uid: `UID${1}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `AdminFirst${1}`,
    lastName: `AdminLast${1}`,
    email: `admin${1}@example.com`,
  },
  {
    role: Roles.ADMIN,
    uid: `UID${2}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `AdminFirst${3}`,
    lastName: `AdminLast${3}`,
    email: `admin${3}@example.com`,
  },
  {
    role: Roles.ADMIN,
    uid: `UID${4}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `AdminFirst${4}`,
    lastName: `AdminLast${4}`,
    email: `admin${4}@example.com`,
  },
  {
    role: Roles.STUDENT,
    uid: `UID${5}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `StudentFirst${5}`,
    lastName: `StudentLast${5}`,
    email: `student${5}@example.com`,
    roll: `ROLL${5}`,
    subjects: getRandomSubjects(subjectsPool, 3),
  },
  {
    role: Roles.STUDENT,
    uid: `UID${6}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `StudentFirst${6}`,
    lastName: `StudentLast${6}`,
    email: `student${6}@example.com`,
    roll: `ROLL${6}`,
    subjects: getRandomSubjects(subjectsPool, 3),
  },
  {
    role: Roles.STUDENT,
    uid: `UID${7}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `StudentFirst${7}`,
    lastName: `StudentLast${7}`,
    email: `student${7}@example.com`,
    roll: `ROLL${7}`,
    subjects: getRandomSubjects(subjectsPool, 3),
  },
  {
    role: Roles.STUDENT,
    uid: `UID${8}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `StudentFirst${8}`,
    lastName: `StudentLast${8}`,
    email: `student${8}@example.com`,
    roll: `ROLL${8}`,
    subjects: getRandomSubjects(subjectsPool, 3),
  },
  {
    role: Roles.STUDENT,
    uid: `UID${9}`,
    registeredOn: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    firstName: `StudentFirst${9}`,
    lastName: `StudentLast${9}`,
    email: `student${9}@example.com`,
    roll: `ROLL${9}`,
    subjects: getRandomSubjects(subjectsPool, 3),
  },
];

export function fetchRandomFakeData(role = Roles.ADMIN, rollNo = 1) {
  return Promise.resolve(
    FakeData.filter((item) => item.role === role)[
      Math.min(rollNo, FakeData.length - 1)
    ]
  );
}

export function randomRole() {
  const values = Object.values(Roles);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

export function fetchFakeLogin() {
  return fetchRandomFakeData(randomRole());
}
