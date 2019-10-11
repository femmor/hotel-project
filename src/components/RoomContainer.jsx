// import React from "react";
// import RoomFilter from "./RoomFilter.jsx";
// import RoomList from "./RoomList";
// import Title from "../components/Title";
// import { RoomConsumer } from "../context";
// import Loading from "./Loading";

// const RoomContainer = () => {
//   return (
//     <RoomConsumer>
//       {value => {
//         const { loading, sortedRooms, rooms } = value;
//         if (loading) {
//           return <Loading />;
//         }
//         return (
//           <section className="roomslist">
//             <Title title="Search Rooms" />
//             Hello from Room Container
//             <RoomFilter rooms={rooms} />
//             <RoomList rooms={sortedRooms} />
//           </section>
//         );
//       }}
//     </RoomConsumer>
//   );
// };

// export default RoomContainer;

import React from "react";
import RoomFilter from "./RoomFilter.jsx";
import RoomList from "./RoomList";
import Title from "../components/Title";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";

function RoomContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <section className="roomslist">
      <Title title="Search Rooms" />
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </section>
  );
}

export default withRoomConsumer(RoomContainer);
