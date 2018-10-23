const express = require('express');
const router = express.Router();
const ctrlmain = require('../controllers/main');
const methodOverride = require('method-override');

router.use(methodOverride('_method'))

router.get('/',function(req,res,next){
    res.render('index');
    // next();
});
router.get('/faculty',function(req,res,next){
    res.render('Faculty_login');
    // next();
});
router.get('/stu_timetable',function(req,res,next){
    res.render('timetable');
    // next();
});
router.post('/teacher_page',ctrlmain.teacher);
    // res.render('teacher');
    // next();
// });
router.post('/HOD',ctrlmain.hod);
    // res.render('HOD');
    // next();
// });
router.get('/make-timetable',ctrlmain.timeTable);

router.get('/request',function(req,res,next){
    res.render('Request');
});


router.get('/notice-upload',(req,res,next)=>{
    res.render('notice_upload');
})

router.post('/notice-data',(req,res,next)=>{
   res.send('ok');
})
router.post('/showtimetable', ctrlmain.sendtimetable);

router.get('/moderator',(req,res)=>{
     res.render('moderator');
})

router.get('/list-of-faculties',ctrlmain.showAllFaculties);

router.post('/list-of-faculties',ctrlmain.facultiesList)

router.get('/list-of-faculties/edit/:id',ctrlmain.editFaculties);

router.put('/list-of-faculties/:id',ctrlmain.updateFaculties)

router.delete('/list-of-faculties/:id',ctrlmain.removeFaculties);

router.get('/upload-list',ctrlmain.uploadFiles)

router.post('/upload/list',ctrlmain.showFilesData)

router.post('/venues-list',ctrlmain.venueList)

router.get('/venues-list',ctrlmain.showAllVenues)

module.exports = router;
