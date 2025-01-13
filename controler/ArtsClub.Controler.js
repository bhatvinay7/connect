// const ArtsClub = require('../models/ArtsClub.js');
// const uploadOnCloudinary = require('../cloudinary.js');
// const postEvents = async (req, res) => {
//     try {
//         let body=req.body;
//         let arr = req.files;
//     // Use Promise.all to wait for all uploads to complete
//     const pathArray = await Promise.all(
//       arr.map(async (file) => {
//         const result = await uploadOnCloudinary(file.path);
//         return result;
//       })
//     );
//     let [firstImg,...remainImg]=pathArray;
    
//         const newDocument = new ArtsClub({
//            eventName:body.eventName,
//            mainImg:firstImg,
//            img:remainImg,
//            headLine1:body.headLine1, 
//            headLine2:body.headLine2, 
//            date:body.date,

//         });
//         newDocument.save()
//             .then((document) => {
//                 res.status(200).json("sucessfully uploaded");
//             })
//             .catch((err) => {
//                 res.status(500).json({ message: err.message });
//             });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


// module.exports = postEvents;
