import axios from "axios"
const path = require('path');
console.log('PATH URL:', __dirname + `../../.env`);
console.log('DIRNAME: ', __dirname);
console.log('PATH JOINED: ', path.join(__dirname, '../../.env'));
require("dotenv").config({path: __dirname + `../../.env`});

const STRAPI_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : 'https://face-mask-cms.herokuapp.com';
const TOKEN = process.env.STRAPI_API_TOKEN;
console.log('STRAPI_URL: ', STRAPI_URL);

const setNumMasks = async (id, newCount) => {
  await axios.put(`${STRAPI_URL}/products/${id}`, 
    { stock: newCount }, 
    { params: { token: TOKEN } }
  );
}

const getProducts = async () => {
  const { data } = await axios.get(`${STRAPI_URL}/products`);
  return data;
}

export async function handler(event, context) {
  const orderIdsStr = event.queryStringParameters.products.split(',');
  const orderIds = orderIdsStr.map(s => parseInt(s, 10));
  const products = await getProducts();

  const orderMap = {};
  orderIds.forEach(productId => {
    if(orderMap[productId]) {
      orderMap[productId]++;
    } else {
      orderMap[productId] = 1;
    }
  });

  const filtered = Object.entries(orderMap).filter(([id, count]) => !(
    products.find(p => p.id === id) 
    && products.find(p => p.id === id).stock >= count));
  if(filtered.length > 0) {
    return {
      status: 400,
      body: `One or more of your products cannot be found`,
    };
  }

  try {
    await Promise.all(Object.entries(orderMap).map(async ([id, count]) => {
      const newStock = products.find(p => p.id === id).stock - count;
      await setNumMasks(id, newStock);
    }));
  } catch(err) {
    return {
      status: 500,
      body: `An unknown error occured`
    }
  }

  return {
    statusCode: 200,
    body: 'Order successful!'
  }
}
