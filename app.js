(async function () {
  const responce = await fetch("./receipe.json");
  const receipe = await responce.json();

  const inputelement = document.getElementById("searchInput");
  const btnelement = document.getElementById("searchBtn");
  const listelement = document.getElementById("recipe-list");
  const detailelement = document.getElementById("recipeDetailsContainer");

  function loadReceipeDetail(receipe) {
    detailelement.innerHTML = `
    <h2>${receipe.title}</h2>
    <div>${receipe.url}</div>
    <h3>Ingredient:</h3>
    <ul>${receipe.ingredients
      .map(function (ingredients) {
        return "<li>" + ingredients + "</li>";
      })
      .join("")}</ul>
      <h3>Instruction:</h3>
      <div>${receipe.instructions}</div>
    `;
  }

  function displaySearchResult(rslt) {
    listelement.innerHTML = "";
    rslt.forEach(function (receipe) {
      const li = document.createElement("li");
      // const listitem = `
      //     <div class="title>${receipe.title}/div>
      //     <div class="title>${receipe.description}/div>
      // `;
      li.innerHTML = receipe.title;
      li.addEventListener("click", function () {
        loadReceipeDetail(receipe);
      });
      listelement.appendChild(li);
    });
  }

  function search() {
    const query = inputelement.value;
    const rslt = receipe.filter(function (receipe) {
      return (
        receipe.title.toLowerCase().includes(query) ||
        receipe.ingredients.join(" ").toLowerCase().includes(query)
      );
    });

    displaySearchResult(rslt);
  }

  btnelement.addEventListener("click", search);
})();
