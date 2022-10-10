const Student = require("../schema/StudentSchema");
const express = require("express");
const Query = require("../schema/Query");
const router = express.Router();

// const isAlive = (req, res, next) => {
//   if (req.session.user) {
//     next();
//     return;
//   }
//   return res.status(401).send("Unauthorized...");
// };

// router.use(isAlive);

router.get("/", async (req, res) => {
  try {
    const users = await Student.find();

    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/:roll", async (req, res) => {
  try {
    const roll = req.params.roll;
    const user = await Student.findOne({ roll });

    if (!user) {
      return res.status(200).json({ msg: "Student doesn't exist..." });
    }

    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).send("Something went wrong!");
  }
});

router.post("/", async (req, res) => {
  const { name, roll, programme, courses } = req.body;

  if (!name || !roll || !programme) {
    return res.status(400).send("Something is missing");
  }

  const existRoll = await Student.findOne({ roll });
  if (existRoll) {
    return res.status(200).json({ msg: "Student already exists..." });
  }

  const newStd = new Student({ name, roll, programme, courses });
  const savedStd = await newStd.save();

  if (savedStd) {
    return res.status(200).json({ data: newStd });
  } else {
    return res.status(500).json({ msg: "Couldn't save student details" });
  }
});

router.put("/", async (req, res) => {
  const { name, roll, programme, courses } = req.body;

  if (!name || !roll || !programme) {
    return res.status(400).send("Something is missing");
  }

  const existStd = await Student.findOne({ roll });
  if (!existStd) {
    return res.status(500).json({ msg: "Student doesn't exist..." });
  }

  const std = await Student.findByIdAndUpdate(
    existStd.id,
    { name, roll, programme, courses },
    { new: true }
  );

  if (std) {
    return res.status(200).json({ data: std });
  } else {
    return res.status(500).json({ msg: "Couldn't update student details" });
  }
});

router.get("/:roll/queries", async (req, res) => {
  try {
    const roll = req.params.roll;
    console.log(roll);
    const result = await Query.find({ roll });
    return res.status(200).json({ result: result });
  } catch (err) {
    return res.status(500).json({ msg: "Server not working" });
  }
});

router.post("/:roll/addQuery", async (req, res) => {
  try {
    const roll = req.params.roll;
    const {
      exam_name,
      course_name,
      question_num,
      ta_roll,
      std_roll,
      ta_comment,
      std_comment,
      IsActive,
    } = req.body;

    const quer = new Query({
      roll,
      exam_name,
      course_name,
      question_num,
      ta_roll,
      std_roll,
      ta_comment,
      std_comment,
      IsActive,
    });

    const q = await quer.save();

    if (q) return res.status(200).json({ msg: "query is successfully saved" });
  } catch (err) {
    return res.status(500).json({ msg: "Server not working" });
  }
});

router.delete("/:roll", async (req, res) => {
  try {
    const roll = req.params.roll;
    const result = await Student.findOneAndDelete({ roll });

    if (result) {
      res.status(200).json({ msg: "Delete Successfull" });
    } else {
      res.status(500).json({ msg: "Couldn't delete student" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong..." });
  }
});

module.exports = router;
