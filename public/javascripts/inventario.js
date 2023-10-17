document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("search-box"),
        tablaInv = document.getElementById("table-inv"),
        selectInv = document.getElementById("category-select");
    rows = tablaInv.getElementsByClassName("filterable-row");
    selectInv.addEventListener("change", function () {
        valueOfSelect = selectInv.value;
        if (valueOfSelect == 0) {
            console.log("Disabled")
            searchBox.disabled = true;
        } else {
            console.log("Not disabled")
            searchBox.disabled = false;
        }
    });
    searchBox.disabled = true;


    searchBox.addEventListener("input", function () {
        const query = searchBox.value.toLowerCase();

        Array.from(rows).forEach(function (row) {
            const idCell = row.querySelector(`td:nth-child(${valueOfSelect})`);
            const id = idCell.textContent.toLowerCase();

            if (id.includes(query)) {
                row.style.display = "table-row";
            } else {
                row.style.display = "none";
            }
        });
    });
});