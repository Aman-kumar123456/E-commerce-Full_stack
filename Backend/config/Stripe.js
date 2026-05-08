import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);

export default stripe;
