async function style_site() {
  const sitename = 'demonlist';
  const confresponse = await fetch(`./${sitename}/conf.json`);
  const configs = await confresponse.json();

  const fontURL = configs.fontURL;
  const fontname = configs.fontname;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = fontURL;
  document.head.appendChild(link);

  document.body.style.fontFamily = `'${fontname}', ui-sans-serif, system-ui, sans-serif`;
}


async function customise_site() {
  const sitename = 'demonlist';
  const confresponse = await fetch(`./${sitename}/conf.json`);
  const configs = await confresponse.json();

  const username = configs.username;
  const usernamecontainer = document.getElementById("username");

  usernamecontainer.innerHTML = `
    <h1 class="text-5xl text-center font-bold">${username}'s Demonlist</h1>
  `;
}


async function get_demons() {
  const sitename = 'demonlist';
  const api_url = "https://gddlapi.srsxnsh.workers.dev";
  const confresponse = await fetch(`./${sitename}/conf.json`);
  const configs = await confresponse.json();

  const container = document.getElementById("demon-list");
  const userid = configs.userid;

  try {
    const response = await fetch(api_url, { headers: { "x-userid": userid }});
    const data = await response.json();

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
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("cant get demons lmao", err);
    container.innerHTML =
      "<p class='text-center'> Cant get demons [The request failed or Cloudflare is down]</p>";
  }
}


style_site();
customise_site();
get_demons();

