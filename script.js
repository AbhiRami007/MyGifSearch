async function getGif() {
  const gif = document.getElementById("searchInput").value;
  const url = `https://api.giphy.com/v1/gifs/random?api_key=MLLnU7hewcbovOXMhYzooC7neoCLB3qg&tag=${gif}`;

  const response = await fetch(url)
    .then(function (response) {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error("Failed to fetch GIF. Please try again.");
      }
    })
    .then(function (jsonData) {
      let gifUrl = jsonData.data.images.original.url;
      //create gif on web page
      const gifContainer = document.getElementById("gifContainer");
      let gif = document.createElement("img");
      gif.setAttribute("src", gifUrl);
      gif.classList.add("gif");
      gifContainer.appendChild(gif);

      let gifTitle = jsonData.data.title;
      let caption = document.createElement("h3");
      caption.classList.add("caption");
      caption.innerHTML = gifTitle;
      gifContainer.appendChild(caption);
    })
    .catch(function (error) {
      const errorContainer = document.getElementById("errorContainer");
      errorContainer.textContent = "";
      errorContainer.textContent = error.message;
      console.log("There was a problem", error);
    });
}

function clearAllGifs() {
  let gifs = document.querySelectorAll(".gif");
  let captions = document.querySelectorAll(".caption");
	const errorContainer = document.getElementById("errorContainer");
	errorContainer.textContent = "";
  gifs.forEach((gif) => gif.remove());
  captions.forEach((caption) => caption.remove());
}
