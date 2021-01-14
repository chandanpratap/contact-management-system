import React from "react";
import "./ListItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItems = (props) => {
  return props.data.map((item, key) => (
    <div className="list" key={item.key}>
      <p>
        <input
          type="text"
          id={item.key}
          value={item.name}
          onChange={(e) => props.changeName(e.target.value, item.key)}
        />
        <span>
          <FontAwesomeIcon
            icon="trash"
            className="icon"
            onClick={() => props.deleteItem(key)}
          />
        </span>
      </p>
    </div>
  ));
};

export default ListItems;
