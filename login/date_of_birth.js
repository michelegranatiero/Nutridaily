//script JQuery spunto da stackoverflow-->
//https://stackoverflow.com/questions/7574678/is-there-a-semantic-way-of-using-3-select-boxes-to-choose-dateofbirth


var Days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];// index => month [0-11]
//const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
$(document).ready(function () {
  const d = new Date();
  var d_day = d.getDate();
  var d_month = months[d.getMonth()]; //i mesi partono da 0 in javascript
  var d_year = d.getFullYear();
  var option = '<option value="' + d_day + '"selected hidden>' + d_day + '</option>';
  var selectedDay = d_day;
  for (var i = 1; i <= Days[0]; i++) { //add option days
    option += '<option value="' + i + '">' + i + '</option>';
  }
  $("#day").append(option);
  $("#day").val(selectedDay);

  var option = '<option value="' + d_month + '"selected hidden>' + d_month + '</option>';
  var selectedMon = d_month;
  for (var i = 0; i <= months.length - 1; i++) {
    option += '<option value="' + months[i] + '">' + months[i] + '</option>';
  }
  $('#month').append(option);
  $('#month').val(selectedMon);

  var option = '<option value="' + d_year + '"selected hidden>' + d_year + '</option>';
  selectedYear = d_year;
  for (var i = d_year; i >= 1930; i--) { // years start i
    option += '<option value="' + i + '">' + i + '</option>';
  }
  $('#year').append(option);
  $('#year').val(selectedYear);
});
function isLeapYear(year) {
  year = parseInt(year);
  if (year % 4 != 0) {
    return false;
  } else if (year % 400 == 0) {
    return true;
  } else if (year % 100 == 0) {
    return false;
  } else {
    return true;
  }
}

function change_year(select) {
  Days[1] = 28;
  if (isLeapYear($(select).val())) {
    Days[1] = 29;
  }
  if (months.indexOf($('#month').val()) == 1) {
    var day = $('#day');
    var val = $(day).val();
    $(day).empty();
    var option = '<option value="day" selected hidden>day</option>';
    for (var i = 1; i <= Days[1]; i++) { //add option days
      option += '<option value="' + i + '">' + i + '</option>';
    }
    $(day).append(option);
    if (val > Days[1]) {
      val = 1;
    }
    $(day).val(val);
  }
}

function change_month(select) {
  var day = $('#day');
  var val = $(day).val();
  $(day).empty();
  var option = '<option value="day" selected hidden>day</option>';
  var month = months.indexOf($('#month').val());
  for (var i = 1; i <= Days[month]; i++) { //add option days
    option += '<option value="' + i + '">' + i + '</option>';
  }
  $(day).append(option);
  if (val > Days[month]) {
    val = 1;
  }
  $(day).val(val);
  
}