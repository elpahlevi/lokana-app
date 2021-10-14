import wrfgenModel from "../../models/products/wrfgen.model.js";

const createRequest = async (req, res) => {
  const request = new wrfgenModel(req.body);
  try {
    await request.save();
    return res.status(201).json("Request created (WRFGen)");
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getRequest = async (req, res) => {
  const { isAdmin } = req.user;
  const { reqId } = req.query;
  // Filter by request ID (user & admin)
  if (reqId) {
    const request = await wrfgenModel.findById(reqId);
    if (!request) return res.status(404).json("Request does not match");
    return res.status(200).json(request);
  }

  // Get all WRFGen requests (admin)
  if (isAdmin) {
    const request = await wrfgenModel.find();
    if (!request) return res.status(404).json("Requests not found (WRFGen)");
    return res.status(200).json(request);
  } else {
    return res.status(403).json("You are not authorized 😋");
  }
};

const editRequest = async (req, res) => {
  const { reqId: _id } = req.query;
  const { isAdmin } = req.user;

  if (isAdmin && _id) {
    const request = await wrfgenModel.findByIdAndUpdate(_id, {
      status: req.body.status,
      finishedDate: req.body.finishedDate,
      link: req.body.link,
      fileSize: req.body.fileSize,
    });
    if (request) {
      await request.save();
      return res.status(200).json("Request updated");
    }
    return res.status(404).json("Request not found");
  }
  return res.status(404).json("Invalid endpoint");
};

const deleteRequest = async (req, res) => {
  const { reqId: _id } = req.query;
  const { isAdmin } = req.user;

  if (_id && isAdmin) {
    const request = await wrfgenModel.findByIdAndDelete(_id);
    if (request) {
      await request.remove();
      return res.status(200).json("Request deleted");
    }
    return res.status(404).json("Request not found");
  }
  return res.status(404).json("Invalid endpoint");
};

export { createRequest, getRequest, editRequest, deleteRequest };
