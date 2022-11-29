import { MongoClient } from "mongodb";

async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		// here we can use object destructuring to get the properties we expect from the request body
		//const { title, image, address, description } = data;

		const client = await MongoClient.connect(
			"mongodb+srv://leon:reactstudy@cluster0.wnqyjb3.mongodb.net/meetups?retryWrites=true&w=majority"
		);
		const db = client.db();

		const meetupsCollection = db.collection("meetups");

		const result = await meetupsCollection.insertOne(data);

		console.log(result);

		// error handling can be added with try/catch
		client.close();

		res.status(201).json({ message: "Meetup inserted!" });
	}
}

export default handler;
