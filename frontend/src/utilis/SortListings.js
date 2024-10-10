const sortListings = (listings) => {
    let i = 0;
    while (i < listings.length) {
      for (let j = 0; j < listings.length; j++){
        let temp = listings[j];
        console.log(`${listings[j].prpty_price} ${listings[j+1].prpty_price}`)
        if (Number(listings[j].prpty_price) > Number(listings[j+1].prpty_price)) {
          listings[j] = listings[j+1];
          listings[j+1] = temp;
        } 
      }
      i ++;
    }
    return listings;
}

export default sortListings;