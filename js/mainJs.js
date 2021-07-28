// data for testing

window.currentMonthEvents = [
  {
    name: "Call with Mario",
    startDate: {
      day: 20,
      month: 6,
      year: 2021,
      hours: 15,
      minutes: 22,
    },
    endDate: {
      day: 20,
      month: 6,
      year: 2021,
      hours: 16,
      minutes: 52,
    },
    note: "ciao ciao",
    color: 1,
  },
  {},
];

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
  year = d.getFullYear();
  hours = d.getHours();
  minutes = d.getMinutes();

  return (dateTime = {
    day,
    month,
    year,
    hours,
    minutes,
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

function refreshCalendar() {
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

    currentMonthEvents.forEach((event) => {
      if (event.startDate != undefined && event.startDate.day == dateNumber) {
        document
          .getElementById("d" + i + "-props")
          .classList.add("calendar-table__event-color" + event.color);
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

function addEventData() {}

function newEvent() {
  console.log("addEvent clicked");
  window.buttonId = "addEvent";
  document.querySelector("#modal-container").classList.add(buttonId);
  // activate focus on modal - close when out of focus
  // document.getElementById("modal-rectangle").focus();
}

function closeModalEvent() {
  document.getElementById("modal-container").classList.add("out");
  setTimeout(function () {
    document.getElementById("modal-container").classList.remove("out");
    document.getElementById("modal-container").classList.remove(buttonId);
  }, 200);
}

function selectDatetime(e, type) {
  if (type == "start") {
    window.startDatetime = convertDatetimeToHuman(e);
  } else {
    window.endDatetime = convertDatetimeToHuman(e);
  }
  console.log("selected dateTime: ", dateTime);
}
