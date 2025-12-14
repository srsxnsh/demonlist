async function style_site() {
  const confresponse = await fetch("conf.json");
  const configs = await confresponse.json();

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = configs.fontURL;
  document.head.appendChild(link);

  document.body.style.fontFamily = `'${configs.fontname}', ui-sans-serif`;

  const targettheme = configs.theme;
  try {
  const themeresponse = await fetch(`./themes/${targettheme}.json`);
  if (!themeresponse.ok) {throw new Error('lmao i couldnt find the theme, defaulting to dracula');}

  const theme = await themeresponse.json();
  const root = document.documentElement;
  const ignore = ['name', 'creator'];
  for (const [key, value] of Object.entries(theme)) {
      if (ignore.includes(key)) {
        continue;
      }

      root.style.setProperty(`--${key}`, value);
    }
  } catch (err) {
    console.error(`Theme load failed: ${configs.theme}`, err);
  }

}

async function customise_site() {
  const confresponse = await fetch("conf.json");
  const configs = await confresponse.json();

  document.getElementById("username").innerHTML = `
    <h1 class="text-5xl text-center font-bold">${configs.username}'s Demonlist</h1>
  `;
}

async function get_demons() {
  const confresponse = await fetch("conf.json");
  const configs = await confresponse.json();

  const userid = configs.userid;
  const container = document.getElementById("demon-list");

  try {
    const response = await fetch("https://gddlapi.srsxnsh.workers.dev", {
      headers: { "x-userid": userid }
    });

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
        <p class="text-center text-sm"><strong>GDDL Rating:</strong> ${demon.Rating.toFixed(1)}</p>
        <p class="text-center text-sm"><strong>Enjoyment:</strong> ${sub.Enjoyment}</p>
        <p class="text-center text-sm"><strong>Date:</strong> ${date}</p>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("cant get demons lmao", err);
    container.innerHTML = "<p class='text-center'>Cant get demons :(</p>";
  }
}

style_site();
customise_site();
get_demons();

