import MeetupList from "../components/meetups/MeetupList";

const DUMMY_DATA = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium",
    address: "Some Dummy Address",
    description: "This is a first meetup ",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium",
    address: "Some Other Dummy Address",
    description: "This is a second meetup ",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups}></MeetupList>;
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

  return { props: { meetups: DUMMY_DATA }, revalidate: 10 };
}

export default HomePage;
