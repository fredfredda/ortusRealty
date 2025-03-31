import {
  getAllDvpProjectsFromDb,
  getDvpDetailsFromDb,
  orderTokensFromDb,
  getOrderDetailsFromDb,
  deleteOrderFromDb,
  checkUserTokensFromDb,
  listTokensFromDb,
  // updateTokenListingFromDb,
  deleteTokenListingFromDb,
  getInvestorTokenRequestsFromDb,
  getInvestorTokenRequestDetailsFromDb,
  requestTokensFromDb,
  // updateTokenRequestFromDb,
  getSentTokenRequestDetailsFromDb,
  updateTokenRequestStatusFromDb,
  updateExchangeTokenStatusFromDb,
  updateTokensOwnerFromDb,
  checkTokensAvailabilityFromDb,
  getInvestorTokenOrdersFromDb,
  getTokenListingDetailsFromDb,
  getAllTokenListingsFromDb,
  deleteTokenRequestFromDb,
  getSentTokenRequestsFromDb,
  getPortfolioFromDb,
  checkRequestExistsFromDb,
  getTokensValuationHistoryFromDb,
  getTokensPriceHistoryFromDb,
} from "../models/InvestorModel.js";

const getPortfolio = async (req, res) => {
  try {
    const { userId } = req.user;
    // const userId = 47; // for testing purposes, remove this line later

    const portfolio = await getPortfolioFromDb(userId);
    if (portfolio.error)
      return res.status(500).json({ error: "Internal server error" });

    const calculateSum = (arr, propertyName) => {
      let sum = 0;
      arr.forEach((item) => {
        sum += Number(item[propertyName]);
      });
      return sum;
    };
    const sumActiveInvestments = calculateSum(
      portfolio.activeInvestments,
      "monetary_value"
    );
    const sumReadyForPayout = calculateSum(
      portfolio.readyForPayout,
      "monetary_value"
    );

    const activeInvestments = {
      // title: "Active Investments",
      balance: sumActiveInvestments,
      tokenInfo: portfolio.activeInvestments.map((item) => ({
        rating: item.token_rating,
        value: item.num_of_tokens,
      })),
      // styleClass: "active-investment",
      // description: "Estimated return of all your active tokens combined",
    };
    const readyForPayout = {
      // title: "Active Investments",
      balance: sumReadyForPayout,
      tokenInfo: portfolio.readyForPayout.map((item) => ({
        rating: item.token_rating,
        value: item.num_of_tokens,
      })),
      // styleClass: "active-investment",
      // description: "Estimated return of all your active tokens combined",
    };

    const generateTokenDetails = (arr) => {
      let formattedArr = [];

      if (arr.length > 0){
        while (true) {
          let project_id = arr[0].development_project_id;
          let property_name = arr[0].prpty_name;
          let similar_items = [];
  
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].development_project_id === arr[0].development_project_id) {
              similar_items.push({
                rating: arr[i].token_rating,
                value: arr[i].num_of_tokens,
                return: Math.round((((arr[i].estimated_return - arr[i].token_price) * 100) /
                arr[i].token_price) * 100) / 100,
              });
            }
          }
  
          arr = arr.filter((item) => item.development_project_id !== project_id);
          formattedArr.push({
            projectId: project_id,
            propertyName: property_name,
            tokenInfo: similar_items,
          });
          if (arr.length === 0) break;
        }
      }

      return formattedArr;
    };
    const activeTokensDetails = generateTokenDetails(
      portfolio.activeTokensDetails
    );
    const burntUnpaidTokensDetails = generateTokenDetails(
      portfolio.burntUnpaidTokensDetails
    );

    res
      .status(200)
      .json({ activeInvestments, readyForPayout, activeTokensDetails, burntUnpaidTokensDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTokensValuationHistory = async (req, res) => {
  try {
    const { dataLength, offset } = req.query;
    const valuationHistory = await getTokensValuationHistoryFromDb(dataLength, offset);
    if (valuationHistory.error) return res.status(500).json({ error: "Internal Server Error"});
    res.status(200).json({valuationHistory})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  }
}

const getTokensPriceHistory = async (req, res) => {
  try {
    const { dataLength, offset } = req.query;
    const priceHistory = await getTokensPriceHistoryFromDb(dataLength, offset);
    if (priceHistory.error) return res.status(500).json({ error: "Internal Server Error"});
    res.status(200).json({priceHistory})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error })
  }
}

const getAllDvpProjects = async (req, res) => {
  try {
    const { dataLength, page } = req.query;
    const offset = (page - 1) * dataLength;
    const dvpProjects = await getAllDvpProjectsFromDb(dataLength, offset);
    if (dvpProjects.error)
      return res.status(500).json({ error: "Internal server error" });
    res.status(200).json({ dvpProjects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDvpDetails = async (req, res) => {
  try {
    const { projectId } = req.params;
    const dvpDetails = await getDvpDetailsFromDb(projectId);
    if (!dvpDetails)
      return res.status(404).json({ error: "Project not found" });
    if (dvpDetails.error)
      return res.status(500).json({ error: "Internal server error" });
    res.status(200).json({ dvpDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvestorTokenOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    const orders = await getInvestorTokenOrdersFromDb(userId);
    if (orders.error)
      return res.status(500).json({ error: "Internal server error" });
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getInvestorTokenOrderDetails = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderId } = req.params;

    const order = await getOrderDetailsFromDb(userId, orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.error) return res.status(500).json({ error: order.error });

    return res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const orderTokens = async (req, res) => {
  try {
    const { userId } = req.user;
    const { projectId, numOfTokens, tokenRatingId } = req.body;

    if (!projectId || !numOfTokens || !tokenRatingId)
      return res.status(400).json({ error: "Please provide all fields" });

    const dvpDetails = await getDvpDetailsFromDb(projectId);
    if (!dvpDetails)
      return res.status(404).json({ error: "Project not found" });
    if (dvpDetails.minimum_tokens_to_buy > numOfTokens)
      return res
        .status(400)
        .json({ error: "Minimum tokens to buy is not met" });

    const tokensAvailable = await checkTokensAvailabilityFromDb(
      projectId,
      numOfTokens,
      tokenRatingId
    );
    if (!tokensAvailable)
      return res.status(400).json({ error: "Insufficient tokens" });

    const createdAt = new Date().toISOString();
    const statusId = 1;
    const order_tokens = await orderTokensFromDb(
      userId,
      projectId,
      numOfTokens,
      tokenRatingId,
      statusId,
      createdAt
    );
    if (order_tokens.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ success: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderId } = req.params;

    const order = await getOrderDetailsFromDb(userId, orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.token_order_status_id === 2)
      return res.status(400).json({ error: "Order already approved" });
    if (order.token_order_status_id === 4)
      return res.status(400).json({ error: "Order already completed" });

    const cancel_order = await deleteOrderFromDb(orderId);
    if (cancel_order.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ success: "Order cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllTokenListings = async (req, res) => {
  try {
    const { userId } = req.user;
    const tokenListings = await getAllTokenListingsFromDb();
    if (tokenListings.error)
      return res.status(500).json({ error: "Internal server error" });
    res.status(200).json({ tokenListings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTokenListingDetails = async (req, res) => {
  try {
    const { userId } = req.user;
    const { listingId } = req.params;
    const tokenListing = await getTokenListingDetailsFromDb(listingId);
    if (!tokenListing)
      return res.status(404).json({ error: "Token listing not found" });
    if (tokenListing.error)
      return res.status(500).json({ error: "Internal server error" });
    res.status(200).json({ tokenListing });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const listTokens = async (req, res) => {
  try {
    const { userId } = req.user;
    const { numOfTokens, tokenRatingId, projectId, description } = req.body;

    if (!numOfTokens || !tokenRatingId || !projectId || !description)
      return res.status(400).json({ error: "Please provide all fields" });

    // check if the user has enough tokens to list
    const tokensAvailable = await checkUserTokensFromDb(
      userId,
      numOfTokens,
      tokenRatingId,
      projectId
    );
    if (!tokensAvailable)
      return res.status(400).json({ error: "Insufficient tokens" });

    const createdAt = new Date().toISOString();
    const statusId = 1;
    const list_tokens = await listTokensFromDb(
      userId,
      numOfTokens,
      description,
      tokenRatingId,
      statusId,
      projectId,
      createdAt
    );
    if (list_tokens.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ success: "Tokens listed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const updateTokenListing = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const { listingId } = req.params;
//     const { numOfTokens, tokenRatingId, projectId, description } = req.body;

//     if (!numOfTokens || !tokenRatingId || !projectId || !description)
//       return res.status(400).json({ error: "Please provide all fields" });

//     const tokenListing = await getTokenListingDetailsFromDb(listingId);
//     if (!tokenListing)
//       return res.status(404).json({ error: "Token listing not found" });
//     if (tokenListing.listed_by_id !== userId)
//       return res.status(401).json({ error: "Unauthorized" });
//     if (tokenListing.exchange_token_status_id === 2)
//       return res.status(400).json({ error: "Tokens have already been bought" });

//     // check if the user has enough tokens to list
//     const tokensAvailable = await checkUserTokensFromDb(
//       userId,
//       numOfTokens,
//       tokenRatingId,
//       projectId
//     );
//     if (!tokensAvailable)
//       return res.status(400).json({ error: "Insufficient tokens" });

//     const updatedAt = new Date().toISOString();
//     const statusId = 1;
//     const update_listing = await updateTokenListingFromDb(
//       listingId,
//       numOfTokens,
//       description,
//       statusId,
//       updatedAt
//     );
//     if (update_listing.error)
//       return res.status(500).json({ error: "Internal server error" });

//     res.status(200).json({ success: "Token listing updated successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const deleteTokenListing = async (req, res) => {
  try {
    const { userId } = req.user;
    const { listingId } = req.params;

    const tokenListing = await getTokenListingDetailsFromDb(listingId);
    if (!tokenListing)
      return res.status(404).json({ error: "Token listing not found" });
    if (tokenListing.listed_by_id !== userId)
      return res.status(401).json({ error: "Unauthorized" });

    const delete_listing = await deleteTokenListingFromDb(listingId);
    if (delete_listing.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ success: "Token listing deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvestorTokenRequests = async (req, res) => {
  try {
    const { userId } = req.user;

    const requests = await getInvestorTokenRequestsFromDb(userId);
    if (requests.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ requests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getInvestorTokenRequestDetails = async (req, res) => {
  try {
    const { userId } = req.user;
    const { requestId } = req.params;

    const request = await getInvestorTokenRequestDetailsFromDb(
      userId,
      requestId
    );
    if (!request)
      return res.status(404).json({ error: "Token request not found" });
    if (request.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ request });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const requestTokens = async (req, res) => {
  try {
    const { userId } = req.user;
    const { listingId, proposedNumOfTokens, tokenRatingId, projectId } =
      req.body;

    if (!listingId || !proposedNumOfTokens || !tokenRatingId || !projectId)
      return res.status(400).json({ error: "Please provide all fields" });

    const tokenListing = await getTokenListingDetailsFromDb(listingId);
    if (!tokenListing)
      return res.status(404).json({ error: "Token listing not found" });
    if (tokenListing.listed_by_id === userId)
      return res
        .status(400)
        .json({ error: "You cannot request tokens from yourself" });

    const requestExists = await checkRequestExistsFromDb(userId, listingId);
    if (requestExists)
      return res.status(400).json({ error: "Request already exists" });

    const tokensAvailable = await checkUserTokensFromDb(
      userId,
      proposedNumOfTokens,
      tokenRatingId,
      projectId
    );
    if (!tokensAvailable)
      return res.status(400).json({ error: "Insufficient tokens" });

    const createdAt = new Date().toISOString();
    const statusId = 1;
    const request_tokens = await requestTokensFromDb(
      userId,
      listingId,
      proposedNumOfTokens,
      tokenRatingId,
      projectId,
      statusId,
      createdAt
    );
    if (request_tokens.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ success: "Token request placed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server" });
  }
};

// const updateTokenRequest = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const { requestId } = req.params;
//     const { proposedNumOfTokens, tokenRatingId, projectId } = req.body;

//     if (!proposedNumOfTokens || !tokenRatingId || !projectId)
//       return res.status(400).json({ error: "Please provide all fields" });

//     const request = await getInvestorTokenRequestDetailsFromDb(
//       userId,
//       requestId
//     );
//     if (!request)
//       return res.status(404).json({ error: "Token request not found" });
//     if (request.requested_by_id !== userId)
//       return res.status(401).json({ error: "Unauthorized" });
//     if (request.token_purchase_request_status_id === 2)
//       return res.status(400).json({ error: "Token request already accepted" });

//     const tokensAvailable = await checkUserTokensFromDb(
//       userId,
//       proposedNumOfTokens,
//       tokenRatingId,
//       projectId
//     );
//     if (!tokensAvailable)
//       return res.status(400).json({ error: "Insufficient tokens" });

//     const updatedAt = new Date().toISOString();
//     const statusId = 1;
//     const update_request = await updateTokenRequestFromDb(
//       requestId,
//       proposedNumOfTokens,
//       tokenRatingId,
//       projectId,
//       statusId,
//       updatedAt
//     );
//     if (update_request.error)
//       return res.status(500).json({ error: "Internal server error" });

//     res.status(200).json({ success: "Token request updated successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

const deleteTokenRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    const { requestId } = req.params;

    const request = await getInvestorTokenRequestDetailsFromDb(
      userId,
      requestId
    );
    if (!request)
      return res.status(404).json({ error: "Token request not found" });

    const delete_request = await deleteTokenRequestFromDb(requestId);
    if (delete_request.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ success: "Token request deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getSentTokenRequests = async (req, res) => {
  try {
    const { userId } = req.user;

    const requests = await getSentTokenRequestsFromDb(userId);
    if (requests.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ requests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getSentTokenRequestDetails = async (req, res) => {
  try {
    const { userId } = req.user;
    const { requestId } = req.params;

    const request = await getSentTokenRequestDetailsFromDb(userId, requestId);
    if (!request)
      return res.status(404).json({ error: "Token request not found" });
    if (request.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ request });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server" });
  }
};

const acceptTokenRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    const { requestId } = req.params;

    const request = await getSentTokenRequestDetailsFromDb(userId, requestId);
    if (!request)
      return res.status(404).json({ error: "Token request not found" });

    const updatedAt = new Date().toISOString();
    const change_tokens_holder = await updateTokensOwnerFromDb(
      userId,
      request.requested_by_id,
      request.listed_project_id,
      request.proposed_project_id,
      request.listed_num_of_tokens,
      request.proposed_num_of_tokens,
      request.listed_token_rating_id,
      request.proposed_token_rating_id,
      updatedAt
    );
    if (change_tokens_holder.error)
      return res.status(500).json({ error: "Internal server error" });

    const change_token_request_status = await updateTokenRequestStatusFromDb(
      requestId,
      2,
      updatedAt
    );
    if (change_token_request_status.error)
      return res.status(500).json({ error: "Internal server error" });

    const change_exchange_token_status = await updateExchangeTokenStatusFromDb(
      request.exchange_token_id,
      2,
      updatedAt
    );
    if (change_exchange_token_status.error)
      return res.status(500).json({ error: "Internal server error" });

    res.status(200).json({ success: "Token request accepted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const rejectTokenRequest = async (req, res) => {
  try {
    const { userId } = req.user;
    const { requestId } = req.params;

    const request = await getSentTokenRequestDetailsFromDb(userId, requestId);
    if (!request)
      return res.status(404).json({ error: "Token request not found" });
    if (request.listed_by_id !== userId)
      return res.status(401).json({ error: "Unauthorized" });

    const updatedAt = new Date().toISOString();
    const change_token_request_status = await updateTokenRequestStatusFromDb(
      requestId,
      3,
      updatedAt
    );
    if (change_token_request_status.error)
      return res.status(500).json({ error: "Internal server error" });

    return res
      .status(200)
      .json({ success: "Token request rejected successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getPortfolio,
  getTokensValuationHistory,
  getTokensPriceHistory,
  getAllDvpProjects,
  getDvpDetailsFromDb,
  getDvpDetails,
  getInvestorTokenOrders,
  getInvestorTokenOrderDetails,
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
};
