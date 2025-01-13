const Reg = require('../models/Registration.model.js');
// const { ObjectId } = require('mongodb');
const postParticipantsDetails = async (req, res) => {
    try {
      console.log(req.body)
        const body=req.body.participantDetails?.[0]
        if(body?.enailId==""||body?.participantName==""||body?.usnNum==""||body?.mobileNumber==""){
                  res.status(400).json("Group field is optional,please fill all the other fields properly ")
        }
        
        const participentsDetails = new Reg(req.body);
         participentsDetails.save()
            .then((document) => {
                // console.log(document)
              res.status(200).json(document.eventType)
            })
    } catch (err) {
        res.status(500).json({ message: "Try again, some problem occurred" });
    }
};

const getParticipantsDetails = async (req, res) => {
    try {
        const eventType=decodeURIComponent(req.query.select)
        //const participentsDetails = await Reg.find({ eventType:eventType });
        const result=await Reg.aggregate([
            {
                $match:{eventType:eventType},
            },
            {  $project: {
                participantDetails:1,
                _id:0,
            }
          }
        ])
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ message: "Unable to fetch data, try again..!" });
    }
};

module.exports = { postParticipantsDetails, getParticipantsDetails };
