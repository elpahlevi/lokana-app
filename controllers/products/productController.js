import wrfgenModel from "../../models/products/wrfgen.model.js";

const getProducts = async (req, res) => {
  const { id, isAdmin } = req.user;
  const { reqId } = req.query;

  // Get one user's request by reqId
  if (reqId) {
    // Later replaced with joined data from multiple schema
    const request = await wrfgenModel.findById(reqId);
    if (!request) return res.status(404).json("Data not found");
    return res.status(200).json(request);
  }

  // Get all users request
  if (isAdmin) {
    // Later replaced with joined data from multiple schema
    const request = await wrfgenModel.find();
    if (!request) return res.status(404).json("Request not found");
    return res.status(200).json(request);
  }

  // Get all request from one user
  // Later replaced with joined data from multiple schema
  const request = await wrfgenModel.find({ createdBy: id });
  if (request.length > 0) return res.status(200).json(request);
  return res.status(404).json("User requested data not found");
};

export { getProducts };
