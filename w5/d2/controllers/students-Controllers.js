const Student = require('../Models/student');

const getStudents = async (res, req, next) =>{
    let student;

    try{
        student = await student.find()
    }catch(err){
        return next(err);
    }
}

exports.getStudents = getStudents;