const Note = require("../models/notes");
const mongoose = require("mongoose");

/**
 * Get /
 * DashBoard
 */
exports.dashboard = async (req, res, next) => {
  let perpage = 8;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "NodeJs Note App",
  };

  try {
    const notes = await Note.aggregate([
      {
        $sort: { updatedAt: -1, } },
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perpage * page - perpage)
      .limit(perpage)
      .exec();

      const count = await Note.countDocuments();

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perpage),
    });
  } catch (error) {
    console.log(error);
     // Pass error to the next middleware
  }
};

//updated code

/**
 * Add Note
 */
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

/**
 * Add submited Note
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error);
  }
};

/**
 * View Specific Note
 */

exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id }) // Use req.params.id instead of req.param.id
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-notes", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    res.send("Something Went Wrong.");
  }
};


/**
 *
 * Update Specific Note
 */
exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body,  updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * DElete Specific Note
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
/**
 * Search Note
 */
exports.dashboardSearch = async (req,res)=>{
    try {
      res.render('dashboard/search',{
        searchResults:'',
        layout:'../views/layouts/dashboard'
      })
    } catch (error) {
      console.log(error) 
    }
}

/**
 * Search Note Submit
 */ 
exports.dashboardSearchSubmit = async (req,res)=>{
  try {
    let searchTerm = req.body.searchTerm;
    if (!searchTerm) {
      // Handle case where searchTerm is undefined or empty
      res.status(400).send("Search term is missing.");
      return;
    }
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ]
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error)
  }
}