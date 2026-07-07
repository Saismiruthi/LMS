import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

//API Controller Function to Manage Clerk User with database

export const clerkWebhooks = async (req, res) => {
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const {data, type} = req.body

        switch(type) {
            case 'user.created' : {
                console.log("Webhook triggered");

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,

                };

                console.log("User date : ",userData)
                const user = await User.create(userData)
                console.log("Saved user:",user);
                return res.json({success: true});
            }
            case 'user.updated' : {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case 'user.deleted' : {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
        }
    }catch(error) {
        console.error("Webhook Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
    try {

        const sig = request.headers["stripe-signature"];

        const event = Stripe.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        console.log("Event Type:", event.type);

        switch (event.type) {

            case "payment_intent.succeeded": {

                const paymentIntent = event.data.object;

                console.log("Payment Intent ID:", paymentIntent.id);

                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id
                });

                console.log("Session Count:", session.data.length);
                console.dir(session, { depth: null });

                if (session.data.length === 0) {
                    throw new Error("No checkout session found.");
                }

                // Stop here temporarily
                break;
            }

            case "payment_intent.payment_failed":
                console.log("Payment Failed");
                break;

            default:
                console.log("Unhandled event:", event.type);
        }

        return response.json({ received: true });

    } catch (err) {

        console.log("========== WEBHOOK ERROR ==========");
        console.error(err);
        console.log("===================================");

        return response.status(500).json({
            success: false,
            message: err.message
        });
    }
};