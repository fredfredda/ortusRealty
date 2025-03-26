import { db } from "../server.js";

const getAllDvpProjectsFromDb = async () => {
  try {
    const dvpProjects = await db.query(`SELECT * FROM development_projects`);
    const data = dvpProjects.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getDvpDetailsFromDb = async (projectId) => {
  try {
    const dvpDetails = await db.query(
      `SELECT * FROM development_projects WHERE id = $1`,
      [projectId]
    );
    const data = dvpDetails.rows[0];
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const orderTokensFromDb = async (
  userId,
  projectId,
  numOfTokens,
  tokenRatingId,
  statusId,
  createdAt
) => {
  try {
    await db.query(
      `INSERT INTO orders (requested_by_id, development_project_id, num_of_tokens, token_rating_id, token_order_status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, projectId, numOfTokens, tokenRatingId, statusId, createdAt]
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getOrderDetailsFromDb = async (orderId) => {
  try {
    const order = await db.query(`SELECT * FROM token_orders WHERE id = $1`, [
      orderId,
    ]);
    const data = order.rows[0];
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const deleteOrderFromDb = async (orderId) => {
  try {
    await db.query(`DELETE FROM token_orders WHERE id = $1`, [orderId]);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getInvestorTokenListingsFromDb = async (userId) => {
  try {
    const tokenListings = await db.query(
      `SELECT * FROM exchange_tokens WHERE listed_by_id = $1`,
      [userId]
    );
    const data = tokenListings.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getInvestorTokenListingDetailsFromDb = async (userId, listingId) => {
  try {
    if (!userId) {
      const tokenListing = await db.query(
        `SELECT * FROM exchange_tokens WHERE id = $1`,
        [listingId]
      );
      const data = tokenListing.rows[0];
      return data;
    }

    const tokenListing = await db.query(
      `SELECT * FROM exchange_tokens WHERE listed_by_id = $1 AND id = $2`,
      [userId, listingId]
    );
    const data = tokenListing.rows[0];
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const checkUserTokensFromDb = async (
  userId,
  numOfTokens,
  tokenRatingId,
  projectId
) => {
  try {
    // getting total investor tokens on exchange
    const tokensOnRequests = await db.query(
      `SELECT num_of_tokens FROM token_purchase_requests WHERE requested_by_id = $1 AND token_rating_id = $2 AND development_project_id = $3 AND token_purchase_request_status_id != 2`,
      [userId, tokenRatingId, projectId]
    );
    const tokensOnRequestsData = tokensOnRequests.rows;
    let totaltokensOnRequests = 0;
    tokensOnRequestsData.forEach((token) => {
      totaltokensOnRequests += token.num_of_tokens;
    });

    // getting total investor tokens on exchange
    const tokensOnExchange = await db.query(
      `SELECT num_of_tokens FROM exchange_tokens WHERE listed_by_id = $1 AND token_rating_id = $2 AND development_project_id = $3 AND exchange_token_status_id != 2`,
      [userId, tokenRatingId, projectId]
    );
    const tokensOnExchangeData = tokensOnExchange.rows;
    let totalTokensOnExchange = 0;
    tokensOnExchangeData.forEach((token) => {
      totalTokensOnExchange += token.num_of_tokens;
    });

    // getting total investor tokens
    const tokenCount = await db.query(
      `SELECT COUNT(id) FROM investors_tokens WHERE user_id = $1 AND t.token_rating_id = $2 AND t.development_project_id = $3 AND token_status_id = 2`,
      [userId, tokenRatingId, projectId]
    );
    const tokenCountData = tokenCount.rows[0];
    const totalInvestorTokens = tokenCountData.count;

    // checking if user has enough tokens to sell
    const numOfTokensToSell =
      totalInvestorTokens - (totaltokensOnRequests + totalTokensOnExchange);
    if (numOfTokensToSell < numOfTokens) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const listTokensFromDb = async (
  userId,
  numOfTokens,
  description,
  tokenRatingId,
  statusId,
  createdAt
) => {
  try {
    await db.query(
      `INSERT INTO exchange_tokens (listed_by_id, num_of_tokens, description, token_rating_id, exchange_token_status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, numOfTokens, description, tokenRatingId, statusId, createdAt]
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const updateTokenListingFromDb = async (
  listingId,
  numOfTokens,
  description,
  statusId,
  updatedAt
) => {
  try {
    await db.query(
      `UPDATE exchange_tokens SET num_of_tokens = $1, description = $2, exchange_token_status_id = $3, updated_at = $4 WHERE id = $5`,
      [numOfTokens, description, statusId, updatedAt, listingId]
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const deleteTokenListingFromDb = async (listingId) => {
  try {
    await db.query(`DELETE FROM exchange_tokens WHERE id = $1`, [listingId]);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getInvestorTokenRequestsFromDb = async (userId) => {
  try {
    const tokenRequests = await db.query(
      `SELECT * FROM token_purchase_requests WHERE requested_by_id = $1`,
      [userId]
    );
    const data = tokenRequests.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getInvestorTokenRequestDetailsFromDb = async (userId, requestId) => {
  try {
    const tokenRequest = await db.query(
      `SELECT * FROM token_purchase_requests WHERE requested_by_id = $1 AND id = $2`,
      [userId, requestId]
    );
    const data = tokenRequest.rows[0];
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const requestTokensFromDb = async (
  userId,
  listingId,
  proposedNumOfTokens,
  tokenRatingId,
  statusId,
  createdAt
) => {
  try {
    await db.query(
      `INSERT INTO token_purchase_requests (requested_by_id, exchange_token_id, num_of_tokens, token_rating_id, token_purchase_request_status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        listingId,
        proposedNumOfTokens,
        tokenRatingId,
        statusId,
        createdAt,
      ]
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const updateTokenRequestFromDb = async (
  requestId,
  proposedNumOfTokens,
  tokenRatingId,
  projectId,
  statusId,
  updatedAt
) => {
  try {
    await db.query(
      `UPDATE token_purchase_requests SET num_of_tokens = $1, token_rating_id = $2, development_project_id = $3, token_purchase_request_status_id = $4, updated_at = $5 WHERE id = $6`,
      [
        proposedNumOfTokens,
        tokenRatingId,
        projectId,
        statusId,
        updatedAt,
        requestId,
      ]
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const deleteTokenRequestFromDb = async (requestId) => {
  try {
    await db.query(`DELETE FROM token_purchase_requests WHERE id = $1`, [
      requestId,
    ]);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getSentTokenRequestsFromDb = async (userId) => {
  try {
    const requests = await db.query(
      `SELECT * FROM token_purchase_requests WHERE exchange_token_id IN (SELECT id FROM exchange_tokens WHERE listed_by_id = $1)`,
      [userId]
    );
    const data = requests.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getSentTokenRequestDetailsFromDb = async (userId, requestId) => {
  try {
    const request = await db.query(
      `SELECT * FROM token_purchase_requests WHERE exchange_token_id IN (SELECT id FROM exchange_tokens WHERE listed_by_id = $1) AND id = $2`,
      [userId, requestId]
    );
    const data = request.rows[0];
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const updateTokenRequestStatusFromDb = async (
  requestId,
  statusId,
  updatedAt
) => {
  try {
    await db.query(
      `UPDATE token_purchase_requests SET token_purchase_request_status_id = $1, updated_at = $2 WHERE id = $3`,
      [statusId, updatedAt, requestId]
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const updateExchangeTokenStatusFromDb = async (
  listingId,
  statusId,
  updatedAt
) => {
  try {
    await db.query(
      `UPDATE exchange_tokens SET exchange_token_status_id = $1, updated_at = $2 WHERE id = $3`,
      [statusId, updatedAt, listingId]
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const updateTokensOwnerFromDb = async (
    sellerId,
    buyerId,
    projectIdSold,
    proposedProjectId,
    numOfTokensSold,
    proposedNumOfTokens,
    tokenRatingIdSold,
    proposedTokenRatingId,
    updatedAt
) => {
  try {
    await db.query(
      `UPDATE investors_tokens SET user_id = $1, updated_at = $2 
       WHERE user_id = $3 
       AND token_id IN (SELECT id FROM tokens WHERE token_rating_id = $4 AND development_project_id = $5 AND token_status_id = 2) LIMIT $6`,
      [
        buyerId,
        updatedAt,
        sellerId,
        tokenRatingIdSold,
        projectIdSold,
        numOfTokensSold,
      ]
    );

    await db.query(
      `UPDATE investors_tokens SET user_id = $1, updated_at = $2 
       WHERE user_id = $3 
       AND token_id IN (SELECT id FROM tokens WHERE token_rating_id = $4 AND development_project_id = $5 AND token_status_id = 2) LIMIT $6`,
      [
        sellerId,
        updatedAt,
        buyerId,
        proposedTokenRatingId,
        proposedProjectId,
        proposedNumOfTokens,
      ]
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export {
  getAllDvpProjectsFromDb,
  getDvpDetailsFromDb,
  orderTokensFromDb,
  getOrderDetailsFromDb,
  deleteOrderFromDb,
  getInvestorTokenListingsFromDb,
  getInvestorTokenListingDetailsFromDb,
  checkUserTokensFromDb,
  listTokensFromDb,
  updateTokenListingFromDb,
  deleteTokenListingFromDb,
  getInvestorTokenRequestsFromDb,
  getInvestorTokenRequestDetailsFromDb,
  requestTokensFromDb,
  updateTokenRequestFromDb,
  deleteTokenRequestFromDb,
  getSentTokenRequestsFromDb,
  getSentTokenRequestDetailsFromDb,
  updateTokenRequestStatusFromDb,
  updateExchangeTokenStatusFromDb,
  updateTokensOwnerFromDb,
};
