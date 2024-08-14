const accesskey = "l9M0P-9lu6I0Dn8qd78BV_9WJvo8UIkq6SoAkxqzO9s";
        const searchForm = document.getElementById("search-form");
        const searchBox = document.getElementById("search-box");
        const searchResult = document.getElementById("search-result");
        const searchMoreBtn = document.getElementById("show-more-btn");

        let keyword = "";
        let page = 1;

        async function searchImages() {
            if (page === 1) {
                searchResult.innerHTML = ""; // Clear previous results for new search
            }

            keyword = searchBox.value;
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;
            const response = await fetch(url);
            const data = await response.json();
            const results = data.results;

            results.forEach((result) => {
                const image = document.createElement("img");
                image.src = result.urls.small;
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";
                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            });

            if (data.total_pages > page) {
                searchMoreBtn.style.display = "block";
            } else {
                searchMoreBtn.style.display = "none";
            }
        }

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            page = 1;
            searchImages();
        });

        searchMoreBtn.addEventListener("click", () => {
            page++;
            searchImages();
        });