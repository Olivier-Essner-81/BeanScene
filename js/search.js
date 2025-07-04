document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('input[placeholder="Search on site"]');
    if (!searchInput) return;

    // Create a results dropdown
    let resultsDiv = document.createElement('div');
    resultsDiv.className = "absolute bg-white border w-full z-50 mt-1 rounded shadow";
    resultsDiv.style.display = "none";
    searchInput.parentNode.appendChild(resultsDiv);

    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        resultsDiv.innerHTML = '';
        if (!query) {
            resultsDiv.style.display = "none";
            return;
        }
        const results = window.SEARCH_DATA.filter(item =>
            item.title.toLowerCase().includes(query)
        );
        if (results.length === 0) {
            resultsDiv.innerHTML = '<div class="p-2 text-gray-500">No results found.</div>';
        } else {
            results.forEach(item => {
                const link = document.createElement('a');
                link.href = item.url;
                link.className = "block p-2 hover:bg-gray-200 text-black";
                link.textContent = item.title;
                resultsDiv.appendChild(link);
            });
        }
        resultsDiv.style.display = "block";
    });

    // Hide results when clicking outside
    document.addEventListener('click', function (e) {
        if (!resultsDiv.contains(e.target) && e.target !== searchInput) {
            resultsDiv.style.display = "none";
        }
    });
});