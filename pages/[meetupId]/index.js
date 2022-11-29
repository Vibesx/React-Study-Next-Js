import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
	const dummy_meetup = {
		id: "m1",
		image: "https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium",
		title: "A First Meetup",
		address: "Some Street 5, Some City",
		description: "Dummy Description",
	};
	return (
		<MeetupDetail
			image={dummy_meetup.image}
			title={dummy_meetup.title}
			address={dummy_meetup.address}
			description={dummy_meetup.description}
		></MeetupDetail>
	);
}

export async function getStaticPaths() {
	return {
		fallback: false,
		paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
	};
}

export async function getStaticProps(context) {
	// add our logic here
	const meetupId = context.params.meetupId;

	console.log(meetupId);

	return {
		props: {
			meetupData: {
				image: "https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium",
				id: "m1",
				title: "A First Meetup",
				address: "Some Street 5, Some City",
				description: "Dummy Description",
			},
		},
	};
}

export default MeetupDetails;
