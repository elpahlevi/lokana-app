const WrfGen = require("../../models/products/WrfGenerator");

const createRequest = async (req, res) => {
  const { id } = req.user;
  const request = new WrfGen({
    userId: id,
    requestId: `${id}-${Date.now()}`,
    wrfVariables: req.body.variables,
    output: req.body.output,
    resolution: req.body.resolution,
    simulationDate: req.body.simulationDate,
    purpose: req.body.purpose,
    domain: req.body.domain,
  });

  try {
    await request.save();
    res.json({
      status: "Success",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getRequest = async (req, res) => {
  const { isAdmin } = req.user;
  const id = req.query.id;
  const reqId = req.query.reqId;

  if (!reqId && !id) {
    if (isAdmin) {
      const request = await WrfGen.find();
      return res.status(200).json({
        status: "success get all users data (admin)",
        request,
      });
    }
    return res.status(200).json({ error: "please specify your query" });
  }

  // Admin and users privilege (line 44-64)
  // Get all requests data from one user
  if (id) {
    const request = await WrfGen.find({ userId: id });
    if (request.length > 0) {
      return res
        .status(200)
        .json({ status: `list of requested data from user ${id}`, request });
    } else {
      return res.status(200).json({ error: "data not found" });
    }
  }

  // Get one data from requestId
  if (reqId) {
    const request = await WrfGen.findOne({ requestId: reqId });
    if (request) {
      return res.status(200).json({ status: "one request matched", request });
    } else {
      return res.status(200).json({ error: "request not found" });
    }
  }
};

const updateRequest = async (req, res) => {
  const { isAdmin } = req.user;
  const reqId = req.query.reqId;

  if (isAdmin) {
    const update = await WrfGen.findOneAndUpdate(
      { requestId: reqId },
      {
        status: req.body.status,
        finishedDate: req.body.finishedDate,
        outputLink: req.body.outputLink,
        fileSize: req.body.fileSize,
      }
    );

    try {
      await update.save();
      return res.status(200).send("Data has been updated");
    } catch (err) {
      return res.status(403).send("You are not allowed");
    }
  }
  return res.status(200).json({ error: "You are not allowed" });
};

const deleteRequest = async (req, res) => {
  const { isAdmin } = req.user;

  if (isAdmin) {
    const reqId = req.query.reqId;
    const deleteRequest = await WrfGen.findOneAndDelete({ requestId: reqId });

    try {
      await deleteRequest.remove();
      res.status(200).send("Data has been deleted");
    } catch (err) {
      res.status(400).json({ status: err });
    }
  }
  return res.status(200).json({ error: "You are not allowed" });
};

module.exports = { createRequest, getRequest, updateRequest, deleteRequest };
