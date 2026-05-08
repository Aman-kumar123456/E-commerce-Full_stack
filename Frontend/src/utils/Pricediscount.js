export const Pricediscount = (price, discount) => {
  const totaldiscountAmount = (Number(price) * Number(discount)) / 100;
  const actualamountprice = Number(price) - Number(totaldiscountAmount);
  return actualamountprice;
};