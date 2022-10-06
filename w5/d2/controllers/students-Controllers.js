const student = require('../Models/student');
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hluunuq.mongodb.net/PracticeMongo?retryWrites=true&w=majority`;

const getStudentsWithoutGithub = async (req, res, next) =>{
    let students;
    try{
        students = await student.find({'github': null})
    }catch(err){
        return next(err);
    }

    res.json({student: students.map(student => (student.name))})
}

const getStudentsViaClass = async (req, res, next) =>{
    let students;
    try{
        students = await student.find({'class_id': 1})
    }catch(err){
        return next(err);
    }

    res.json({student: students})
}
const getTotalNumberOfStudents = async (req, res, next) =>{

    let students;
    let studentsViaClass
    try{
        students = await student.find()
        studentsViaClass = students.filter(student => student.class_id === 1 || student.class_id === 2 || student.class_id === 3)
    }catch(err){
        return next(err);
    }

    const totalNumberOfStudent = studentsViaClass.length

    res.json({total: totalNumberOfStudent})
}

const getStudentsWithoutEmailOrPhone = async (req, res, next) =>{
    const client = new MongoClient(url)
    let students;
    try{
        await client.connect();
        const db = client.db();
        students = await db.collection('students').find({$or:[{'email': null}, {'phone': null}]}).toArray()
    }catch(err){
        return next(err);
    }

    await client.close();

    res.json({student: students.map(student => student.name)})
}
const getStudentsWithoutGmailOrPhone = async (req, res, next) =>{
    const client = new MongoClient(url)
    let students;
    try{
        await client.connect();
        const db = client.db();
        students = await db.collection('students').find(
            {
                email: {
                  $not: {
                    $regex: /gmail.com/,
                  },
                },
                phone: null,
              }
        ).toArray()
    }catch(err){
        return next(err);
    }

    await client.close();

    res.json({student: students.map(student => student.name)})
}




exports.getStudentsWithoutGithub = getStudentsWithoutGithub;
exports.getStudentsViaClass = getStudentsViaClass;
exports.getTotalNumberOfStudents = getTotalNumberOfStudents;
exports.getStudentsWithoutEmailOrPhone = getStudentsWithoutEmailOrPhone;
exports.getStudentsWithoutGmailOrPhone = getStudentsWithoutGmailOrPhone;