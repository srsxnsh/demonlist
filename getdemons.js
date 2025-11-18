async function get_demons() {
  
  const container = document.getElementById("demon-list");
  const api_url = "https://gdladder.com/api/user/32102/submissions?sort=levelRating&sortDirection=desc";
  
  try {
    const response = await fetch(api_url);
    const data = await response.json();

    container.innerHTML = "";

    data.submissions.forEach(sub => {
      const demon = sub.Level;
      const meta = demon.Meta;
      const date = new Date(sub.DateAdded).toLocaleDateString();
      const card = document.createElement("div");
      card.className = "p-4 rounded-lg shadow-md border";
      card.innerHTML = `
        <h2 class="text-2xl font-bold mb-1">${meta.Name}</h2>
        <div class="text-sm space-y-1">
          <p><strong>GDDL Rating:</strong> ${meta.Difficulty}</p>
          <p><strong>Enjoyment:</strong> ${sub.Enjoyment}</p>
          <p><strong>Date:</strong> ${date}</p>
        </div>
      `;

      container.appendChild(card);
    });


  } catch (err) {
    console.error("cant get demons lmao", err);
    container.innerHTML = "<p class='text-center'> Cant get demons [API request failed :( ] </p>";
  }

}

get_demons();
