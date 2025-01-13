const countDown=(time)=>{
    const date1 = new Date(time);
const date2 = new Date();

// Calculate the difference in milliseconds

// Calculate the difference in milliseconds
const diffInMs = date1.getTime() - date2.getTime();

// Convert milliseconds to total days
const totalDays = diffInMs / (1000 * 60 * 60 * 24);

// Get the whole number of days
const days = Math.floor(totalDays);

// Remaining milliseconds after removing whole days
const remainingMsAfterDays = diffInMs - days * (1000 * 60 * 60 * 24);

// Convert remaining milliseconds to hours
const hours = Math.floor(remainingMsAfterDays / (1000 * 60 * 60));

// Remaining milliseconds after removing whole hours
const remainingMsAfterHours = remainingMsAfterDays - hours * (1000 * 60 * 60);

// Convert remaining milliseconds to minutes
const minutes = Math.floor(remainingMsAfterHours / (1000 * 60));

// Remaining milliseconds after removing whole minutes
const remainingMsAfterMinutes = remainingMsAfterHours - minutes * (1000 * 60);

// Convert remaining milliseconds to seconds
const seconds = Math.floor(remainingMsAfterMinutes / 1000);

return {days:days,hours:hours,minutes:minutes,seconds:seconds}

}
export default countDown