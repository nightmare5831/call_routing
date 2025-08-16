Call Routing & Ping-Post System Specification (Twilio Version)
Overview
This system will integrate Twilio Voice with a custom dashboard + script to handle inbound campaign calls. The solution supports IVR-based automated routing and agent-assisted routing, with the ability to ping multiple buyer networks simultaneously (starting with Service Direct).
The system will ensure calls are routed to the highest-paying or best buyer, with full logging, reporting, and fallback logic when no buyers are available.

Option 1 – IVR Automated Routing (with Dashboard) (No Interaction Between Sales Agent & End User)
Flow
Incoming Call

Caller dials our campaign number hosted on Twilio.

IVR Interaction

Twilio Studio or TwiML IVR asks the caller for zip code and service type (Plumbing, Pest Control, etc.).

Caller input is captured via DTMF and sent via Twilio Voice Webhook to our custom script + dashboard.

Ping-Post to Networks

Script pings all integrated buyer networks simultaneously (not one by one).

Currently, only Service Direct is integrated, but future expansion must support multiple buyers.

Each network responds with:

Status (accepted/rejected)

Price (CPL)

DID or SIP number for call forwarding

Routing Decision

If at least one buyer accepts, the system selects the winning buyer (highest bid or predefined rule).

IVR/script then uses TwiML <Dial> or SIP transfer to forward the call to the provided DID/SIP.

Caller is connected seamlessly (no agent required).

If No Buyers Accept

Caller is routed to fallback handling:

Voicemail

In-house call center

Recorded message: “Sorry, we cannot help with your request at this time.”

Dashboard & Logging

Dashboard logs all events:

Incoming calls

Accepted calls (buyer, price details, ZIP Code, Service Type, Campaign/Source)

Rejected calls

Missed calls

Fallback cases

Dashboard must support filtering by date, service type, zip code, buyer, call status.


Option 2 – Agent Assisted Routing (Interaction Between Sales Agent & End User)
Flow
Incoming Call

Caller dials our campaign number.

Call goes directly to our sales agent via Twilio Programmable Voice.

Agent Interaction

While speaking with the caller, the agent opens the dashboard.

Agent enters caller’s zip code + service request.

Ping-Post to Networks

Script pings networks in real-time via API.

Networks respond with bid details:

Yes/No

Price (CPL)

DID or SIP number

Forwarding Options

Manual Mode – Agent clicks to forward call to winning buyer. This triggers a Twilio REST API call to bridge the call..

Auto Mode – If accepted, the system instantly bridges calls using TwiML <Dial> or SIP transfer.



🔄 Key Considerations
Multiple Buyers:
 Must support pinging multiple networks simultaneously and selecting the best offer.

Fallback Logic (IVR only):
 If no buyer accepts, call defaults to voicemail/in-house/recorded message.

No Buyers:
 Must log these cases for review in the dashboard.


🛠 Technical Requirements
Integration:

Twilio Programmable Voice + Webhooks for real-time call events.

Support for DID or SIP bridging using TwiML <Dial> or Conference API.

Call Data Capture:

Caller ID

Duration

Recording (via Twilio Call Recording API, if available)

Ping-Post API Flow:

Ping: Send service type + zip code → receive bids.

Post: Accept bid → receive DID/SIP.

Forward: Bridge call accordingly via Twilio API.

Dashboard Features:

Input fields (zip code, service type, source/campaign, service type).

Display buyer bids in real-time.

Logs & reporting of all calls.

Manual/auto forwarding options.


📊 Logs & Reporting
Must track all calls:

Incoming

Forwarded

Missed

Rejected

Fallback

Show buyer + price details for accepted calls.

Exportable reports (CSV/Excel).

Dashboard filters: date, zip code, service type, buyer, call status, campaign/source, price.

