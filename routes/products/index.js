import { Router } from "express";
const productRouter = Router();
import { getProducts } from "../../controllers/products/productController.js";
import {
  createRequest,
  deleteRequest,
  editRequest,
  getRequest,
} from "../../controllers/products/wrfgenController.js";
import { verifyAccessToken } from "../../middleware/token.js";

/* 
  All products and one product
*/
productRouter.get("/", [verifyAccessToken], getProducts); // Admin and user

/* 
  WRFGen Endpoint
*/
productRouter.get("/wrfgen", [verifyAccessToken], getRequest); // use reqId for query
productRouter.post("/wrfgen", [verifyAccessToken], createRequest);
productRouter.put("/wrfgen", [verifyAccessToken], editRequest); // Admin only
productRouter.delete("/wrfgen", [verifyAccessToken], deleteRequest); // Admin only

export default productRouter;
