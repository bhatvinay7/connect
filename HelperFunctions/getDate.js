function getDate(param){
    let x=param.toString();
    let date=x.slice(0,10);
    let [year,month,date3]=date.split("-")
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let newmonth = months[parseInt(month-1)];
return `${date3}/${newmonth}/${year}`
}


export {getDate};
