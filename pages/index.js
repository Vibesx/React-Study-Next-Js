import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_DATA = [
	{
		id: "m1",
		title: "A first meetup",
		image: "https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium",
		address: "Some Dummy Address",
		description: "This is a first meetup ",
	},
	{
		id: "m2",
		title: "A second meetup",
		image: "https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium",
		address: "Some Other Dummy Address",
		description: "This is a second meetup ",
	},
];

function HomePage(props) {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of local meetups"
				/>
			</Head>
			<MeetupList meetups={props.meetups}></MeetupList>
		</>
	);
}

// SSR:
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // out logic here

//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }

// SSG:
export async function getStaticProps(context) {
	// add our logic here
	const client = await MongoClient.connect(
		"mongodb+srv://leon:reactstudy@cluster0.wnqyjb3.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	// find with no arguments is like select *
	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.title,
				image: meetup.image,
				// the auto-generated MongoDB ID is an object named _id, which needs to be transformed into string
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	};
}

export default HomePage;
