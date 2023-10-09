var message = "This is the best moment to have a look at this website !"
const dateTimeNow = new Date();
const date = dateTimeNow.toDateString();
const time = dateTimeNow.toTimeString();
console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15
alert(`${date}, ${time} - ${message}`);