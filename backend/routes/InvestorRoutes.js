import express from "express";
import protectRoute from "../middlewares/ProtectRoute.js";
import {
  getAllDvpProjects,
  getDvpDetails,
  orderTokens,
  cancelOrder,
  getInvestorTokenListings,
  getInvestorTokenListingDetails,
  listTokens,
  updateTokenListing,
  deleteTokenListing,
  getInvestorTokenRequests,
  getInvestorTokenRequestDetails,
  requestTokens,
  updateTokenRequest,
  deleteTokenRequest,
  getSentTokenRequests,
  getSentTokenRequests,
  getSentTokenRequestDetails,
  acceptTokenRequest,
  rejectTokenRequest,
} from "../controllers/InvestorController.js";

const router = express.Router();

router.get("/", protectRoute, getAllDvpProjects);
router.get("/project-details/:projectId", protectRoute, getDvpDetails);

router.post("/order-tokens/:projectId", protectRoute, orderTokens);
router.delete("/cancel-order/:orderId", protectRoute, cancelOrder);

router.get("/token-listings", protectRoute, getInvestorTokenListings);
router.get(
  "/token-listings/:listingId",
  protectRoute,
  getInvestorTokenListingDetails
);
router.post("/list-tokens", protectRoute, listTokens);
router.put(
  "/update-token-listing/:listingId",
  protectRoute,
  updateTokenListing
);
router.delete(
  "/delete-token-listing/:listingId",
  protectRoute,
  deleteTokenListing
);

router.get("/token-requests", protectRoute, getInvestorTokenRequests);
router.get(
  "/token-requests/:requestId",
  protectRoute,
  getInvestorTokenRequestDetails
);
router.post("/request-tokens/:listingId", protectRoute, requestTokens);
router.put(
  "/update-token-request/:requestId",
  protectRoute,
  updateTokenRequest
);
router.delete("/delete-token-request/:requestId", protectRoute, deleteTokenRequest);

router.get("/sent-requests", protectRoute, getSentTokenRequests);
router.get("/sent-requests/:requestId", protectRoute, getSentTokenRequestDetails);
router.put("/accept-request/:requestId", protectRoute, acceptTokenRequest);
router.put("/reject-request/:requestId", protectRoute, rejectTokenRequest);

export default router;
