//Labels for the days of the week
cal_days_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//Readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
//Days of the month for  each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//current date
cal_current_date = new Date();

function Calendar(month, year){
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  window.month = this.month;
  window.year = this.year;
  this.html = '';

    Calendar.prototype.generateHTML = function(){
        //get first day of the month
        var firstDay = new Date(this.year, this.month, 1);
        var startingDay = firstDay.getDay();
        var diaInicioEspanol = startingDay - 1;
        if(diaInicioEspanol == -1){
            diaInicioEspanol = 6;
        }
        //get length of the month
        var monthLength = cal_days_in_month[this.month];
        //Compensate for leap year
        if(this.month == 1){ //February only!
            if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
                monthLength = 29;
            }
        }

        var monthName = cal_months_labels[this.month];
        var html = '<table class="calendar">';
        html += '<tr><th colspan="7">';
        html += monthName + "&nbsp;" + this.year;
        html += '</th></tr>';
        html += '<tr class="calendar_header">';
        for (var i=0;i <= 6; i++){
            html += '<td class="calendar_header_day">';
            html += cal_days_labels[i];
            html += '</td>';
        }
        html += '</tr><tr>';
        var day = 1;
        //this loop is for is weeks(rows)
        for(var i=0; i<9; i++){
            //this loop is for weekdays(cells)
            for(var j=0; j<=6; j++){
                if( (day == cal_current_date.getDate()) && (this.month == cal_current_date.getMonth()) ){
                    html += '<td class="calendar_today">';
                }
                else{
                    html += '<td class="calendar_day">';
                }        
                if(day <= monthLength && (i > 0 || j >= diaInicioEspanol)){
                    html += day;
                    day++;
                }
                html += '</td>';
            }
            //stop making rows if weve run out of days
            if(day > monthLength){
                break;
            }
            else{
                html += '</tr><tr>';
            }
        }
        html += '</tr></table>';
        this.html = html;
    }
}

Calendar.prototype.getHTML = function(){
    return this.html;
}

function changeMonthDirection(direction){
    if(direction == 0){
        this.month = window.month - 1;
        if(this.month < 0){
            this.month = 11;
            this.year = window.year - 1;
        }
    }
    else if(direction == 1){
        this.month = window.month + 1;
        if(this.month > 11){
            this.month = 0;
            this.year = window.year + 1;
        }        
    }
    var cal = new Calendar(this.month, this.year);
    cal.generateHTML();
    document.getElementById("calendar").innerHTML = cal.getHTML();
}

function test(){
    test_calendar = new Date(2016, 4, 1);
    if(test_calendar.getFullYear() == 2016){
        alert(test_calendar.getDay());
    }
    else{
        alert("error");
    }
}