create table users(
	id serial primary key,
	first_name varchar(60),
	last_name varchar(60),
	username varchar(60),
	email varchar(60),
	pswrd varchar(60),
	created_at timestamptz
)

create table neighborhood_categories(
	id serial primary key,
	category_name varchar(60),
	description varchar(60)
)

create table provinces(
	id serial primary key,
	prvc_name varchar(60),
	prvc_estimated_population int,
	provc_latitude int,
	provc_longitude int
)

create table neighborhoods(
	id serial primary key,
	nbhd_name varchar(100),
	nbhd_province_id int,
	nbhd_category_id int,
	nbhd_estimated_population int,
	nbhd_latitude int,
	nbhd_longitude int,
	nbhd_climate varchar(120),
	constraint fk_provinceid_nbhd foreign key (nbhd_province_id) references provinces(id),
	constraint fk_categoryid_nbhd foreign key (nbhd_category_id) references neighborhood_categories(id)
)

create table admins(
	id serial primary key,
	username varchar(60),
	first_name varchar(60),
	last_name varchar(60),
	psswrd varchar(60),
	admin_role varchar(60)
)

create table property_saletypes(
	id serial primary key,
	saletype_name varchar(60),
	description varchar(200)
)

create table properties(
	id serial primary key,
	prpty_name varchar(120),
	prpty_price numeric,
	prpty_size int,
	prpty_location varchar(120),
	prpty_saletype_id int,
	prpty_nbhd_id int,
	prpty_description varchar(500),
	prpty_latitude int,
	prpty_longitude int,
	images varchar(500),
	prpty_type_id int,
	category_id int,
	home_details_id varchar(80),
	constraint fk_saletypeid_prpty foreign key (prpty_saletype_id) references property_saletypes(id),
	constraint fk_nbhdid_prpty foreign key (prpty_nbhd_id) references neighborhoods(id),
	constraint fk_prptytypeid_prpties foreign key (prpty_type_id) references property_types(id),
	constraint fk_categoryid_prpties foreign key (category_id) references property_categories(id),
	constraint fk_homedetailsid_prpties foreign key (home_details_id) references home_details(id)
)


create table property_inquiry_statuses(
	id serial primary key,
	status_name varchar(60),
	decription varchar(200)
)

create table property_inquiries(
	id serial primary key,
	prpty_id int,
	inquiry_status_id int,
	created_at timestamptz,
	constraint fk_prptyid_prptyiqry foreign key (prpty_id) references properties(id) on delete cascade,
	constraint fk_iqrystatusid_prptyiqry foreign key (inquiry_status_id) references property_inquiry_statuses(id)
)

alter table property_inquiries add column user_id int;
alter table property_inquiries add constraint fk_userid_prptyiqry foreign key (user_id) references users(id) on delete cascade

create table tour_inquiry_statuses(
	id serial primary key,
	status_name varchar(60),
	descripiton varchar(200)
)

create table tour_inquiries(
	id serial primary key,
	user_id int,
	prpty_id int,
	tour_inquiry_status_id int,
	tour_time time,
	tour_date date,
	constraint fk_prptyid_touriqry foreign key (prpty_id) references properties(id) on delete cascade,
	constraint fk_userid_touriqry foreign key (user_id) references users(id) on delete cascade,
	constraint fk_touriqrystatusid_touriqry foreign key (tour_inquiry_status_id) references tour_inquiry_statuses(id)
)

create table saved_searches(
	id serial primary key,
	user_id int,
	filters varchar(300),
	constraint fk_userid foreign key (user_id) references users(id) on delete cascade
)

create table property_categories(
	id serial primary key,
	category_name varchar(60),
	description varchar(200)
)

create table saved_properties(
	id serial primary key,
	user_id int,
	property_id int,
	constraint fk_userid_savedprpties foreign key(user_id) references users(id) on delete cascade,
	constraint fk_propertyid_savedprpties foreign key(property_id) references properties(id) on delete cascade
)

create table property_types(
	id serial primary key,
	property_type varchar(80),
	description varchar(200)
)

create table home_categories(
	id serial primary key,
	home_category varchar(120),
	description varchar(200)
)

create table home_details(
	home_details_id varchar(60),
	home_category_id int,
	num_of_beds int,
	num_of_bathrooms int,
	internal_features varchar(500),
	external_features varchar(500),
	constraint fk_homecategoryid_homedetails foreign key (home_category_id) references home_categories(id)
)

create table infrastructure_types(
	id serial primary key,
	infrastructure_type varchar(120),
	description varchar(500)
)

create table important_facilities(
	id serial primary key,
	infrastructure_name varchar(120),
	infrastructure_type_id int,
	nbhd_id int,
	constraint fk_infrastrucuturetypeid_iptfclties foreign key (infrastructure_type_id) references infrastructure_types(id),
	constraint fk_nbhdid_iptfclties foreign key(nbhd_id) references neighborhoods(id) on delete cascade
)