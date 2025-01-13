const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EventRouter = require('./routes/event.route.js');
// const AptRouter = require('./routes/apt.route.js');
// const CoderesourceRouter = require('./routes/coderesource.route.js');
// const techHub=require('./routes/TechHub.route.js');
const SignInRouter = require('./routes/signIn.route.js');
const RegistrationRouter = require('./routes/registration.route.js');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const verifyJWT=require('./verifyJWT.js');
const refreshTokenRouter=require('../DB/refreshControler.js');
const logoutRouter=require('../DB/logout.js');
const homePageAndClubIntroRouter=require('./routes/HomePageAndClubIntro.route.js');
const homePageEventSectionRouter=require('./routes/HomePageEventSection.route.js')
const clubInfoRouter =require('./routes/ClubInfoSection.route.js')
const workShopSectionRouter=require('./routes/WorkShopSection.route.js');
const AchievementAntAwardRouter=require('./routes/AchievementAndAwardSection.route.js')
const ReviewSwction=require('./routes/ReviewSection.route.js')
const calendarEvent=require('./routes/calendarEvent.route.js')
const techHubRouter=require('./routes/TechHub.route.js');
const eventFeedBackRouter = require('./routes/eventFeedBack.route.js');
const alumniRouter=require('./routes/Alumnai.route.js')

dotenv.config();
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,               // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT','DELETE','PATCH', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type','Authorization'],     // Allowed headers
  optionsSuccessStatus: 204,        // For legacy browser support
  maxAge: 600                       // Cache preflight response for 10 minutes
};
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api',SignInRouter);
app.use('/api/refresh',refreshTokenRouter);
app.use('/api',logoutRouter);
app.use('/api/AchievementSection',AchievementAntAwardRouter)
app.use('/api/ReviewSection',ReviewSwction)
app.use('/api/calendarEvent',calendarEvent)
app.use('/api',homePageAndClubIntroRouter);
//app.use('/api',homePageEventSectionRouter);
app.use('/api',eventFeedBackRouter);
app.use('/api',homePageAndClubIntroRouter);
app.use('/api',homePageEventSectionRouter);
//app.use('/api',clubInfoRouter);
app.use('/api',workShopSectionRouter);
app.use('/api',clubInfoRouter);
app.use(verifyJWT);
app.use('/api/event',EventRouter);
app.use('/api',techHubRouter);
app.use('/api',RegistrationRouter);
app.use('/api/alumni',alumniRouter)
// app.use('/api/coderesource', CoderesourceRouter);
// app.use('/api/aptitude', AptRouter);
const VITE_REACT_KEY_VALUE = process.env.VITE_REACT_KEY_VALUE
const VITE_REACT_DB_NAME =process.env.VITE_REACT_DB_NAME
mongoose.connect(`mongodb+srv://${VITE_REACT_KEY_VALUE}@cluster0.kpagkqo.mongodb.net/${VITE_REACT_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    app.listen(3004, () => {
      console.log('Connected successfully.');
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
