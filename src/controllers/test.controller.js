async function get(req, res, next) {
  try {
      res.json({"success":true,"Mesage":"Get request works"});
  } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
  }
}

module.exports = {
  get,
};
