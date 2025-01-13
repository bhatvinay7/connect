const  express=require('express');
const {postEvents,getRecentEvents,getEventBasedOnId,getSearchDocuments,getClubGoal,postClubGoal,postClubMemberData,getclubStatistics,getClubMembersCount} = require('../controler/Techhub.controler.js');
const upload=require('../upload/TechHub/TechHub.multer.js');
const verifyControlerAuth=require('../verifyControlerAuth.js')
const router=express.Router();
router.post("/techhub",verifyControlerAuth,upload.array("Image"),postEvents);
router.get('/techhub',getRecentEvents)
router.get('/techhub/eventBasedOnId',getEventBasedOnId)
router.get('/techhub/searchEvent',getSearchDocuments)
router.post('/techhub/postGoals',verifyControlerAuth,postClubGoal)
router.get('/techhub/getGoals',getClubGoal)
router.post('/techhub/postClubMemberData',postClubMemberData)
router.get('/techhub/getclubStatistics',getclubStatistics)
router.get('/techhub/getClubMembersCount',getClubMembersCount)
module.exports=router;
