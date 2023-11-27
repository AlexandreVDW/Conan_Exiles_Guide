document.addEventListener('DOMContentLoaded', function () {
    // Données JSON
    fetch('https://alexandrevdw.github.io/conan_pet/json/effect.json')
        .then((response) => response.json())
        .then((data) => {
            // Triez les données par effet (effect)
            data.sort((a, b) => a.effect.localeCompare(b.effect));

            // Créez le tableau HTML
            const table = document.createElement('table');

            // Créez la section d'en-tête
            const thead = document.createElement('thead');
            table.appendChild(thead);

            // Créez la première ligne d'en-têtes
            const headerRow = thead.insertRow(0);

            // Créez les cellules d'en-tête
            const headerCell1 = document.createElement('th');
            const headerCell2 = document.createElement('th');
            headerCell1.textContent = 'Effet';
            headerCell2.textContent = 'Description';

            // Ajoutez les cellules d'en-tête à la ligne d'en-têtes
            headerRow.appendChild(headerCell1);
            headerRow.appendChild(headerCell2);

            // Ajoutez les données au tableau
            data.forEach((item, index) => {
                const row = table.insertRow(index + 1);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.textContent = item.effect;
                cell2.textContent = item.description;

                // Ajoutez la classe "effect-cell" à la cellule de l'effet
                cell1.classList.add('effect-cell');
            });

            // Ajoutez le tableau à la section avec la classe "attribute"
            const attributeSection = document.querySelector('.attribute');
            attributeSection.appendChild(table);
        })
        .catch((error) => console.error('Erreur de chargement des données JSON:', error));
});
