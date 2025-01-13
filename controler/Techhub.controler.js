const techHub = require('../models/TechHub.model.js');
const clubGoal=require('../models/clubGoals.model.js')
const ClubRegistration =require('../models/ClubRegistration.model.js')
const uploadOnCloudinary = require('../cloudinary.js');
const { ObjectId } = require('mongodb'); // Import ObjectId

const postEvents = async (req, res) => {
    try {
        let arr = req.files; 
        let date=''
        console.log("hiii")
        const body=JSON.parse(req.body.body)    
        if (body.eventName=="" || body.date=="" || body.venue==""||body.clubName=="" ||body.category==""){
            res.status(400).json("Required fields are missing.");
            return
        }
        if (!arr || arr?.length === 0) {
            res.status(400).json("No files uploaded." );
            return

        }
        // Use Promise.all to wait for all uploads to complete
        const [year,month,day] =body?.date?.split('-')
               date= `${year}-${month}-${day}`;
        const pathArray = await Promise.all(
            arr.map(async (file) => {
                const result = await uploadOnCloudinary(file.path);
                return result;
            })
        );
        
        let [firstImg,...remainImg]=pathArray;
        
        const newDocument = new techHub({
            clubName:body.clubName,
            eventName:body.eventName,
            mainImg:firstImg,
            img:remainImg,
            headLine1:body.headLine1, 
            headLine2:body.headLine2, 
            date:body.date,
            venue:body.venue,
            category:body.category,
            
        });
        newDocument.save()
        .then((document) => {
            res.status(200).json("sucessfully uploaded");
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        }
    );
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getRecentEvents= async(req,res)=>{
    try{
        const clubName=decodeURIComponent(req.query.clubName)
    const result= await techHub.aggregate([
        {
            $match:{clubName:clubName}
        }
        ,
        {
            $sort: {
                date: -1 
            }
        },
        {
            $limit: 2
        }
    ])
    res.status(200).json(result)
}
catch(err){
    res.status(500).json(err.message)
}
}

const getEventBasedOnId=async(req,res)=>{
    try{
        // Decode and convert the id to ObjectId
        const eventId =decodeURIComponent(req.query?.eventId);
        
        const objectId = new ObjectId(eventId);
        const result=await techHub.aggregate([
            {
                $match:{
                    _id:objectId
                }

            },
            {
                $project:{
                    eventName:1,
                    img:1,
                    headLine1:1,
                    headLine2:1,
                    date:1,
                    venue:1
                }
            }
        ])
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json("Internal server Error")
    }
}
const getSearchDocuments=async(req,res)=>{
    try{
  const searchString=decodeURIComponent(req.query.search);
  const result =await techHub.aggregate([
    {
      $match: {
        eventName: {
          $regex: `.*${searchString}.*`, // Matches eventName containing searchString
          $options: "i" // Case-insensitive search
        }
      }
    },
    {
      $limit: 4 // Limits the result to 4 documents
    },
    {
        $project:{
            eventName:1,
            mainImg:1,

        }
    }
  ]);
  res.status(200).json(result) 
}
catch(err){
    res.status(500).json(err.message)
}
}

const getClubGoal=async(req,res)=>{
    try{
    const clubName=decodeURIComponent(req.query.clubName)
    const result=await clubGoal.find({clubName:clubName})
    res.status(200).json(result)
    }
    catch(err){
        res.status(500).json(err.message)
    }
}

const postClubGoal=async(req,res)=>{
    try{

        const body=req.body
        const clubgoals=body.clubGoals[0]
    if(body.clubName==""|| clubgoals.information=="" ||clubgoals.goalHeading==""
        ||body.clubHeading==""){
        res.status(400).json("some fields are missing")
        return
    }
    
    const result=new clubGoal(body).save().then((result)=>{
        res.status(200).json("Successfully uploaded")
    }).catch((err)=>{
        res.status(500).json(err.message)
    })
}
    catch(err){
        res.status(500).json(err.message)
    }
}

const postClubMemberData=async(req,res)=>{
    try{

    
    const body=req.body;
    const clubName=decodeURIComponent(req.body.clubName)
    if(body.USNumber==""||body.Name==""||body.MobileNumber==""||body.passingYear==""){
        res.status(400).json("Some fields are not filled")
        return
    }
    const result=new ClubRegistration({
        Name:body.Name,
        USNumber:body.USNumber,
        clubName:clubName,
        passingYear:body.passingYear
    }).save().then(()=>{
        res.status(200).json("You registration is recorded")
    }).catch((err)=>{
        res.status(500).json("Network Error")
    })
    
}
catch(err){
    res.status(500).json(err.message)
}
}

const getClubMembersCount=async(req,res)=>{
    try{

        const clubName=decodeURIComponent(req.query.clubName)
        const result= await ClubRegistration.aggregate([
           {
               $match:{clubName,clubName}
           },
           {
               $group:{
                   _id:'$clubName',
                    count:{$sum:1},
               }
           }
        ]) 
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json(err.message)
    }
}

const getclubStatistics=async (req,res)=>{
    try{

        const result= await techHub.aggregate([
           {
               $group: {
                 _id: "$category",
                 count: { $sum: 1 },
               },
             },
        ])
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json(err.message)
    }
}
module.exports ={ postEvents,getRecentEvents,getEventBasedOnId,getSearchDocuments,getClubGoal,postClubGoal,postClubMemberData,getclubStatistics,getClubMembersCount}
