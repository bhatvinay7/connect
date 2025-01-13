function jsonToCSV(jsonArray) {
  return new Promise((resolve, reject) => {
    try {
      if (!jsonArray.length > 0) {
        reject(new Error("Input array is empty."));
        return;
      }
      
      const userKeys = Object.keys(jsonArray?.[0]?.participantDetails[0]); 
      const keys=userKeys.filter((each)=>each!="_id")
           const csvRows = [];

      // Add header row
      csvRows.push(['Email','Name','Mobile Number','USN Number'].join(','));

      // Add data rows
      jsonArray?.[0]?.participantDetails.forEach(item => {
        const values = keys.map(key => item[key]);
        csvRows.push(values.join(',')); // Add the data row
      });

      // Combine all rows into a CSV string and resolve the promise
      resolve(csvRows.join('\n'));
    } catch (error) {
      // If an error occurs, reject the promise
      reject(error);
    }
  });
}

export default jsonToCSV;
