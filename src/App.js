import React from "react";
import "./App.css";
import ListItems from "./components/ContactList/";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import WebcamCapture from "./components/ContactList/Camera";
library.add(faTrash);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      data: [],
      filterData: [],
      query: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputChange = (event) => {
    const query = event.target.value;

    this.setState((prevState) => {
      const filteredData = prevState.data.filter((element) => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      this.setState({ filterData: filteredData, query: query });
    });
  };

  addData = (e) => {
    e.preventDefault();
    let newData = { name: this.state.inputValue, key: Date.now() };
    this.setState((prevState) => ({
      data: [...prevState.data, newData],
      filterData: [...prevState.filterData, newData],
    }));
    this.setState({ inputValue: "" });
  };

  deleteItem = (id) => {
    const filterData = this.state.data.filter((item, key) => key !== id);

    this.setState({ data: filterData, filterData: filterData });
  };

  changeName = (name, key) => {
    const data = this.state.data;
    data.map((item) => {
      if (item.key === key) {
        item.name = name;
      }
    });
    this.setState({ data: data, filterData: data });
  };

  render() {
    return (
      <div className="App">
        <WebcamCapture />
        <div className="searchForm">
          <div className="add-button">
            <form id="add-item">
              <input
                placeholder="Search for..."
                value={this.state.query}
                onChange={this.handleInputChange}
              />
            </form>
          </div>
        </div>
        <header>
          <form id="add-item" onSubmit={this.addData}>
            <input
              type="text"
              placeholder="enter text"
              value={this.state.inputValue}
              onChange={this.changeHandler}
            />
            <button type="submit">+Add</button>
          </form>
        </header>
        <ListItems
          data={this.state.filterData}
          changeName={this.changeName}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}
