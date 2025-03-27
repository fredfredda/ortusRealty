import express from "express";
import protectRoute from "../middlewares/ProtectRoute.js";
import {
  getAllDvpProjects,
  getDvpDetails,
  orderTokens,
  cancelOrder,
  getAllTokenListings,
  getTokenListingDetails,
  listTokens,
  // updateTokenListing,
  deleteTokenListing,
  getInvestorTokenRequests,
  getInvestorTokenRequestDetails,
  requestTokens,
  // updateTokenRequest,
  deleteTokenRequest,
  getSentTokenRequests,
  getSentTokenRequestDetails,
  acceptTokenRequest,
  rejectTokenRequest,
  getInvestorTokenOrders,
  getInvestorTokenOrderDetails,
} from "../controllers/InvestorController.js";

const router = express.Router();

router.get("/development-projects", protectRoute, getAllDvpProjects);
router.get("/development-project/:projectId", protectRoute, getDvpDetails);

router.get("/token-orders", protectRoute, getInvestorTokenOrders);
router.get("/token-order/:orderId", protectRoute, getInvestorTokenOrderDetails);
router.post("/order-tokens", protectRoute, orderTokens);
router.delete("/cancel-order/:orderId", protectRoute, cancelOrder);

router.get("/token-listings", protectRoute, getAllTokenListings);
router.get(
  "/token-listing/:listingId",
  protectRoute,
  getTokenListingDetails
);
router.post("/list-tokens", protectRoute, listTokens);
// to update token listing, delete and create a new one
// router.put(
//   "/update-token-listing/:listingId",
//   protectRoute,
//   updateTokenListing
// );
router.delete(
  "/delete-token-listing/:listingId",
  protectRoute,
  deleteTokenListing
);

router.get("/token-requests", protectRoute, getInvestorTokenRequests);
router.get(
  "/token-request/:requestId",
  protectRoute,
  getInvestorTokenRequestDetails
);
router.post("/request-tokens", protectRoute, requestTokens);
// instead of updating token request, delete and create a new one
// router.put(
//   "/update-token-request/:requestId",
//   protectRoute,
//   updateTokenRequest
// );
router.delete("/delete-token-request/:requestId", protectRoute, deleteTokenRequest);

router.get("/sent-requests", protectRoute, getSentTokenRequests);
router.get("/sent-request/:requestId", protectRoute, getSentTokenRequestDetails);
router.put("/accept-request/:requestId", protectRoute, acceptTokenRequest);
router.put("/reject-request/:requestId", protectRoute, rejectTokenRequest);

export default router;
