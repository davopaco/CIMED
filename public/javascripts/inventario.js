    document.addEventListener("DOMContentLoaded", function () {
        const searchBox = document.getElementById("search-box"),
            tablaInv = document.getElementById("table-inv"),
            buttSearch = document.getElementById("button-search");
            rows = tablaInv.getElementsByClassName("filterable-row");

        searchBox.addEventListener("input", function () {
            const query = searchBox.value.toLowerCase();

            Array.from(rows).forEach(function (row) {
                const idCell = row.querySelector("td:nth-child(2)");
                const id = idCell.textContent.toLowerCase();

                if (id.includes(query)) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });