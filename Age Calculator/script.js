let btn = document.querySelector('button')
let para = document.getElementsByTagName('p')[0]
let noOfDaysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

// function calculateAge(dob){
//      let todayDate = new Date();
//    let dateDifference = todayDate.getDate() - dob.getDate();
//    let monthDifference = (todayDate.getMonth()) - dob.getMonth();
//    let yearDifference = todayDate.getFullYear() - dob.getFullYear();
  
// //    month computataion
//    if(monthDifference == 1 && dob.getDate() <= todayDate.getDate()){
//           yearDifference = yearDifference - 1;
//    }
//    else if(monthDifference < 0) {
//     yearDifference = yearDifference - 1;
//     monthDifference = dob.getMonth()+2 + (-monthDifference);
//    }
// //    date computation
// if(dob.getDate() > todayDate.getDate()){
//     console.log(`dob ${dob.getMonth()}`)
//     monthDifference --; 
//    let dateDifferenceMili = todayDate - dob;
//     let days  =  Math.round(dateDifferenceMili / (1000 * 60 * 60 * 24));
//     dateDifference = days ;
//     console.log(dateDifferenceMili);
//     // console.log(monthDifference)
// }

//     para.innerText = `You are ${yearDifference} years  ${monthDifference} months ${dateDifference} days old`
//     para.style.cssText = "background-color:black; color:white; padding:1em; font-weight:bold; font-size:large;"
 
// }


function calculateAge(yourDob) {
    let todayDate = new Date();
    let dateDifferenceMili = todayDate - yourDob;  
    let noOfDaysSinceDOB = Math.floor(dateDifferenceMili / (1000 * 60 * 60 * 24));

    let totalYears = Math.floor(noOfDaysSinceDOB / 365.25);

    let remainingDaysAfterYears = noOfDaysSinceDOB - (totalYears * 365.25);
    let totalMonths = Math.floor(remainingDaysAfterYears / 30.44);
    
    let remainingDaysAfterMonths = Math.floor(remainingDaysAfterYears - (totalMonths * 30.44));

    console.log(noOfDaysSinceDOB);
    para.innerText = `You are ${totalYears} years ${totalMonths} months ${remainingDaysAfterMonths} days old`;
    para.style.cssText = "background-color:black; color:white; padding:1em; font-weight:bold; font-size:large;";
}


function getDOB(){
    let dateInput = document.getElementById('date');
    let date = dateInput.value;
    date = parseInt(date);
    let monthInput = document.getElementById('month');
    let month = monthInput.value;
    month = parseInt(month);
    let yearInput = document.getElementById('year');
    let year = yearInput.value;
    year = parseInt(year);
    if(date && month && year){ /* to make sure fields are not empty*/
        checkvalidDOB(date,month,year);
    }
    else{
        para.innerText = "Date/month/year cannot be empty"
        para.style.cssText = "background-color:black; color:white; padding:1em; font-weight:bold; font-size:large;"

    }
    
}

function checkvalidDOB(date,month,year){
    
     if(month == 2){ /* if month is feb */
    //    check if a year is leap year
     if(year % 4 == 0 && year % 100 !=0 && date == 29){
        let leapday = 29;
        let yourDob = new Date(`${year}-${month}-${leapday}`)
        calculateAge(yourDob)
     }
     else if(year % 4 == 0 && year % 400 == 0 && date == 29){
        let leapday = 29;
        let yourDob = new Date(`${year}-${month}-${leapday}`)
        calculateAge(yourDob)
     }
     else if(date <= 28){   /* if a year is not leap but within 28 days of feb range*/
        let yourDob = new Date(`${year}-${month}-${leapday}`)
        calculateAge(yourDob)
     }
     else{
        para.innerText = `Inavlid DOB, number of days in february exceeded`
        para.style.cssText = "background-color:black; color:white; padding:1em; font-weight:bold; font-size:large;"
     }
     }

     else if((date > 0 && date <=31 ) && month <=12){  /* to make sure entered date and month is correct and in range */
        let yourDob = new Date(`${year}-${month}-${date}`)
            calculateAge(yourDob);
     }

     else{
         para.innerText = `Invalid date of birth`
    para.style.cssText = "background-color:black; color:white; padding:1em; font-weight:bold; font-size:large;"
     }
}

btn.addEventListener('click',getDOB)


