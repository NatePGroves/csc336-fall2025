import { useState, useEffect } from "react";

function RandomImage() {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [imageID, setImageID] = useState(null);   // random ID stored here
  const [imageInfo, setImageInfo] = useState(null);

  
  useEffect(() => {
    if (imageID === null) return;  

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

  
  const handleSubmit = () => {
    const randomID = Math.floor(Math.random() * 1085);
    setImageID(randomID);
  };

  return (
    <div>
      <h1>Random Image</h1>

      <label>
        Width:
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </label>

      <label>
        Height:
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>

      <button onClick={handleSubmit}>Get Random Image</button>

      <div>
        {imageInfo ? (
          <>
            <h1>Image by {imageInfo.author}</h1>
            <img
              src={`https://picsum.photos/id/${imageID}/${width}/${height}`}
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

