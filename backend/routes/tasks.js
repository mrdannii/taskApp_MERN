const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator"); //for validation of data body
const Tasks = require("../models/Tasks");

const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: GET ALL TASKS GET(/api/auth/fetchalltasks) -login required
router.get("/fetchalltasks", fetchuser, async (req, res) => {
  try {
    const tasks = await Tasks.find({ user: req.user.id });
    res.json({ tasks });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Opps Something Went Wrong");
  }
});

// ROUTE 2: Store ALL TASKS Post(/api/auth/addtask) -login required
router.post(
  "/addtask",
  fetchuser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Enter a Valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;

      const task = new Tasks({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedTask = await task.save();
      res.json({ savedTask });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Opps Something Went Wrong");
    }
  }
);

// ROUTE 3: Update TASKS PUT(/api/auth/updatetask) -login required
router.put(
  "/updatetask/:id",
  fetchuser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Enter a Valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      //
      const editedtask = {};
      if (title) {
        editedtask.title = title;
      }
      if (description) {
        editedtask.description = description;
      }
      if (tag) {
        editedtask.tag = tag;
      }
      //find the note for updataing
      let task = await Tasks.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: "Not Found" });
      }

      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      task = await Tasks.findByIdAndUpdate(
        req.params.id,
        { $set: editedtask },
        { new: true }
      );
      res.json({ task });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Opps Something Went Wrong");
    }
  }
);

// ROUTE 4: Delete TASKS Delete(/api/auth/deletetask) -login required
router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  try {
    //find the note for delete
    let task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Not Found" });
    }
    //allow for deletion
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    task = await Tasks.findByIdAndDelete(req.params.id);
    res.json({ success: "Task Deleted", task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Opps Something Went Wrong");
  }
});

module.exports = router;
