
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("articleSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const clearButton = document.getElementById("clearSearch");
  const resultsCount = document.getElementById("resultsCount");
  const noResults = document.getElementById("noResults");
  const articleGrid =
  document.getElementById("articleGrid") ||
  document.querySelector(".articles");

  // Only run on pages that contain the article search.
  if (
    !searchInput ||
    !categoryFilter ||
    !clearButton ||
    !resultsCount ||
    !noResults ||
    !articleGrid
  ) {
    return;
  }

  const articles = Array.from(
    articleGrid.querySelectorAll(".article-card")
  );

  function filterArticles() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    let visibleCount = 0;

    articles.forEach(function (article) {
      const titleAndText = article.textContent.toLowerCase();
      const extraKeywords = (
        article.dataset.search || ""
      ).toLowerCase();

      const category = article.dataset.category || "";

      const matchesSearch =
        query === "" ||
        titleAndText.includes(query) ||
        extraKeywords.includes(query);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const isVisible = matchesSearch && matchesCategory;

      article.hidden = !isVisible;

      if (isVisible) {
        visibleCount++;
      }
    });

    resultsCount.textContent =
      visibleCount + (visibleCount === 1
        ? " guide found"
        : " guides found");

    noResults.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", filterArticles);

  categoryFilter.addEventListener("change", filterArticles);

  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    categoryFilter.value = "all";
    filterArticles();
    searchInput.focus();
  });

  // Show the correct initial result count.
  filterArticles();

  console.log("Know Your PC search is ready!");
});
