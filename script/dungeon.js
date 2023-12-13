document.addEventListener('DOMContentLoaded', function () {
    // Données JSON
    fetch('./json/dungeon.json')
        .then((response) => response.json())
        .then((data) => {
            // Triez les données par level (Level)
            data.sort((a, b) => a.Level.localeCompare(b.Level));

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
            const headerCell3 = document.createElement('th');
            const headerCell4 = document.createElement('th');
            const headerCell5 = document.createElement('th');
            const headerCell6 = document.createElement('th');
            headerCell1.textContent = 'Nom';
            headerCell2.textContent = 'Localisation';
            headerCell3.textContent = 'Difficulté';
            headerCell4.textContent = 'Niveau Requis';
            headerCell5.textContent = 'Recettes à débloquer';
            headerCell6.textContent = 'Astuces';

            // Ajoutez les cellules d'en-tête à la ligne d'en-têtes
            headerRow.appendChild(headerCell1);
            headerRow.appendChild(headerCell2);
            headerRow.appendChild(headerCell3);
            headerRow.appendChild(headerCell4);
            headerRow.appendChild(headerCell5);
            headerRow.appendChild(headerCell6);

            // Ajoutez les données au tableau
            data.forEach((item, index) => {
                const row = table.insertRow(index + 1);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);
                cell1.textContent = item.Name;
                cell2.textContent = item.Where;
                cell3.textContent = item.Difficulty;
                cell4.textContent = item.Level;
                
                // Crée une liste pour les recettes
                const recipesList = document.createElement('ul');

                // Parcours les recettes et crée des éléments de liste
                item.Recipes.forEach((recipe) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = recipe;
                    recipesList.appendChild(listItem);
                });

                // Ajoute la liste des recettes à la cellule 5
                cell5.appendChild(recipesList);

                cell6.textContent = item.Tips;

            });

            // Ajoutez le tableau à la section avec la classe "attribute"
            const attributeSection = document.querySelector('.dungeon-list');
            attributeSection.appendChild(table);
        })
        .catch((error) => console.error('Erreur de chargement des données JSON:', error));
});
