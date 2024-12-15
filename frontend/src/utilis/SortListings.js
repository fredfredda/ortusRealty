const sortListings = (listings, fieldName) => {
  let i = 0;
  while (i < listings.length - 1) {
    for (let j = 0; j < listings.length - 1; j++) {
      let temp = listings[j];
      if (
        Number( listings[j][fieldName] || 0 ) > Number( listings[j + 1][fieldName] || 0 )
      ) {
        listings[j] = listings[j + 1];
        listings[j + 1] = temp;
      }
    }
    i++;
  }
  return listings;
};

export default sortListings;