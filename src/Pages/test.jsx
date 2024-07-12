// const express = require("express");
// const axios = require("axios");
// const cheerio = require("cheerio");
// const { Pool } = require("pg");
// const cors = require("cors");
// var qs = require("qs");
// const multer = require("multer");
// const bodyParser = require("body-parser");
// const { Twilio } = require("twilio");
// const stripe = require("stripe")(
//   "sk_test_51PPYvZ00XtpcZ0UFYPD5yGt9KHjH6MzhsCCgj12EukQfaLBm61oADrQq0oiNa923MPhdwEUgXSJB2JYJtg5w9PKr00nqb4rhER"
// ); // Replace 'your-secret-key' with your actual
// const OpenAIApi = require("openai");
// var natural = require("natural");
// var TfIdf = natural.TfIdf;
// var tfidf = new TfIdf();
// const app = express();
// app.use(cors());
// app.use(express.json());

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "Sai@12345",
//   database: "postgres",
//   port: 5432,
// });

// let textContextData = [];

// // const allUrls = ['https://www.mapcommunications.com/about-us/faq/'];

// const allUrls = [
//   "https://www.mapcommunications.com/pricing/",
//   "https://www.mapcommunications.com/services/",
//   "https://www.mapcommunications.com/about-us/faq/",
//   "https://www.mapcommunications.com/hitrust-certified/",
//   "https://www.mapcommunications.com/about-us/",
//   "https://www.mapcommunications.com/contact-us/",
//   "https://www.mapcommunications.com/about-us/careers/",
// ]; // replace with your URL

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const accountSid = "ACae8e41b99c90c7a52f875951ab09751b";
// const authToken = "02873418465840e811d3870b43db1196";
// const client = new Twilio(accountSid, authToken);
// let gptConversation = [];

// const openai = new OpenAIApi({
//   apiKey: "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",
// });

// //testing
// const apiKey = "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";

// //prod
// // const apiKey = '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';

// const { v4: uuidv4 } = require("uuid");

// const urls = "https://www.mapcommunications.com/pricing";

// let conversationState = {};
// let markedIndex = [];
// let scrapedContent = " ";


// app.use(express.json());

// app.post("/api/openai", async (req, res) => {
//   const { sessionId, userResponse } = req.body;

//   if (!sessionId) {
//     return res.status(400).json({ error: "Session ID is required" });
//   }

//   if (!conversationState[sessionId]) {
//     conversationState[sessionId] = {
//       step: 0,
//       name: "anonymous",
//       email: "anonymous",
//       contact: "anonymous",
//       userId: null,
//       conversationId: uuidv4(),
//       awaitingTicketConfirmation: false,
//     };

//     const userQuery = `
//             INSERT INTO chatusers (name, email, contact, conversationid, conversation_start) 
//             VALUES ($1, $2, $3, $4, NOW()) RETURNING id
//         `;
//     const userValues = [
//       "anonymous",
//       "anonymous",
//       "anonymous",
//       conversationState[sessionId].conversationId,
//     ];
//     const userResult = await pool.query(userQuery, userValues);
//     conversationState[sessionId].userId = userResult.rows[0].id;

//     gptConversation = [];

//     //Scrape the website content
//     // await axios.get(url)
//     // .then(response => {
//     //     var html = response.data;
//     //     html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
//     //     const $ = cheerio.load(html, { xmlMode: true });
//     //     let textArray = [];
//     //     $('body div').each((i, el) => {
//     //         textArray.push($(el).text());
//     //     });
//     //     scrapedContent = textArray.join(' ');
//     //     console.log("scrapedContent", scrapedContent);

//     // try {
//     //     const responses = await Promise.all(urls.map(url => axios.get(url)));
//     //     const htmlContents = responses.map(response => response.data);

//     //     htmlContents.forEach(html => {
//     //         html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
//     //         const $ = cheerio.load(html, { xmlMode: true });
//     //         let textArray = [];
//     //         $('body div').each((i, el) => {
//     //             textArray.push($(el).text());
//     //         });
//     //         scrapedContent += textArray.join(' ') + ' ';
//     //     });

//     // })
//     // .catch(console.error);
//     // } catch (error) {
//     //     console.error('Error scraping content:', error);
//     //     return res.status(500).json({ error: 'Error scraping content' });
//     // }
//   }

//   let highestDocument = 0;
//   let highestMeasureValue = 0;
  
//   tfidf.tfidfs(userResponse.content, function (i, measure) {
//     console.log("document #" + i + " is " + measure);
//     if (measure > highestMeasureValue) {
//       highestDocument = i;
//       highestMeasureValue = measure;
//     }
//   });
//   console.log("marked index",markedIndex)
//   if (markedIndex.length===0 || !markedIndex.includes(highestDocument)) {
//     markedIndex.push(highestDocument);
//     console.log("highest document" + highestDocument);

//     // Context message
//     const systemMessage = {
//       role: "system",
//       content:
//         "You are a world-class customer care representative for a company called Map Communications. " +
//         "You can use the following information to answer any questions." +
//         textContextData[highestDocument] +
//         '.You dont know anything that is not given in the above information. If not able to answer say I am not able to assist you at this point. If the user want to know about plans, prices, products give me answer with JSON format with addtional key {"category":"Leads"} else give me answer as {"category":"CS"}. Please do plan comparisions by monthly totals. For example, if the user needs 5 calls a day each call with 10 minutes duration. So, user totally needs 5*10*30 = 1500 minutes per month. The best plan for this user is premium plan as it gives 500 per month.' +
//         'If you are unable to answer please ask the user if they want you to create a support ticket. Give me answer in JSON format with additonal key {"supportTicket":false} and include this in every response. If user agrees to create support ticket by saying yes or anything similar to it, please send me the answer in JSON format with addtional key supportTicket as true and generate a summary of the user message that is not able to answer and add the summary content with additional key summary. It is mandatory for you to generate a summary to create a support ticket If user does not want to create a support ticket, please send supportTicket as false. If the user wants to create a support ticket, please collect name, phone number and email.Please collect phone number with phoneNumber key and send me the answer in JSON format with additional keys as {"name":"Test","email":"test@example.com","phoneNumber":"+1757555444"}. It is mandatory for you to collect these three details to create a support ticket. Always respond with a JSON object with the keys responseContent,category,supportTicket,name,email,phoneNumber,summary. The responseContent must be in string format.' +
//         'At the end of the conversation, generate a summary of the conversation. The summary should briefly encapsulate the user questions and the responses provided and send the answer in JSON format with an additional key {summary: "Text"}.',
//     };

//     gptConversation.push(systemMessage);
//   }
//   console.log("gpt conversation count" + gptConversation.length);
//   const state = conversationState[sessionId];

//   try {
//     let prompt;
//     if (state.awaitingTicketConfirmation) {
//       console.log("Checking for affirmative response:", userResponse.content);

//       const updateEndTimeQuery = `
//                 UPDATE chatusers
//                 SET conversation_end = NOW()
//                 WHERE id = $1
//             `;
//       await pool.query(updateEndTimeQuery, [state.userId]);
//       console.log("Updated conversation end time for user ID:", state.userId);

//       delete conversationState[sessionId];
//     } else {
//       switch (state.step) {
//         case 0:
//           console.log("state conversation id", state.conversationId);

//           // Log user response
//           await pool.query(
//             "INSERT INTO chatmessages (conversationid, message, role) VALUES ($1, $2, $3)",
//             [state.conversationId, userResponse.content, "user"]
//           );

//           gptConversation.push({ role: "user", content: userResponse.content });

//           // Send context message and user's response to OpenAI
//           const response = await axios.post(
//             "https://api.openai.com/v1/chat/completions",
//             {
//               model: "gpt-4-turbo",
//               messages: gptConversation,
//               response_format: { type: "json_object" },
//               temperature: 0.7,
//               //max_tokens: 1000,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${apiKey}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           console.log("token usage:", response.usage);
//           prompt = response.data.choices[0].message.content;
//           console.log("Prompt after context:", prompt);

//           let responseJson;
//           try {
//             responseJson = JSON.parse(prompt);
//           } catch (err) {
//             console.error("Error parsing JSON from OpenAI response:", err);
//             return res
//               .status(500)
//               .json({ error: "Error processing OpenAI response" });
//           }

//           const {
//             supportTicket,
//             category,
//             responseContent,
//             name,
//             email,
//             phoneNumber,
//             summary: responseSummary,
//           } = responseJson;
//           // const summary = responseJson.summary || null;

//           prompt = responseContent;

//           await pool.query(
//             "INSERT INTO chatmessages (conversationid, message, role) VALUES ($1, $2, $3)",
//             [state.conversationId, prompt, "ai"]
//           );

//           console.log("user id", state.userId);

//           const categoryQuery = `
//                         UPDATE chatusers SET category = $2 WHERE id = $1
//                     `;
//           await pool.query(categoryQuery, [state.userId, category]);

//           console.log("User response:", userResponse.content);

//           // Save the user response summary
//           // state.summary = userResponse.content;
//           // if (summary) {
//           //     state.summary = summary;
//           // } else {
//           //     state.summary = userResponse.content;
//           // }
//           state.summary = responseSummary || "No summary provided";

//           if (supportTicket && name && phoneNumber && email) {
//             console.log(
//               "Affirmative response detected. Creating support ticket..."
//             );
//             const updateUserDetailsQuery = `
//                             UPDATE chatusers
//                             SET name = $1, email = $2, contact = $3
//                             WHERE id = $4
//                          `;
//             const updateUserDetailsValues = [
//               name,
//               email,
//               phoneNumber,
//               state.userId,
//             ];
//             await pool.query(updateUserDetailsQuery, updateUserDetailsValues);

//             const ticketNumber = Math.floor(
//               100000 + Math.random() * 900000
//             ).toString();

//             // if (!summary) {
//             //     summary = userResponse.content;
//             // }

//             let summary =
//               responseSummary || userResponse.content || "No summary provided";

//             const ticketQuery = `
//                             INSERT INTO supporttickets (ticket_number, chatusers_id, summary, created_at, status) 
//                             VALUES ($1, $2, $3, NOW(), 'Pending') RETURNING ticket_number
//                         `;
//             const ticketValues = [ticketNumber, state.userId, state.summary];
//             const ticketResult = await pool.query(ticketQuery, ticketValues);
//             prompt = `Support ticket created successfully. Your ticket number is ${ticketResult.rows[0].ticket_number}.`;
//             console.log(
//               "Support ticket created:",
//               ticketResult.rows[0].ticket_number
//             );
//             await pool.query(
//               "INSERT INTO chatmessages (conversationid, message, role) VALUES ($1, $2, $3)",
//               [state.conversationId, prompt, "ai"]
//             );

//             CallTwilio(name, phoneNumber, ticketResult.rows[0].ticket_number);
//           }
//           break;

//         default:
//           prompt = "I am unable to assist with your query at this moment.";

//           // Set conversation end time if not already set
//           if (!state.conversationEndSet) {
//             const updateEndTimeQuery = `
//                             UPDATE chatusers
//                             SET conversation_end = NOW()
//                             WHERE id = $1
//                         `;
//             await pool.query(updateEndTimeQuery, [state.userId]);
//             console.log(
//               "Updated conversation end time for user ID:",
//               state.userId
//             );
//             state.conversationEndSet = true;
//           }
//           break;
//       }
//     }

//     res.json({ prompt });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// function CallTwilio(name, phone, ticketNumber) {
//   var message =
//     "Hello " +
//     name +
//     " , your support ticket " +
//     ticketNumber +
//     " has been created successfully. Please track the ticket status using this link";
//   var data = qs.stringify({
//     To: phone,
//     From: "+18559972544",
//     Parameters: '{ "order":"' + message + '"}',
//   });
//   var config = {
//     method: "post",
//     url: "https://studio.twilio.com/v2/Flows/FW2944fceeb5e800edc2fa8c7fa0ff4f6f/Executions",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     auth: {
//       username: "SK256492b51f241523dec4e8722e7e49f4",
//       password: "kqgoHfNQfY2BuTgYNsyqAkAnx2b311c7",
//     },
//     data: data,
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// // Reset conversation state periodically to avoid indefinite state retention
// // setInterval(() => {
// //     conversationState = {};
// // }, 50000);

// app.put("/api/updateTicketStatus", async (req, res) => {
//   const { ticket_number, status } = req.body;
//   try {
//     const result = await pool.query(
//       "UPDATE supporttickets SET status = $1 WHERE ticket_number = $2",
//       [status, ticket_number]
//     );
//     res.status(200).json({ message: "Ticket status updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating ticket status" });
//   }
// });

// app.get("/api/chatusersinfo", async (req, res) => {
//   try {
//     const query = `
//             SELECT chatusers.name, chatusers.email, chatusers.conversationid, chatusers.category, chatmessages.systemresponse, chatmessages.userresponse
//             FROM chatusers
//             JOIN chatmessages ON chatusers.conversationid = chatmessages.conversationid
//         `;
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching chat users info:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/chatuserscount", async (req, res) => {
//   try {
//     const query = `
//             SELECT COUNT(*) AS chat_users_count
//             FROM chatusers
//         `;
//     const result = await pool.query(query);
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error fetching chat users count:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/supportticketscount", async (req, res) => {
//   try {
//     const query = `
//             SELECT COUNT(*) AS support_tickets_count
//             FROM supporttickets
//         `;
//     const result = await pool.query(query);
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error fetching support tickets count:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/chatusersleadscount", async (req, res) => {
//   try {
//     const query = `
//             SELECT COUNT(*) AS leads_count
//             FROM chatusers
//             WHERE category = 'Leads'
//         `;
//     const result = await pool.query(query);
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error fetching leads count:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/suportTickets", async (req, res) => {
//   try {
//     const query = `
//         SELECT * FROM supporttickets join chatusers on supporttickets.chatusers_id = chatusers.id;
//         `;
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching chat users info:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/getMessages/:conversationId", async (req, res) => {
//   var conversationId = req.params.conversationId;
//   console.log("conversation id value" + conversationId);
//   try {
//     const query =
//       `SELECT * FROM chatmessages where conversationid ='` +
//       String(conversationId) +
//       `'`;
//     console.log("qeuery" + query);
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching chat users info:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/getConversations", async (req, res) => {
//   var conversationId = req.params.conversationId;
//   console.log("conversation id value" + conversationId);
//   try {
//     const query = `SELECT * FROM chatusers left join supporttickets on chatusers.id=supporttickets.chatusers_id`;
//     console.log("qeuery" + query);
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching chat users info:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/getBarChart", async (req, res) => {
//   var conversationId = req.params.conversationId;
//   console.log("conversation id value" + conversationId);
//   try {
//     const query = `SELECT count(*),date_trunc('day',conversation_start) FROM chatusers left join supporttickets on chatusers.id=supporttickets.chatusers_id group by date_trunc('day',conversation_start) order by date_trunc('day',conversation_start) ;`;
//     console.log("qeuery" + query);
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching chat users info:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const emailCheckQuery = "SELECT * FROM login WHERE email = $1";
//     const emailCheckResult = await pool.query(emailCheckQuery, [email]);

//     if (emailCheckResult.rows.length > 0) {
//       console.log("Email already exists:", email);
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     const sql =
//       "INSERT INTO login (name, email, password) VALUES ($1, $2, $3) RETURNING *";
//     const values = [req.body.name, req.body.email, req.body.password];
//     const result = await pool.query(sql, values);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("Error executing query", err.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const sql = "SELECT * FROM login WHERE email = $1 AND password = $2";
//     const values = [req.body.email, req.body.password];
//     const result = await pool.query(sql, values);
//     if (result.rows.length > 0) {
//       console.log("Login successful:", result.rows[0]);
//       res.json(result.rows[0]);
//     } else {
//       console.log("Invalid email or password:", email);
//       res.status(401).json({ error: "Invalid email or password" });
//     }
//   } catch (err) {
//     console.error("Error executing query", err.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Stripe payment intent endpoint
// app.post("/create-payment-intent", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000,
//       currency: "usd",
//     });

//     res.status(200).send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating payment intent", error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/api/products", upload.single("product_image"), async (req, res) => {
//   const { product_name, product_price, product_category, generated_text } =
//     req.body;
//   const product_image = req.file ? req.file.buffer : null;
//   const login_id = 1;

//   console.log("Received data:", {
//     product_name,
//     product_price,
//     product_category,
//     product_image_size: product_image ? product_image.length : "No image",
//   });

//   try {
//     const result = await pool.query(
//       "INSERT INTO storefront (login_id, product_name, product_price, product_category, product_image,generated_text) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *",
//       [
//         login_id,
//         product_name,
//         product_price,
//         product_category,
//         product_image,
//         generated_text,
//       ]
//     );
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error executing query", error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // app.get('/api/orders', async (req, res) => {
// //     try {
// //         const result = await pool.query('SELECT * FROM orders');
// //         res.json(result.rows);
// //     } catch (error) {
// //         console.error('Error fetching orders:', error);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });

// app.get("/api/products/dashboard", async (req, res) => {
//   try {
//     const result = await pool.query(`SELECT * from storefront`);
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/api/products", async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT * from storefront where sale is Null ORDER BY created_at DESC`
//     );
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/api/products/:loginid", async (req, res) => {
//   const login_id = req.params.loginid;
//   try {
//     const result = await pool.query(
//       "SELECT * from storefront where login_id=" +
//         login_id +
//         "ORDER BY created_at DESC"
//     );
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/api/sale/products", async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT * from storefront where sale = true`
//     );
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/api/orders", async (req, res) => {
//   try {
//     const result = await pool.query(`
//             SELECT orders.id, orders.*, login.name as customer_name,orderItems.*,storefront.* 
//             FROM orders 
//             JOIN orderItems on orders.id = orderItems.order_id
//             JOIN login ON orders.login_id = login.id  
//             JOIN storefront ON orderItems.product_id = storefront.id
//             ORDER BY orders.date DESC
//         `);
//     console.log(result.rows);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/orders/:loginId", async (req, res) => {
//   const loginID = req.params.loginId;
//   try {
//     const result = await pool.query(
//       "SELECT orders.login_id as purchasedLoginId, orders.*, login.name as customer_name, orderItems.*,storefront.* FROM orders JOIN orderItems on orders.id = orderItems.order_id JOIN login ON orders.login_id = login.id JOIN storefront ON orderItems.product_id = storefront.id where storefront.login_id =" +
//         loginID +
//         " and orders.login_id !=" +
//         loginID +
//         " ORDER BY orders.date desc"
//     );
//     console.log(result.rows);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // app.get('/api/orders/:orderId/soldCount', async (req, res) => {
// //     const { orderId } = req.params;
// //     try {
// //         // product_id with the given orderId
// //         const productResult = await pool.query(`
// //             SELECT product_id
// //             FROM orderItems
// //             WHERE order_id = $1
// //         `, [orderId]);

// //         if (productResult.rows.length === 0) {
// //             return res.status(404).json({ error: 'Order not found' });
// //         }

// //         const productId = productResult.rows[0].product_id;

// //         // Count the number of sold items for this product_id
// //         const countResult = await pool.query(`
// //             SELECT COUNT(*) as soldCount
// //             FROM orderItems
// //             WHERE product_id = $1
// //         `, [productId]);

// //         if (countResult.rows.length > 0) {
// //             res.json(countResult.rows[0]);
// //         } else {
// //             res.status(404).json({ error: 'No sold items found' });
// //         }
// //     } catch (error) {
// //         console.error('Error fetching sold count:', error);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });

// app.post("/api/orders", async (req, res) => {
//   console.log("insert orders", req);
//   const {
//     login_id,
//     order_amount,
//     product_id,
//     fullName,
//     address,
//     phoneNumber,
//     city,
//     zipcode,
//     country,
//   } = req.body;
//   console.log("insert orders" + order_amount);

//   //const login_id = 1
//   try {
//     const result = await pool.query(
//       "INSERT INTO orders (login_id, date, amount,full_name,address,phone_number,city,zipcode,country) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
//       [
//         login_id,
//         new Date(),
//         order_amount,
//         fullName,
//         address,
//         phoneNumber,
//         city,
//         zipcode,
//         country,
//       ]
//     );
//     console.log("order result" + result.rows[0]);
//     //res.json(result.rows[0]);

//     const orderItemsResult = await pool.query(
//       "INSERT INTO orderItems (order_id,product_id,product_price) VALUES ($1,$2,$3) RETURNING *",
//       [result.rows[0].id, product_id, order_amount]
//     );
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error executing query", error.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/api/make-call", async (req, res) => {
//   const { orderId } = req.body;

//   try {
//     const result = await pool.query(
//       "SELECT phone_number FROM orders WHERE id = $1",
//       [orderId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).send("Order not found");
//     }

//     const phoneNumber = result.rows[0].phone_number;

//     // Create the call with Twilio
//     client.calls
//       .create({
//         twiml:
//           "<Response><Say>Your order has been placed successfully!</Say></Response>",
//         to: phoneNumber,
//         from: "+17579942304",
//       })
//       .then((call) => res.status(200).send(call.sid))
//       .catch((error) => res.status(500).send(error));
//   } catch (error) {
//     console.error("Database query error:", error);
//     res.status(500).send("Server error");
//   }
// });

// //   // Endpoint to save chatbot user details
// //   app.post('/api/saveUser', async (req, res) => {
// //     const { name, email } = req.body;

// //     console.log('Received data:', { name, email });

// //     try {
// //         const result = await pool.query(
// //             'INSERT INTO ChatbotUsers (name, email) VALUES ($1, $2) RETURNING *',
// //             [name, email]
// //         );
// //         console.log('User details saved:', result.rows[0]);
// //         res.status(201).json(result.rows[0]);
// //     } catch (error) {
// //         console.error('Error saving user details', error.stack);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // });

// var loadedDocuments = [];
// async function processUrls(urls) {
//   for (const url of urls) {
//     console.log("test context url order" + url);
//     await axios
//       .get(url)
//       .then((response) => {
//         var html = response.data;
//         html = html.replace(
//           /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
//           ""
//         );
//         const $ = cheerio.load(html, { xmlMode: true });
//         let textArray = [];
//         $("body div").each((i, el) => {
//           textArray.push($(el).text());
//         });
//         let textContext = textArray.join(" ");
//         if(url.includes('pricing')){
//             textContext+="All provided plan minutes are per month.For monthly calculations, use 30 days as standard.If user provides minutes per day, multiply it with 30 to get monthly minutes.";
//         }
//         textContextData.push(textContext);
//         //console.log("test context"+textContext);
//         tfidf.addDocument(textContext);
//         //getOpenAi(textContext);
//       })
//       .catch(console.error);
//   }
// }

// processUrls(allUrls)
//   .then(() => {
//     console.log("Processing complete.");
//     setTimeout(() => {
//       let userQuery = "Do I need to sign long term contract";
//       //    let highestDocument = 0;
//       //    tfidf.tfidfs(userQuery, function(i, measure) {
//       //        console.log('document #' + i + ' is ' + measure);
//       //        if(measure > tfidf.tfidfs(highestDocument)){
//       //            highestDocument = i;
//       //        }
//       //    });
//       //console.log('highest document is '+textContextData[highestDocument]);
//       //getOpenAi(textContextData[highestDocument],userQuery);
//     }, 1000);
//   })
//   .catch(console.error);

// const PORT = 5001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
