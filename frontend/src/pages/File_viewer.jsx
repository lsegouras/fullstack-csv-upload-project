import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/file_viewer.css";

const FileViewer = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/view/${id}`);
        const data = await response.json();
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    console.log(id);

    fetchData(id);
  }, [id]);

  const handleSearch = (event) => {
    if (!event.target.value) {
      setSearchTerm("");
      setFilteredData(data);
      return;
    }
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setFilteredData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.city.toLowerCase().includes(searchTerm) ||
          item.country.toLowerCase().includes(searchTerm) ||
          item.favorite_sport.toLowerCase().includes(searchTerm)
      )
    );
  };

  return (
    <div className="viewer-container">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="cards">
        {filteredData.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.name}</h3>
            <p>City: {item.city}</p>
            <p>Country: {item.country}</p>
            <p>Sport: {item.favorite_sport}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileViewer;
