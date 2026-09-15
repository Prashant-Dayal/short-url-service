const {nanoid}=require("nanoid");
const URL=require("../model/url");
async function handelgeneratenewShortUrl(req, res) {
  const body=req.body;
  if(!body.url) return res.status(400).json({error:"url is required"});
    const shortID = nanoid(6);  
  await URL.create({
    shortID: shortID,
    redirectUrl: body.url,
    visitsHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortID } );
}
 async function handelgetanalytics(req,res){
  const shortID=req.params.shortID;
  const result=await URL.findOne({shortID:shortID});
  return res.json({ totalClicks: result.visitsHistory.length ,analytics: result.visitsHistory });
}
module.exports={
    handelgeneratenewShortUrl,
    handelgetanalytics
};
