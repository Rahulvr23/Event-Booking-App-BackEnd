const tickets = require('../Models/ticketSchema');
const event = require("../Models/eventSchema");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.bookEvent = async (req, res) => {
  try {
    const { eventName, personName, number, amount } = req.body;
    const userId = req.payload;
    const { eid } = req.params;

    console.log(eid);
    const bookingEvent = await event.findOne({ eventName });

    if (!bookingEvent) {
      return res.status(404).json("Event not found");
    }

    if (bookingEvent.limit < number) {
      return res.status(202).json("Tickets Soldout");
    }
else{
    const lineItems = {
      price_data: {
        currency: "usd",
        product_data: {
          name: eventName,
        },
        unit_amount: Math.round(amount * 100),
      },
      quantity: number
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItems],
      mode: "payment",
      success_url: "http://localhost:3000/payment",
      cancel_url: "http://localhost:3000/cancel",
    });

    // Send response with session ID
    console.log(session);

  
      return res.status(200).json({ id: session.id,eventName,personName, number,userId,eid }); 
    
  
  }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json("Server error: " + error.message);
  }
}


exports.paymentsuccess=async(req,res)=>{
  const { eventName, personName, number, userId, eid } = req.body;
  const bookingEvent = await event.findOne({ eventName });
  const newlimit=bookingEvent.limit-number
console.log(bookingEvent);

  const UpdateEvent=await event.findByIdAndUpdate({_id:eid},{limit:newlimit},{new:true})
  console.log(UpdateEvent);
  await UpdateEvent.save()

  const newBooking = new tickets({eventName,personName, number,userId})
  await newBooking.save()
  console.log(newBooking);
  res.status(200).json("success")
}


exports.GetallBooking= async(req,res)=>{
  const allBooking = await tickets.find() 
  console.log(allBooking);
  try {
      if(allBooking){
          res.status(200).json(allBooking)
      }
      else{
          res.status(400).json("No data found")
      }
  } catch (error) {
      res.status(500).json(error.message)
  }
          }




















    exports.getUserBooking = async (req,res) => {
      
        const {reqBody} = req.params;
        console.log(reqBody);
        // Fetch user details based on userId
        const userBooking=await tickets.find({userId:reqBody})
              try {
                if (userBooking) {
                  console.log(userBooking);
                  res.status(200).json(userBooking)
                } else {
                  res.status(400).json("No data found")
                }
              } catch (error) {
                res.status(500).json(error.message)
              }
    
  };
  