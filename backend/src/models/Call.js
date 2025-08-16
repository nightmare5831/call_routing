// src/models/Call.js
import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    // Twilio info
    callSid: { type: String, required: true, unique: true }, // Twilio Call SID
    from: { type: String, required: true },                  // Caller phone number
    to: { type: String, required: true },                    // Campaign number
    duration: { type: Number, default: 0 },                  // Call duration (seconds)
    recordingUrl: { type: String },                          // Recording link (optional)

    // Caller input
    zipCode: { type: String },                               // Entered ZIP code
    serviceType: { type: String, enum: ["Plumbing", "Pest Control", "HVAC", "Other"] }, 

    // Campaign metadata
    campaign: { type: String },                              // Campaign/Source identifier
    source: { type: String },                                // Traffic source if any

    // Buyer info (if forwarded)
    buyer: { type: String },                                 // e.g. "Service Direct"
    buyerPrice: { type: Number },                            // CPL / Bid price
    buyerNumber: { type: String },                           // DID or SIP number forwarded to

    // Call status
    status: { 
      type: String, 
      enum: ["incoming", "accepted", "rejected", "missed", "fallback"], 
      default: "incoming" 
    },

    // Ping-post logs
    pingResponse: { type: mongoose.Schema.Types.Mixed },     // Raw ping response JSON
    postResponse: { type: mongoose.Schema.Types.Mixed },     // Raw post response JSON

  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Call = mongoose.model("Call", callSchema);

export default Call;
