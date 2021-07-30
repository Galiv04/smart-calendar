// testing
user = "galiv04@gmail.com";

// Firebase

var firebaseConfig = {
  apiKey: "AIzaSyB8zIm4HC6LeLgLbU5qlYgNNe0aEPHes8Y",
  authDomain: "calen-dard.firebaseapp.com",
  projectId: "calen-dard",
  storageBucket: "calen-dard.appspot.com",
  messagingSenderId: "555896146781",
  appId: "1:555896146781:web:9aa4f28c385a9b13c436b4",
  measurementId: "G-S99YQ4L3CQ",
};
// Initialize Firebase
fb = firebase.initializeApp(firebaseConfig);
firebase.analytics();

db = firebase.firestore();

// data init

window.currentMonthEvents = [];

// Function Utilities
getDayString = function (day) {
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      break;
  }
};
getMonthString = function (month) {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      break;
  }
};
getDayOfMonth = function (day, month, year) {
  return (d = new Date(year, month, day));
};

convertDatetimeToHuman = function (datetimeString) {
  d = new Date(datetimeString);

  day = d.getDate();
  month = getMonthString(d.getMonth());
  monthNumber = d.getMonth();
  year = d.getFullYear();
  hours = d.getHours();
  minutes = d.getMinutes();
  fbTimestampSeconds = d.getTime() / 1000; //seconds

  return (dateTime = {
    day,
    month,
    monthNumber,
    year,
    hours,
    minutes,
    fbTimestampSeconds,
  });
};

// Functions
function prevYear() {
  year = year - 1;
  refreshCalendar();
}
function nextYear() {
  year = year + 1;
  refreshCalendar();
}
function prevMonth() {
  month = month - 1;
  if (month == -1) {
    month = 11;
    year = year - 1;
  }
  refreshCalendar();
}
function nextMonth() {
  month = month + 1;
  if (month == 12) {
    month = 0;
    year = year + 1;
  }
  refreshCalendar();
}
function writeCalendar() {
  // Write days of previous month
  for (let i = firstDayOfCurrentMonthNumber - 1; i > -7; i--) {
    dateNumber =
      lastDayOfPreviousMonthDate + i - firstDayOfCurrentMonthNumber + 1;
    document.getElementById("d" + i).innerHTML = dateNumber;

    document.getElementById("d" + i + "-props").className =
      "calendar-table__col calendar-table__inactive";
  }

  // Write days of current month
  for (
    let i = firstDayOfCurrentMonthNumber;
    i < lastDayOfCurrentMonthDate + firstDayOfCurrentMonthNumber;
    i++
  ) {
    dateNumber = i + 1 - firstDayOfCurrentMonthNumber;
    document.getElementById("d" + i).innerHTML = dateNumber;
    document.getElementById("d" + i + "-props").className =
      "calendar-table__col ";

    // Today
    if (
      today.getDate() == dateNumber &&
      year == today.getFullYear() &&
      month == today.getMonth()
    ) {
      document.getElementById("d" + i + "-props").className =
        "calendar-table__col calendar-table__today";
    }

    currentMonthEvents.forEach((e) => {
      if (e.day == dateNumber) {
        e.events.forEach((event) => {
          document
            .getElementById("d" + i + "-props")
            .classList.add("calendar-table__event-" + event.color);
        });
      }
    });
  }

  // Write days of next month
  for (
    let i = lastDayOfCurrentMonthDate + firstDayOfCurrentMonthNumber;
    i < 43;
    i++
  ) {
    dateNumber =
      i - (lastDayOfCurrentMonthDate + firstDayOfCurrentMonthNumber) + 1;
    document.getElementById("d" + i).innerHTML = dateNumber;
    document.getElementById("d" + i + "-props").className =
      "calendar-table__col calendar-table__inactive";
  }
}
function refreshCalendar() {
  // Define useful variables
  window.monthString = getMonthString(month);

  window.titleYear = document.getElementById("title-year");
  titleYear.innerHTML = year;

  window.titleMonth = document.getElementById("title-month");
  titleMonth.innerHTML = monthString;

  window.firstDayOfCurrentMonth = getDayOfMonth(1, month, year);
  window.firstDayOfCurrentMonthNumber = firstDayOfCurrentMonth.getDay(); //0-6

  window.lastDayOfPreviousMonth = getDayOfMonth(0, month, year);
  window.lastDayOfPreviousMonthDate = lastDayOfPreviousMonth.getDate(); //1-31

  window.lastDayOfCurrentMonth = getDayOfMonth(0, month + 1, year);
  window.lastDayOfCurrentMonthDate = lastDayOfCurrentMonth.getDate(); //1-31

  // get data from firestore

  ref = db
    .collection("usersEvents")
    .doc(user)
    .collection("years")
    .doc(year.toString())
    .collection("months")
    .doc(monthString.toLowerCase())
    .collection("days");

  ref
    .get()
    .then((querySnapshot) => {
      // console.log(querySnapshot.docs.length);
      if (querySnapshot.docs.length != 0) {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          data = doc.data();
          element = { day: doc.id, ...data };
          currentMonthEvents.push(element);
        });
      } else {
        currentMonthEvents = [];
      }
      console.log("Current Month Events:", currentMonthEvents);
      writeCalendar();
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
      currentMonthEvents = [];
      writeCalendar();
    });
}

// Run On Page Load
window.onload = function () {
  window.today = new Date();
  window.year = today.getFullYear();
  window.month = today.getMonth();
  window.day = today.getDay();

  refreshCalendar();
};

// Add new event
function updateEventData() {}

function addNewEvent() {
  // check variables
  if (
    newEvent.name &&
    newEvent.startDate &&
    newEvent.endDate /*add better check */
  ) {
    docRef = db
      .collection("usersEvents")
      .doc(user)
      .collection("years")
      .doc(newEvent.startDate.year.toString()) //year
      .collection("months")
      .doc(newEvent.startDate.month.toLowerCase()) //monthString
      .collection("days")
      .doc(newEvent.startDate.day.toString());

    docRef.get().then((doc) => {
      console.log(doc.exists);
      if (doc.exists) {
        thisEvent = {
          name: newEvent.name,
          startDate: new firebase.firestore.Timestamp(
            newEvent.startDate.fbTimestampSeconds,
            0
          ),
          endDate: new firebase.firestore.Timestamp(
            newEvent.endDate.fbTimestampSeconds,
            0
          ),
          note: newEvent.note,
          color: newEvent.color,
        };
        data = doc.data();
        events = data.events; //current events
        events.push(thisEvent); //updated events

        docRef
          .set({
            events: events,
          })
          .then(() => {
            console.log("Successfully added event to db");
            closeModalEvent();
            refreshCalendar();
          })
          .catch((error) => {
            console.error("Error adding new event: ", error);
            closeModalEvent();

          });
      } else {
        docRef.set({
          events: [
            {
              name: newEvent.name,
              startDate: new firebase.firestore.Timestamp(
                newEvent.startDate.fbTimestampSeconds,
                0
              ),
              endDate: new firebase.firestore.Timestamp(
                newEvent.endDate.fbTimestampSeconds,
                0
              ),
              note: newEvent.note,
              color: newEvent.color,
            },
          ],
        });
      }
    });
  } else {
    return;
  }
}

function newEventBtn() {
  console.log("addEvent clicked");
  window.buttonId = "addEvent";
  document.querySelector("#modal-container").classList.add(buttonId);

  // Standard parameters needed for New Event Creation
  window.newEvent = {
    name: undefined,
    startDate: undefined,
    endDate: undefined,
    note: undefined,
    color: "color-1",
  };
  console.log("New Event:", newEvent);
}

function closeModalEvent() {
  document.getElementById("modal-container").classList.add("out");
  setTimeout(function () {
    document.getElementById("modal-container").classList.remove("out");
    document.getElementById("modal-container").classList.remove(buttonId);
    console.log("modal closed");
  }, 200);
}

function setNewEventName(e) {
  newEvent.name = e;
  console.log("New Event:", newEvent);
}

function selectNewEventDatetime(e, type) {
  if (type == "start") {
    newEvent.startDate = convertDatetimeToHuman(e);
  } else {
    newEvent.endDate = convertDatetimeToHuman(e);
  }
  console.log("New Event:", newEvent);
}

function setNewEventNote(e) {
  newEvent.note = e;
  console.log("New Event:", newEvent);
}

function setNewEventCategory(e) {
  newEvent.color = e;
  console.log("New Event:", newEvent);
}
