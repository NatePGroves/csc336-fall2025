import { useState, useEffect } from "react";

function RandomImage() {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [imageID, setImageID] = useState(null);   // random ID stored here
  const [imageInfo, setImageInfo] = useState(null);

  // Whenever imageID changes, fetch JSON metadata
  useEffect(() => {
    if (imageID === null) return;  // ignore initial render

    fetch(`https://picsum.photos/id/${imageID}/info`)
      .then(res => {
        if (!res.ok) throw new Error("Invalid image ID");
        return res.json();
      })
      .then(data => {
        setImageInfo(data);
      })
      .catch(err => {
        setImageInfo(null);
      });
  }, [imageID]);

  // When user clicks submit:
  // Generate random ID (0-1084) + trigger useEffect
  const handleSubmit = () => {
    const randomID = Math.floor(Math.random() * 1085);
    setImageID(randomID);
  };

  return (
    <div>
      <h2>Random Picsum Image</h2>

      <label>
        Width:
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </label>
      <br />

      <label>
        Height:
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
      <br />

      <button onClick={handleSubmit}>Get Random Image</button>

      <div style={{ marginTop: "20px" }}>
        {imageInfo ? (
          <>
            <h3>Image by {imageInfo.author}</h3>

            <img
              src={`https://picsum.photos/id/${imageID}/${width}/${height}`}
              alt="random picsum"
            />

            <p>Random ID: {imageID}</p>
            <p>Original Width: {imageInfo.width}</p>
            <p>Original Height: {imageInfo.height}</p>
          </>
        ) : (
          <p>Click "Get Random Image" to begin.</p>
        )}
      </div>
    </div>
  );
}

export default RandomImage;

