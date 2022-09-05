import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';
import { findDay, getStartAndEndOfWeek } from '../DateTimeHelpers/DateTimeHelpers';

function createMockWeekData(limit = 7, docData, offSet = 0) {
  const today = findDay();

  const currentDay = today.getDay();

  const currentDate = today.getDate();

  const daysToOffset = currentDate - currentDay - offSet;

  today.setDate(daysToOffset);

  for (let j = 0; j < limit; j++) {
    const randomTime = (Math.random() * 1000000) | 0;
    docData.week.push({ time: randomTime, date: today.toDateString() });
    docData.totalTime += randomTime;
    today.setDate(today.getDate() + 1);
  }
}

export const writeMockData = async (offset = 7) => {
  const ids = ['1661544690458', '1661544782337', '1661544788019'];
  const names = ['She', 'Cardio', 'Cooking'];

  const [startedAt, expiredAt] = getStartAndEndOfWeek();
  startedAt.setHours(0, 0, 0, 0);
  startedAt.setDate(startedAt.getDate() - offset);
  expiredAt.setDate(expiredAt.getDate() - offset);

  for (let i = 0; i < names.length; i++) {
    let toWrite = {};
    const name = names[i];
    const id = ids[i];

    toWrite.totalTime = 0;
    toWrite.week = [];
    toWrite.name = name;
    toWrite.id = Number(id);
    toWrite.startedAt = startedAt;
    toWrite.endedAt = expiredAt;

    createMockWeekData(7, toWrite, offset);

    await setDoc(
      doc(db, 'WifmtBz1MEhzQtiTflN7kOAqSzr1', 'History', id, startedAt.toISOString()),
      toWrite
    );
  }
};

// id is the actual name of the COLLECTION to write to, so for each of the weekly activities,
//the doc ID must be extracted.

// the  ID of the document to be written to the collection is the startedAt date

/*

structure :

for each item in the weekly activities array
document ={

    endedAt : acvitivies.Expiresat
    startedAt: activities.startedAt,

}

 document.totalTime = activitiesarray[i].totalTime;

 need array of week to date string names generated
    loop over that
    // add the corresponding doc in the activities[i] object
    // or set it to {date: (dateString): time :0 }

*/

// each id object in weeklyActivities will have a totalTime property, which will be written to the corresponding
//totalTime property in the history object
// weekly activities becomes  week  === array of objects  {date: (dateString): time: centiseconds number }
const userId = 'WifmtBz1MEhzQtiTflN7kOAqSzr1';
async function transformData() {
  try {
    const weeklyActivities = await getDoc(doc(db, 'WifmtBz1MEhzQtiTflN7kOAqSzr1', 'activities'));
    if (weeklyActivities.exists()) {
      buildObject(weeklyActivities.data());
    }
  } catch (error) {}
}

export const buildObject = async function (data, userId) {
  const batch = writeBatch(db);
  let docName = data.startedAt.toDate();
  docName.setHours(0, 0, 0, 0);
  for (let i = 0; i < data.weeklyActivities.length; i++) {
    const document = {
      startedAt: data.startedAt,
      endedAt: data.expiresAt,
      week: [],
    };
    let weeklyActivityData = data.weeklyActivities[i];
    document.totalTime = weeklyActivityData.totalTime;
    document.id = weeklyActivityData.id;
    document.name = weeklyActivityData.name;
    constructDates(document.startedAt, weeklyActivityData, document.week);
    const documentRef = doc(db, userId, 'test', document.id.toString(), docName.toISOString());
    batch.set(documentRef, document);
  }
  await batch.commit();
};

function constructDates(startedAt, activityObj, week) {
  let currentDay = new Date(startedAt.toDate());
  console.log(activityObj);

  for (let i = 0; i < 7; i++) {
    let dateObj = {};
    dateObj.date = currentDay.toDateString();

    dateObj.time = activityObj[currentDay.toDateString()] || 0;
    week.push(dateObj);
    currentDay.setDate(currentDay.getDate() + 1);
  }
}
