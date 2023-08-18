import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import("../styles/home.css");

const Home = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch("http://localhost:3000/csvs");
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const deleteFile = async (id) => {
    try {
      await fetch(`http://localhost:3000/delete/${id}`, { method: "DELETE" });
      setFiles(files.filter((file) => file._id !== id));
      fetchUploadedFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleFileSelection = (event) => {
    setSelectedFile(event.target.files[0]); // Atualiza o arquivo selecionado
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) return; // Verifica se um arquivo foi selecionado

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      setSelectedFile(null); // cleans selected file after upload
      fetchUploadedFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <div className="nav-bar">
        <h1 className="title">CSV Upload</h1>
      </div>

      <div className="container">
        <div className="center-text">
          <h2 className="sub-title">Upload a File Here</h2>
          <p className="title-description">
            Reads CSV file and displays it content
          </p>
        </div>

        <form encType="multipart/form-data">
          <div className="input-container">
            <div className="choose-file-btn">
              <div className="inputFileOverlay">Choose File</div>
              <input
                type="file"
                id="csvFile"
                name="file"
                accept=".csv"
                onChange={handleFileSelection}
              />
            </div>
            <button className="upload-btn" onClick={handleFileUpload}>
              Upload
            </button>
          </div>
        </form>

        {selectedFile && (
          <div className="selected-file">
            <p>Selected File:</p>
            <p>{selectedFile.name}</p>
          </div>
        )}
      </div>

      <div className="files-list">
        <div className="list-center-text">
          <h2>Uploaded files</h2>
        </div>
        {files.length === 0 ? (
          <div className="no-file">No files to show!</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time (UTC)</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  <td>{file.fileName}</td>
                  <td>{new Date(file.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(file.createdAt).toLocaleTimeString()}</td>
                  <td>
                    <Link to={`/view/${file._id}`} className="view-link">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="/"
                      onClick={() => deleteFile(file._id)}
                      className="delete-link"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
