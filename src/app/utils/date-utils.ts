/**
 * Return the elapsed time as a string es : 2 days, 12 hours, 33 minutes, 9 seconds.
 * @param dateFrom 
 * @returns elpased time as a string 
 */
export function getLastChangeElapsedTime(dateFrom: Date): string {

    if (dateFrom == null) return "";

    const today = new Date();
    const currentTime = today.getTime();
    const dateFromTime = dateFrom.getTime();
    const timeDiffMilliseconds = currentTime - dateFromTime;
    const timeDiffSeconds = timeDiffMilliseconds / 1000;
    // Extract integer seconds that do not form a minute using %
    const seconds = Math.floor(timeDiffSeconds % 60);
    // Convert time difference from minutes to hours
    const timeDiffMinutes = Math.floor(timeDiffSeconds / 60);
    // Extract integer minutes that don't form an hour using %
    const minutes = timeDiffMinutes % 60;
    // Convert time difference from minutes to hours
    const timeDiffHours = Math.floor(timeDiffMinutes / 60);
    // Extract integer hours that don't form a day using %
    const hours = timeDiffHours % 24;
    // Convert time difference from hours to days
    const timeDiffDays = Math.floor(timeDiffHours / 24);
    // The rest of timeDiff is number of days
    const days = timeDiffDays;

    if ( days > 0 ) {
      return days + ' days';
    } else if (hours > 0) {
      return hours + ' hours';
    } else if (minutes > 0) {
      return minutes + ' minutes';
    } else if (seconds >= 0) {
      return seconds + ' seconds';
    } else {
      return ' 0 seconds';
    }
    
  }

  export function formatDateYYYYMMdd(date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }