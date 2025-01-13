const calendarEvent=require('../models/calendarEvent.model.js')
const postEvent= async(req,res)=>{
    try{
    const body=req.body
    const document = new calendarEvent({
        clubName:body.clubName,
        eventTitle:body.eventTitle,
        venue:body.venue,
        time:body.time,
        date:body.date,
        description:body.description,
    }).save().then((document)=>{
      res.status(200).json("uploaded successfully")
    }).catch((err)=>{
      res.status(500).json("Internal sever error")  
    })
}
catch(err){
    res.status(500).json("Internal server error")
}
}

const getEventDates=async(req,res)=>{
     try{
       const clubName=decodeURIComponent(req.query.clubName)
       const result= await calendarEvent.aggregate([
           {
               $match:{clubName:clubName}
           },
        {
            $addFields: {
                normalizedDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Convert to "YYYY-MM-DD"
            }
        },
        {
            $group: {
                _id: "$normalizedDate" // Group by the normalized date
            }
        },
        {
            $project:{
                normalizedDate:1,
            }
        }

       ])
       res.status(200).json(result)
     }
     catch(err){
       res.status(500).json("Internal server error");
     }
}

const getEventsInfo=async(req,res)=>{
    try{
    const date=req.query.date
    const clubName=decodeURIComponent(req.query.clubName)
    console.log(date+" "+clubName)
    const result= await calendarEvent.aggregate([

        {
            $addFields: {
                normalizedDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Convert to "YYYY-MM-DD"
            },
        },
        {
            $match:{
                clubName:clubName,
                normalizedDate:date,
            }
        },
       
    ])
    
    res.status(200).json(result)
    console.log(result)
    }
    catch(err){
        res.status(500).json("Internal server Error")
    }
}

module.exports={postEvent,getEventDates,getEventsInfo};
