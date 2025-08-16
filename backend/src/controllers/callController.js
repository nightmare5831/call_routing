import Call from "../models/Call.js";

// Log new incoming call
export const logIncomingCall = async (req, res) => {
  try {
    const { callSid, from, to, zipCode, serviceType, campaign, source } = req.body;

    const call = await Call.create({
      callSid,
      from,
      to,
      zipCode,
      serviceType,
      campaign,
      source,
      status: "incoming",
    });

    res.status(201).json(call);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch call logs with filters
export const getCalls = async (req, res) => {
  try {
    const { status, zipCode, serviceType, buyer } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (zipCode) filter.zipCode = zipCode;
    if (serviceType) filter.serviceType = serviceType;
    if (buyer) filter.buyer = buyer;

    const calls = await Call.find(filter).sort({ createdAt: -1 });
    res.json(calls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
