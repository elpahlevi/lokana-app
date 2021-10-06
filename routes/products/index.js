import { Router } from "express";
import { getProducts } from "../../controllers/products/productController.js";
import {
  createRequest,
  deleteRequest,
  editRequest,
  getRequest,
} from "../../controllers/products/wrfgenController.js";
import { verifyAccessToken } from "../../middleware/token.js";
const productRouter = Router();

/* 
  All products
*/
productRouter.get("/", [verifyAccessToken], getProducts); // Admin only

/* 
  WRFGen Endpoint
*/
productRouter.get("/wrfgen", [verifyAccessToken], getRequest); // use reqId for query
productRouter.post("/wrfgen", [verifyAccessToken], createRequest);
productRouter.put("/wrfgen", [verifyAccessToken], editRequest); // Admin only
productRouter.delete("/wrfgen", [verifyAccessToken], deleteRequest); // Admin only

export default productRouter;
