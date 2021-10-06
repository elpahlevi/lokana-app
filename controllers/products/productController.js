import wrfgenModel from "../../models/products/wrfgen.model.js";

const getProducts = async (req, res) => {
  const { id, isAdmin } = req.user;

  if (isAdmin) {
    // Later replaced with joined data from multiple schema
    const request = await wrfgenModel.find();
    if (!request) return res.status(404).json("Request not found");
    return res.status(200).json(request);
  } else {
    // Later replaced with joined data from multiple schema
    const request = await wrfgenModel.find({ createdBy: id });
    if (request.length > 0) return res.status(200).json(request);
    return res.status(404).json("User requested data not found");
  }
};

export { getProducts };
