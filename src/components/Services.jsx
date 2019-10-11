import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "Free Cocktails",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, magni!"
      },
      {
        icon: <FaHiking />,
        title: "Endless Hiking",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, magni!"
      },
      {
        icon: <FaShuttleVan />,
        title: "Free Shuttle",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, magni!"
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, magni!"
      }
    ]
  };

  render() {
    const servicesItem = this.state.services.map((item, index) => {
      return (
        <article key={index} className="service">
          <span>{item.icon}</span>
          <h6>{item.title}</h6>
          <p>{item.info}</p>
        </article>
      );
    });
    return (
      <section className="services">
        <Title title="Services" />
        <div className="services-center">{servicesItem}</div>
      </section>
    );
  }
}

export default Services;
