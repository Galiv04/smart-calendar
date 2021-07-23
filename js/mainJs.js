// Function Utilities
var getDayString = function (day) {
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
var getMonthString = function (month) {
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
var getDayOfMonth = function (day, month, year) {
  return (d = new Date(year, month, day));
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

function addEvent() {
    console.log("addEvent clicked");
//   calendar = document.getElementById("calendar-container");
//   calendar.style.display = "none";

  
}
