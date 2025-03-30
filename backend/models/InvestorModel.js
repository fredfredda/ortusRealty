import { db } from "../server.js";

const getPortfolioFromDb = async (userId) => {
  try {
    // get number of active and unpaid tokens
    const { rows: activeInvestments } = await db.query(`
      SELECT COUNT(pt.id) AS num_of_tokens, SUM(pt.estimated_return) AS monetary_value,
      pt.token_rating_id, tr.token_rating
      FROM property_tokens AS pt
      JOIN (
        SELECT property_token_id
        FROM investors_tokens
        WHERE user_id = $1 AND investors_tokens_status_id = 1
      ) AS it ON pt.id = it.property_token_id
      JOIN token_ratings AS tr ON pt.token_rating_id = tr.id
      WHERE pt.token_status_id = 2
      GROUP BY(pt.token_rating_id, tr.token_rating)
      `, [userId]);

      // get number of tokens ready for payout
    const { rows: readyForPayout } = await db.query(`
      SELECT COUNT(pt.id) AS num_of_tokens,
      SUM(pt.estimated_return) AS monetary_value, pt.token_rating_id, tr.token_rating
      FROM property_tokens AS pt
      JOIN (
        SELECT property_token_id
        FROM investors_tokens
        WHERE user_id = $1 AND investors_tokens_status_id = 1
      ) AS it ON pt.id = it.property_token_id
      JOIN token_ratings AS tr ON pt.token_rating_id = tr.id
      WHERE pt.token_status_id = 3
      GROUP BY(pt.token_rating_id, tr.token_rating)
      `, [userId]);

    return { activeInvestments, readyForPayout };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const getAllDvpProjectsFromDb = async () => {
  try {
    const dvpProjects = await db.query(`
      SELECT dp.id, dp.property_id, p.prpty_name, p.prpty_description,
      dp.launching_date, dp.estimated_finishing_date, dp.total_tokens,
      dp.minimum_tokens_to_buy, dp.tokens_description, 
      dp.development_project_status_id, dps.development_project_status
      FROM development_projects as dp
      JOIN properties as p ON dp.property_id = p.id
      JOIN development_project_statuses as dps
      ON dp.development_project_status_id = dps.id
      WHERE dp.development_project_status_id = 2
`);
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
      `SELECT dp.id, dp.property_id, p.prpty_name, p.prpty_description,
      dp.launching_date, dp.estimated_finishing_date, dp.total_tokens,
      dp.minimum_tokens_to_buy, dp.tokens_description, 
      dp.development_project_status_id, dps.development_project_status
      FROM development_projects as dp
      JOIN properties as p ON dp.property_id = p.id
      JOIN development_project_statuses as dps
      ON dp.development_project_status_id = dps.id
      WHERE dp.development_project_status_id = 2 AND dp.id = $1`,
      [projectId]
    );
    const data = dvpDetails.rows[0];
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const checkTokensAvailabilityFromDb = async (projectId, numOfTokens, tokenRatingId) =>{
  try {
    const tokens = await db.query(`
      SELECT id FROM property_tokens WHERE development_project_id = $1 AND token_rating_id = $2 AND token_status_id = 1
    `,[projectId, tokenRatingId]);
    const data = tokens.rows;
    if(data.length < numOfTokens){
      return false;
    }
    return true;
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
      `INSERT INTO token_orders (requested_by_id, development_project_id, num_of_tokens, token_rating_id, token_order_status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, projectId, numOfTokens, tokenRatingId, statusId, createdAt]
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getInvestorTokenOrdersFromDb = async (userId) => {
  try {
    const order = await db.query(`
      SELECT t.id, t.num_of_tokens, t.token_rating_id,
      tr.token_rating, t.token_order_status_id,
      tos.token_order_status, t.development_project_id,
      dp.property_id, p.prpty_name
      FROM token_orders AS t
      JOIN token_ratings AS tr ON t.token_rating_id = tr.id
      JOIN token_order_statuses AS tos
      ON t.token_order_status_id = tos.id
      JOIN development_projects AS dp 
      ON t.development_project_id = dp.id
      JOIN properties AS p ON dp.property_id = p.id
      WHERE t.requested_by_id = $1`, [
      userId,
    ]);
    const data = order.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const getOrderDetailsFromDb = async (userId, orderId) => {
  try {
    const order = await db.query(`
      SELECT t.id, t.num_of_tokens, t.token_rating_id,
      tr.token_rating, t.token_order_status_id,
      tos.token_order_status, t.development_project_id,
      dp.property_id, p.prpty_name
      FROM token_orders AS t
      JOIN token_ratings AS tr ON t.token_rating_id = tr.id
      JOIN token_order_statuses AS tos
      ON t.token_order_status_id = tos.id
      JOIN development_projects AS dp 
      ON t.development_project_id = dp.id
      JOIN properties AS p ON dp.property_id = p.id
      WHERE t.requested_by_id = $1 AND t.id = $2`, [
      userId, orderId
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

const getAllTokenListingsFromDb = async () => {
  try {
    const tokenListings = await db.query(
      `
      SELECT et.id, et.listed_by_id, u.first_name, u.last_name,
      et.description, et.num_of_tokens, et.token_rating_id,
      tr.token_rating, et.development_project_id,
      dp.property_id, p.prpty_name
      FROM exchange_tokens AS et
      JOIN users AS u ON et.listed_by_id = u.id
      JOIN token_ratings AS tr ON et.token_rating_id = tr.id
      JOIN development_projects AS dp
      ON et.development_project_id = dp.id
      JOIN properties AS p ON dp.property_id = p.id
      WHERE et.exchange_token_status_id = 1
      `,
    );
    const data = tokenListings.rows;
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getTokenListingDetailsFromDb = async (listingId) => {
  try {
    const tokenListing = await db.query(
      `
      SELECT et.id, et.listed_by_id, u.first_name, u.last_name,
      et.description, et.num_of_tokens, et.token_rating_id,
      tr.token_rating, et.development_project_id,
      dp.property_id, p.prpty_name
      FROM exchange_tokens AS et
      JOIN users AS u ON et.listed_by_id = u.id
      JOIN token_ratings AS tr ON et.token_rating_id = tr.id
      JOIN development_projects AS dp
      ON et.development_project_id = dp.id
      JOIN properties AS p ON dp.property_id = p.id
      WHERE et.exchange_token_status_id = 1 AND et.id = $1
      `,
      [listingId]
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
      `SELECT COUNT(it.id) FROM investors_tokens AS it 
      JOIN property_tokens AS pt ON it.property_token_id = pt.id
      WHERE it.user_id = $1 AND pt.token_rating_id = $2 AND pt.development_project_id = $3 AND pt.token_status_id = 2 AND it.investors_tokens_status_id = 1`,
      [userId, tokenRatingId, projectId]
    );
    const tokenCountData = tokenCount.rows[0];
    const totalInvestorTokens = Number(tokenCountData.count);

    // checking if user has enough tokens to sell
    const numOfTokensToSell = totalInvestorTokens - (totaltokensOnRequests + totalTokensOnExchange);
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
  projectId,
  createdAt
) => {
  try {
    await db.query(
      `INSERT INTO exchange_tokens (listed_by_id, num_of_tokens, description, token_rating_id, exchange_token_status_id, development_project_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, numOfTokens, description, tokenRatingId, statusId, projectId, createdAt]
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
      `
      SELECT tpr.id, tpr.num_of_tokens AS proposed_num_of_tokens,
      tpr.token_rating_id AS proposed_rating_id, tr.token_rating AS proposed_token_rating,
      tpr.token_purchase_request_status_id,
      tprs.token_purchase_request_status, tpr.development_project_id AS proposed_project_id,
      tpr.exchange_token_id, et.num_of_tokens AS num_of_tokens_on_sale, et.token_rating_id
      AS listed_token_rating_id, et.development_project_id AS listed_project_id
      FROM token_purchase_requests AS tpr
      JOIN token_ratings AS tr ON tpr.token_rating_id = tr.id
      JOIN token_purchase_request_statuses AS tprs
      ON tpr.token_purchase_request_status_id = tprs.id
      JOIN exchange_tokens AS et ON tpr.exchange_token_id = et.id
      WHERE tpr.requested_by_id = $1 AND tpr.token_purchase_request_status_id = 1`,
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
      `
      SELECT tpr.id, tpr.num_of_tokens AS proposed_num_of_tokens,
      tpr.token_rating_id AS proposed_rating_id, tr.token_rating AS proposed_token_rating,
      tpr.token_purchase_request_status_id,
      tprs.token_purchase_request_status, tpr.development_project_id AS proposed_project_id,
      tpr.exchange_token_id, et.num_of_tokens AS num_of_tokens_on_sale, et.token_rating_id
      AS listed_token_rating_id, et.development_project_id AS listed_project_id
      FROM token_purchase_requests AS tpr
      JOIN token_ratings AS tr ON tpr.token_rating_id = tr.id
      JOIN token_purchase_request_statuses AS tprs
      ON tpr.token_purchase_request_status_id = tprs.id
      JOIN exchange_tokens AS et ON tpr.exchange_token_id = et.id
      WHERE tpr.requested_by_id = $1 AND tpr.id = $2 AND tpr.token_purchase_request_status_id = 1`,
      [userId, requestId]
    );
    const data = tokenRequest.rows[0];
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const checkRequestExistsFromDb = async (userId, listingId) => {
  try {
    const request = await db.query(
      `SELECT id FROM token_purchase_requests WHERE requested_by_id = $1 AND exchange_token_id = $2 AND token_purchase_request_status_id != 2`, 
      [userId, listingId]
    );
    const data = request.rows;
    return data.length > 0;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const requestTokensFromDb = async (
  userId,
  listingId,
  proposedNumOfTokens,
  tokenRatingId,
  projectId,
  statusId,
  createdAt
) => {
  try {
    await db.query(
      `INSERT INTO token_purchase_requests (requested_by_id, exchange_token_id, num_of_tokens, token_rating_id, development_project_id, token_purchase_request_status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userId,
        listingId,
        proposedNumOfTokens,
        tokenRatingId,
        projectId,
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
      `SELECT tpr.id, tpr.requested_by_id, tpr.num_of_tokens AS proposed_num_of_tokens,
      tpr.token_rating_id AS proposed_rating_id, tr.token_rating AS proposed_token_rating,
      tpr.token_purchase_request_status_id,
      tprs.token_purchase_request_status, tpr.development_project_id AS proposed_project_id,
      tpr.exchange_token_id, et.num_of_tokens AS listed_num_of_tokens,
      et.token_rating_id AS listed_token_rating_id, et.development_project_id AS listed_project_id
      FROM token_purchase_requests AS tpr
      JOIN token_ratings AS tr ON tpr.token_rating_id = tr.id
      JOIN token_purchase_request_statuses AS tprs
      ON tpr.token_purchase_request_status_id = tprs.id
      JOIN exchange_tokens AS et ON tpr.exchange_token_id = et.id
      WHERE et.listed_by_id = $1 AND tpr.token_purchase_request_status_id = 1 AND et.exchange_token_status_id = 1`,
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
      `SELECT tpr.id, tpr.requested_by_id, tpr.num_of_tokens AS proposed_num_of_tokens,
      tpr.token_rating_id AS proposed_token_rating_id, tr.token_rating AS proposed_token_rating,
      tpr.token_purchase_request_status_id,
      tprs.token_purchase_request_status, tpr.development_project_id AS proposed_project_id,
      tpr.exchange_token_id, et.num_of_tokens AS listed_num_of_tokens,
      et.token_rating_id AS listed_token_rating_id, et.development_project_id AS listed_project_id
      FROM token_purchase_requests AS tpr
      JOIN token_ratings AS tr ON tpr.token_rating_id = tr.id
      JOIN token_purchase_request_statuses AS tprs
      ON tpr.token_purchase_request_status_id = tprs.id
      JOIN exchange_tokens AS et ON tpr.exchange_token_id = et.id
      WHERE et.listed_by_id = $1 AND tpr.token_purchase_request_status_id = 1 AND et.exchange_token_status_id = 1 AND tpr.id = $2`,
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
       AND property_token_id IN (SELECT id FROM property_tokens WHERE token_rating_id = $4 AND development_project_id = $5 AND token_status_id = 2 LIMIT $6)`,
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
       AND property_token_id IN (SELECT id FROM property_tokens WHERE token_rating_id = $4 AND development_project_id = $5 AND token_status_id = 2 LIMIT $6)`,
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

const getAllTokenPriceHistoryFromDb = async () => {
  try {
    const prices = await db.query(`SELECT * FROM token_history_prices`);
    return prices.rows;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const getAllTokenValuationHistoryFromDb = async () => {
  try {
    const valuations = await db.query(`SELECT * FROM token_valuation_history`);
    return valuations.rows;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export {
  getPortfolioFromDb,
  getAllDvpProjectsFromDb,
  getDvpDetailsFromDb,
  checkTokensAvailabilityFromDb,
  getInvestorTokenOrdersFromDb,
  orderTokensFromDb,
  getOrderDetailsFromDb,
  deleteOrderFromDb,
  getAllTokenListingsFromDb,
  getTokenListingDetailsFromDb,
  checkUserTokensFromDb,
  listTokensFromDb,
  updateTokenListingFromDb,
  deleteTokenListingFromDb,
  getInvestorTokenRequestsFromDb,
  getInvestorTokenRequestDetailsFromDb,
  checkRequestExistsFromDb,
  requestTokensFromDb,
  updateTokenRequestFromDb,
  deleteTokenRequestFromDb,
  getSentTokenRequestsFromDb,
  getSentTokenRequestDetailsFromDb,
  updateTokenRequestStatusFromDb,
  updateExchangeTokenStatusFromDb,
  updateTokensOwnerFromDb,
  getAllTokenPriceHistoryFromDb,
  getAllTokenValuationHistoryFromDb,
};
