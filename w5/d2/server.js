const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://adlascio:mongo@cluster0.ydeuggz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/students", (req, res) => {
  const collection = client.db("students-classes").collection("students");
  collection.find({}).toArray((err, students) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(students);
      client.close();
    }
  });
  // perform actions on the collection object
});

server.get("/students_without_github", (req, res) => {
  const collection = client.db("students-classes").collection("students");
  collection
    .find({ github: null })
    .project({ _id: 0, id: 1, name: 1, email: 1, class_id: 1 })
    .sort({ class_id: -1 })
    .toArray((err, students) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(students);
        client.close();
      }
    });
  // perform actions on the collection object
});

server.get("/students_per_class", (req, res) => {
  const collection = client.db("students-classes").collection("students");
  collection
    .find({ class_id: 1 })
    .project({ id: 1, name: 1 })
    .sort({ name: 1 })
    .toArray((err, students) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(students);
        client.close();
      }
    });
  // perform actions on the collection object
});

server.get("/students_first_3_classes", async (req, res) => {
  const collection = client.db("students-classes").collection("students");
  const result = await collection
    .find({ class_id: { $in: [1, 2, 3] } })
    .count();
  res.status(200).json(result);

  // perform actions on the collection object
});

server.get("/students_without_email_or_phone", (req, res) => {
  const collection = client.db("students-classes").collection("students");
  collection
    .find({ $or: [{ email: null }, { phone: null }] })
    .toArray((err, students) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(students);
        client.close();
      }
    });
  // perform actions on the collection object
});

server.get("/students_without_gmail_and_phone", (req, res) => {
  const collection = client.db("students-classes").collection("students");
  collection
    .find({
      email: {
        $not: {
          $regex: /gmail.com/,
        },
      },
      phone: null,
    })
    .toArray((err, students) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(students);
        client.close();
      }
    });
  // perform actions on the collection object
});

server.get("/students-enrolled", (req, res) => {
  const collection = client.db("students-classes").collection("students");
  // perform actions on the collection object
  collection
    .aggregate([
      {
        $match: {
          end_date: null,
        },
      },
      {
        $project: {
          id: 1,
          name: 1,
          class_id: 1,
        },
      },
      {
        $sort: {
          class_id: 1,
        },
      },
    ])
    .toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(docs);
      }
    });

  client.close();
});

server.get("/students-graduated-without-github", (req, res) => {
  const collection = client.db("students-classes").collection("students");
  // perform actions on the collection object
  collection
    .aggregate([
      {
        $match: {
          end_date: {
            $ne: null,
          },
          github: null,
        },
      },
      {
        $project: {
          email: 1,
          name: 1,
          phone: 1,
        },
      },
    ])
    .toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(docs);
      }
    });

  client.close();
});

server.post("/students", (req, res) => {});

server.listen(8080, () => console.log("server running 8080"));
