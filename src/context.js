import React, { Component } from "react";
// import items from "./data";
import Client from "./Contentful";

// Client.getEntries({
//   content_type: "hotelResortRoom"
// }).then(response => console.log(response.items));

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  // getData
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "hotelResortRoom",
        /* order: "sys.createdAt" */
        order: "-fields.price"
      });

      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    // All the rooms
    let filteredRooms = [...rooms];

    // Transform values
    capacity = parseInt(capacity);
    price = parseInt(price);

    // Filter by type
    if (type !== "all") {
      filteredRooms = filteredRooms.filter(room => room.type === type);
    }

    // Filter by capacity
    if (capacity !== 1) {
      filteredRooms = filteredRooms.filter(room => room.capacity >= capacity);
    }

    // Filter by price
    filteredRooms = filteredRooms.filter(room => room.price <= price);

    // Filter by Size
    filteredRooms = filteredRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    // Filter by Breakfast
    if (breakfast) {
      filteredRooms = filteredRooms.filter(room => room.breakfast === true);
    }

    // Filter by Pets
    if (pets) {
      filteredRooms = filteredRooms.filter(room => room.pets === true);
    }

    // Change State
    this.setState({
      sortedRooms: filteredRooms
    });
  };

  componentDidMount() {
    this.getData();
  }

  formatData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
