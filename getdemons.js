async function get_demons() {
  
  const confresponse = await fetch("/demonlist/conf.json")
  const configs = await confresponse.json();
  console.log(configs);

  const container = document.getElementById("demon-list");
  const usernamecontainer = document.getElementById("username")
  const api_url = "https://gddlapi.srsxnsh.workers.dev";

  const userid = configs.userid;
  const username = configs.username;
  console.log(userid);

  const fontURL = configs.fontURL;
  const fontname = configs.fontname;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = fontURL;
  document.head.appendChild(link);

  document.body.style.fontFamily = `'${fontname}', ui-sans-serif, system-ui, sans-serif`;

  usernamecontainer.innerHTML = `
    <h1 class="text-5xl text-center text-bold"> ${username}'s Demonlist </h1> 
    `;

  
  try {
    const response = await fetch(api_url, {headers: {"x-userid": userid}});
    const data = await response.json();
    console.log(data);

    container.innerHTML = "";

    data.submissions.forEach(sub => {
      const demon = sub.Level;
      const meta = demon.Meta;
      const date = new Date(sub.DateAdded).toLocaleDateString();
      const card = document.createElement("div");
      card.className = "p-4 rounded-lg shadow-md border";
      card.innerHTML = `
        <h2 class="text-center text-2xl font-bold mb-1">${meta.Name}</h2>
        <div class="text-center text-sm space-y-1">
          <p><strong>GDDL Rating:</strong> ${demon.Rating.toFixed(1)}</p>
          <p><strong>Enjoyment:</strong> ${sub.Enjoyment}</p>
          <p><strong>Date:</strong> ${date}</p>
        </div>
        <br>
      `;

      container.appendChild(card);
    });


  } catch (err) {
    console.error("cant get demons lmao", err);
    container.innerHTML = "<p class='text-center'> Cant get demons [The request failed, or cloudflare might be down :( ] </p>";
  }

}

get_demons();

