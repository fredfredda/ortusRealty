-- CREATING TABLES

CREATE TABLE exchange_token_statuses(
    id SERIAL PRIMARY KEY,
    exchange_token_status VARCHAR(120),
    description VARCHAR(200)
);

CREATE TABLE token_ratings(
    id SERIAL PRIMARY KEY,
    token_rating VARCHAR(120),
    description VARCHAR(200)
);

CREATE TABLE development_project_statuses(
    id SERIAL PRIMARY KEY,
    development_project_status VARCHAR(120),
    description VARCHAR(120)
);

CREATE TABLE token_statuses(
    id SERIAL PRIMARY KEY,
    token_status VARCHAR(120),
    description VARCHAR(200)
);

CREATE TABLE token_order_statuses(
    id SERIAL PRIMARY KEY,
    token_order_status VARCHAR(120),
    description VARCHAR(200)
);

CREATE TABLE token_purchase_request_statuses(
    id SERIAL PRIMARY KEY,
    token_purchase_request_status VARCHAR(120),
    description VARCHAR(200)
);

CREATE TABLE token_orders(
    id SERIAL PRIMARY KEY,
    issuer_id INT REFERENCES agents(id),
    requested_by_id INT REFERENCES users(id),
    num_of_tokens INT,
    token_rating_id INT REFERENCES token_ratings(id),
    token_order_status_id INT REFERENCES token_order_statuses(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE exchange_tokens(
    id SERIAL PRIMARY KEY,
    listed_by_id INT REFERENCES users(id),
    description VARCHAR(500),
    num_of_tokens INT,
    token_rating_id INT REFERENCES token_ratings(id),
    exchange_token_status_id INT REFERENCES exchange_token_statuses(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE token_purchase_requests(
    id SERIAL PRIMARY KEY,
    requested_by_id INT REFERENCES users(id),
    exchange_token_id INT REFERENCES exchange_tokens(id),
    num_of_tokens INT,
    token_rating_id INT REFERENCES token_ratings(id),
    token_purchase_request_status_id INT REFERENCES token_purchase_request_statuses(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE development_projects(
    id SERIAL PRIMARY KEY,
    property_id INT REFERENCES properties(id),
    launching_date date,
    estimated_finishing_date date,
    total_tokens INT,
    minimum_tokens_to_buy INT,
    tokens_description VARCHAR(500),
    development_project_status_id INT REFERENCES development_project_statuses(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE property_tokens(
    id SERIAL PRIMARY KEY,
    development_project_id INT REFERENCES development_projects(id),
    token_rating_id INT REFERENCES token_ratings(id),
    token_price NUMERIC,
    estimated_return NUMERIC,
    token_reference_num VARCHAR(120),
    token_description VARCHAR(500),
    token_expiry_time TIMESTAMP,
    token_status_id INT REFERENCES token_statuses(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);


-- POPULATING TABLES

INSERT INTO token_statuses (token_status, description) VALUES
('inactive', 'The token is most likely with the issuing agent'),
('active', 'The token is most likely with an investor'),
('burnt', 'The token has expired');

INSERT INTO development_project_statuses (development_project_status) VALUES
('pending'),
('approved'),
('disapproved');

INSERT INTO token_ratings (token_rating) VALUES
('AAA'),
('AA'),
('A'),
('BBB'),
('BB'),
('B'),
('C');

INSERT INTO exchange_token_statuses (exchange_token_status) VALUES
('pending'),
('bought'),
('removed');

INSERT INTO token_order_statuses (token_order_status) VALUES
('pending'),
('approved'),
('disapproved');

INSERT INTO token_purchase_request_statuses (token_purchase_request_status) VALUES
('pending'),
('accepted'),
('rejected');