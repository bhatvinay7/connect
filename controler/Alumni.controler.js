const uploadOnCloudinary = require('../cloudinary.js');
const Alumni=require('../models/Alumni.model.js')
const updateAlumnai=async(req,res)=>{
    try{
     
    }
    catch(err){
        res.status(500).json(err.message)
    }
}

const getalumniInfo=async(req,res)=>{
    try{  const {select,search}=req.query 
          const fieldName=decodeURIComponent(select).toLowerCase()
          const searchString=decodeURIComponent(search)
          const all=await Alumni.find();
          console.log(all)
          console.log(fieldName)
          
            const result=await Alumni.aggregate([
                {
                    $match: {
                      [ fieldName]: {
                        $regex: `.*${searchString}.*`,
                        $options: "i" // Case-insensitive search
                      }
                    }
                  }
                  
            ])
        
       
        res.status(200).json(result)

    }
    catch(err){
        res.status(500).json(err.message)
    }
}


const postalumanaiInfo=async(req,res)=>{
    try{

        const imagePath=req.file;
        const body=JSON.parse(req.body.body)
        if(body.name==""|| body.jobrole=="" ||body.batch=="" || body.link=="" ||body.branch==""){
            res.status(400).json("some filelds are missing")
    return
        }
        const imageUrl= await uploadOnCloudinary(imagePath.path);
        const document=new Alumni({
            name:body.name,
            image:imageUrl,
            jobrole:body.jobrole,
            batch:body.batch,
            branch:body.branch,
            link:body.link,
        })
        document.save().then((document)=>{
            res.status(200).json("Successfully uploaded")
            
        }).catch((err)=>{
            res.status(500).json("try agian,document is not uploaded")
        })

    }
    catch(err){
        res.status(500).json(err.message)
    }
}
module.exports={postalumanaiInfo,getalumniInfo,updateAlumnai}