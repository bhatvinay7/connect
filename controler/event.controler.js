const { readFileSync, promises } = require('fs');
const { join } = require('path');
const dotenv=require('dotenv')
const { ObjectId } = require('mongodb'); // Import ObjectId
dotenv.config();
const Events = require('../models/event.model.js');
const uploadOnCloudinary = require('../cloudinary.js');
 
function calculateLimit(innerWidth){
    if(innerWidth<640){
        return 2
    }
    else if(innerWidth>=640 && innerWidth<=768){
        return 3
    }
    else if(innerWidth>768 && innerWidth<=1024){
        return 4
    }
    else if(innerWidth>1024 && innerWidth<=1280){
        return 3
    }
    else {
        return 4
    }
}

const getSearchResults= async (req,res)=>{
    try{
    const searchValue=decodeURIComponent(req.query.search)
    const result = await Events.aggregate([
        {
          $match: {
            eventName: {
              $regex: `.*${searchValue}.*`, // Dynamic regex pattern
              $options: "i" // Case-insensitive matching
            }
          }
        },
        { $limit: 3 },
        {
            $project:{
                eventName:1
            }
        } // Limit results to 5 documents
      ]);
      
    res.status(200).json(result);
  }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

const getEvents = async (req, res) => {
    try {
       // console.log(req.query)
        const d=new Date().toLocaleDateString("en-CA").slice(0,10)
        let limit=calculateLimit(req.query.innerWidth)
        if(req.query.state =="live"){
            matchCondition={$gte:d}
        }
        else{
            matchCondition={$lt:d} 
        }
        const totalDocumentCount= await  Events.aggregate([
            {
                $addFields: {
                    normalizedDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Convert to "YYYY-MM-DD"
                },
            },
            // Step 2: Match normalizedDate with condition
            {
                $match: {
                    normalizedDate: matchCondition,
                },
            },
            { $count:"totalCount"

            }
            ,
            {
                $project:{
                    totalCount:{$ceil:{$divide:["$totalCount",limit]}}
                }
            },
        ])

        if(req.query.state=="live"){
        const EventList = await Events.find({ date: { $gte: d } }).limit(limit).skip((req.query.page-1)*limit);
        const updatedEventList=[EventList,totalDocumentCount?.[0]?.totalCount]
        res.status(200).json(updatedEventList);
        }
        else{
            const EventList = await Events.find({ date: { $lt: d } }).limit(limit).skip((req.query.page-1)*limit);
            const updatedEventList=[EventList,totalDocumentCount[0].totalCount]
            res.status(200).json(updatedEventList);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMetaEventDetail = async (req, res) => {  
    try {
    
    // Decode and convert the id to ObjectId
    const getId = decodeURIComponent(req.query?.id);
    const objectId = new ObjectId(getId);
    // Aggregation pipeline
    const result = await Events.aggregate([
        {
            $match: { _id: objectId } // Match by _id
        },
        {
            $project: {
                _id: 1,
                eventName: 1,
                img:1,
                eventType: 1,
                date: 1
            }
        }
    ]);
    res.json(result);
}
 catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).send("Internal Server Error");
}
    }




const getEvent = async (req, res) => {
    try {
        const getEventinfo = await Events.findById(req.params.id);
        res.status(200).json(getEventinfo);
    } catch (err) {
        res.status(500).json({ message: 'Not found' });
    }
};

const postEvent = async (req, res) => {
    try {
         const imagePath=req.file;
         const body=JSON.parse(req.body.body)
         if(!imagePath ||body.eventName==''||body.data==""||body.organiser==""||body.place=="" ||body.headLine1=="" ||body.headLine2==""){
            res.status(400).json("some fileds are not filled")
            return
         }
        const [year,month,day] =body?.date?.split('-')
               date= `${year}-${month}-${day}`;
        const imageUrl= await uploadOnCloudinary(imagePath.path);
        const event = new Events({
            eventName:body.eventName,
            img:imageUrl,
            headLine1:body.headLine1,
            headLine2:body.headLine2,
            coordinators:body.coordinators,
            eventType:body.eventType,
            organiser:body.organiser,
            place:body.place,
            date: new Date(date),
        });
        event.save()
            .then((event) => {
                res.status(200).json("Successfully uploaded");
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
};
const getType=async (req,res)=>{
    
    try{
    const typeFilter=decodeURIComponent(req.query.type)

    const d=new Date().toLocaleDateString("en-CA").slice(0,10);
    let limit=calculateLimit(req.query.innerWidth)
    if(req.query.state=="live"){
// const  sphecificEvents= await Events.find({$and:[{ date:{$gte:d }},{eventType: typeFilter}]});
const sphecificEvents = await Events.find({ $and:[{ date: { $gte: d } },  { eventType: typeFilter }]}).limit(limit).skip((req.query.page-1)*limit);
res.status(200).json(sphecificEvents);
    }
    else{
        const  sphecificEvents= await Events.find({ $and: [{ date: { $lt: d } },  { eventType: typeFilter }]}).limit(limit).skip((req.query.page-1)*limit);
res.status(200).json(sphecificEvents);
    }
}
catch(err){
    res.status(500).json({message:err.message});
}

}

const getNextEvents= async(req,res)=>{
    try{
        console.log("hiiiiii")
        
    //    const result= await Events.aggregate([
    //     {$match:{upCommingEvent:true}},
    //     {$project:{
    //         _id:1,
    //         eventName:1,
    //         img:1,
    //         headLine1:1,
    //         date:1
    //     }}
    //    ])

       res.status(200).json("successfully")
    }
    catch(err){
        console.log(err.message)
        res.status(500).json("network error")
    }
}    










const getFilterEventInformation = async (req, res) => {
    const typeOfEvent = req.query.state;
    const currentDate = new Date().toLocaleDateString("en-CA").slice(0, 10); // Current date in YYYY-MM-DD format
    const limit =calculateLimit(req.query.innerWidth)
    try {
        let matchCondition = {};
        // Determine match condition based on the type of event
        if (typeOfEvent === "live") {
            matchCondition = { $gte: currentDate }; // Events with date >= currentDate
        } else if (typeOfEvent === "past") {
            matchCondition = { $lt: currentDate }; // Events with date < currentDate
        }

        const result = await Events.aggregate([
            // Step 1: Add normalizedDate field
            {
                $addFields: {
                    normalizedDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Convert to "YYYY-MM-DD"
                },
            },
            // Step 2: Match normalizedDate with condition
            {
                $match: {
                    normalizedDate: matchCondition,
                },
            },
            // Step 3: Group by eventType and count the events
            {
                $group: {
                    _id: "$eventType", // Group by eventType
                    count: { $sum: 1 }, // Count the number of events in each group
                },
            },
            // Step 4: Add totalPages field
            {
                $addFields: {
                    totalPages: { $ceil: { $divide: ["$count", limit] } }, // Calculate total pages
                },
            },
        ]);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json('Current event not found');
        }
        res.status(200).json('Event deleted successfully');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEvent=async(req,res)=>{
    try{
        const roles=process.env.USER_ROLES
        const getId = decodeURIComponent(req.query?.id);
        const objectId = new ObjectId(getId);
        let date=''
        let imgUrl=''
        const body=JSON.parse(req.body.body)
            if(body?.date!=''){
            const [year,month,day] =body?.date?.split('-')
               date= `${year}-${month}-${day}`;
            }
            if(req?.file?.path){
            // imgUrl= await uploadOnCloudinary(req.file.path);
            }
               
            
       
            const data={...body,date:date,img:imgUrl}
            const newDocument = Object.entries(data).filter(([_, value]) => value !== '').reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
              }, {});   
              const document = await Events.findById(objectId);
              const updatedDocument=await  Events.findByIdAndUpdate(document._id,newDocument)
               res.status(200).json("Successfully Uploaded")
              
    }
        catch(err){
            res.status(500).json(err.message)
        }     
}

const testApi=async(req,res)=>{
    try{
    const cleanedObject = Object.entries(req.body?.body).filter(({_, value}) => value !== '').reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});   
    res.status(200).json("successful")
    }
    catch(err){
        console.log(err.message)
    }
}
const updateEventStatus=async (req,res)=>{
    try{
    const object=new ObjectId(decodeURIComponent(req.query.id))
    const set=decodeURIComponent(req.query.set)
    const status=await Events.findByIdAndUpdate(object,{upCommingEvent:set})
    res.status(200).json(status.upCommingEvent);
    }
    catch(err){
        res.status(500).json("Internal Server Error")
    }
}




module.exports = { getEvents, getEvent, postEvent, deleteEvent,getType,getFilterEventInformation,getSearchResults,getMetaEventDetail,getNextEvents,updateEvent,updateEventStatus  };
