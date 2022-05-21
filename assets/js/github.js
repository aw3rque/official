window.addEventListener('DOMContentLoaded', async function () {
    async function get(url) {
      const resp = await fetch(url);
      return resp.json();
    }
  
    const emojis = await get('https://api.github.com/emojis');
    const colors = await get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
  
    document.querySelectorAll('.github-card').forEach(async function (el) {
      const name = el.getAttribute('data-repo');
      const data = await get(`https://api.github.com/repos/${name}`);
      data.description = (data.description || '').replace(/:\w+:/g, function (match) {
        const name = match.substring(1, match.length - 1);
        const emoji = emojis[name];
  
        if (emoji) {
          return `<span><img src="${emoji}" style="width: 1rem; height: 1rem; vertical-align: -0.2rem;"></span>`;
        }
  
        return match;
      });
  
      el.innerHTML = `
              <div data-id="${data.full_name || 'NOT_FOUND'}" onclick="window.open('https://github.com/${data.full_name || "efe#1234"}')" class="github mt-2 p-3 rounded-lg">
                  <div class="github-left">
                      <div class="github-title">
                      <a style="color: gray !important">aw3rque/</a>${data.name || "Api Rate Limit or Data name not found. "}
                      </div>
                      <div class="github-sdescription mt-1">
                      <!--<span style="width: 12px; height: 12px; border-radius: 100%; background-color: ${data.language ? colors[data.language].color : ''}; display: inline-block; top: 1px; position: relative;"></span>-->
                      <span>${data.language || "Unknown Language"}</span> <span class="ml-1 mr-1">-</span> <span>${data.stargazers_count || "0"}</span> ⭐ <span class="ml-1 mr-1">•</span> <span>${data.forks || "0"}</span> ✍
                      </div>
                      <div class="github-description mt-1">
                      ${data.description || "Description not found."}
                      </div>
                  </div>
                  <div class="github-right">
                      <img draggable="false" class="project-right-img" width="50"
                          src="https://www.inflames.xyz/assets/img/github_grayscale.png" alt="GitHub">
                  </div>
              </div>
        `;
    });
  });