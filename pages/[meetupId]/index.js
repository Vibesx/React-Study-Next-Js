import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
	// const dummy_meetup = {
	// 	id: "m1",
	// 	image: "https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium",
	// 	title: "A First Meetup",
	// 	address: "Some Street 5, Some City",
	// 	description: "Dummy Description",
	// };
	return (
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta
					name="description"
					content={props.meetupData.description}
				/>
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			></MeetupDetail>
		</Fragment>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		"mongodb+srv://leon:reactstudy@cluster0.wnqyjb3.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	// find can take two arguments, the first being a filter, the second being a selection of fields we want to return
	// leaving the filter empty returns all items
	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	return {
		fallback: false,
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id,
			},
		})),
	};
	// return {
	// 	fallback: false,
	// 	paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
	// };
}

export async function getStaticProps(context) {
	// add our logic here
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		"mongodb+srv://leon:reactstudy@cluster0.wnqyjb3.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();

	const meetupsCollection = db.collection("meetups");

	// we can use findOne to return one entity based on our filter, which will be in the form of an object
	// also, because MongoDB expects a special object as id, we need to import ObjectId and cast our id to this ObjectId before using it inside a filter
	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	});

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	};

	// return {
	// 	props: {
	// 		meetupData: {
	// 			image: "https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium",
	// 			id: "m1",
	// 			title: "A First Meetup",
	// 			address: "Some Street 5, Some City",
	// 			description: "Dummy Description",
	// 		},
	// 	},
	// };
}

export default MeetupDetails;
