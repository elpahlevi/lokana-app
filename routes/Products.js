const router = require("express").Router();

const { verifyToken } = require("../middlewares/Token");
const {
  createRequest,
  getRequest,
  updateRequest,
  deleteRequest,
} = require("../controllers/products/WrfGenController");

router.post("/wrfgen", [verifyToken], createRequest);
// To get specific data, use "id" or "reqId" as query string parameter
router.get("/wrfgen", [verifyToken], getRequest);
router.put("/wrfgen", [verifyToken], updateRequest);
router.delete("/wrfgen", [verifyToken], deleteRequest);

module.exports = router;
