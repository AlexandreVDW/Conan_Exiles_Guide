// Charger les données depuis le fichier JSON
fetch('./json/pet.json')
  .then((response) => response.json())
  .then((data) => {
    const card = data;

    // Get references to the radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    // Add event listeners to radio buttons
    radioButtons.forEach((radio) => {
      radio.addEventListener('change', filterbabys);
    });

    // Function for sorting babies by name
    function sortpetByName() {
      card.sort((a, b) => a.baby.localeCompare(b.baby));
    }

    // Call the function to sort babies by name initially
    sortpetByName();

    // Call the filter function when the data is loaded
    filterbabys();

    // Function to filter and display the babies
    function filterbabys() {
      const selectedMap = getSelectedMap();

      // Remove all babies currently displayed
      const cardContainer = document.querySelector('.card_container');
      while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }

      // Filter and display the babies based on the selected map
      data.forEach((entry) => {
        if (selectedMap === 'all' || entry.map.includes(selectedMap)) {
          const card = document.createElement('div');
          card.classList.add('card');

          const cardheader = document.createElement('div');
          cardheader.classList.add('card-header');
          const babyName = document.createElement('h3');
          babyName.textContent = entry.baby;
          babyName.style.cursor = 'pointer'; // Add cursor pointer to make it look clickable

          // Event listener for opening the modal when baby name is clicked
          babyName.addEventListener('click', () => openBabyModal(entry));

          const cardfooter = document.createElement('div');
          cardfooter.classList.add('card-footer');
          const babyImage = document.createElement('img');
          babyImage.src = entry.baby_pict;
          babyImage.alt = entry.baby;

          cardheader.appendChild(babyName);
          cardfooter.appendChild(babyImage);
          card.appendChild(cardheader);
          card.appendChild(cardfooter);

          cardContainer.appendChild(card);
        }
      });
    }

    // Function to get the selected map from the radio buttons
    function getSelectedMap() {
      for (const radio of radioButtons) {
        if (radio.checked) {
          return radio.id;
        }
      }
      return 'all';
    }

    // Function to open the modal with baby details
    function openBabyModal(baby) {
      const modal = document.getElementById('babyModal');
      const babyName = document.getElementById('babyName');
      const babyDetailsTable = document.getElementById('babyDetails');

      babyName.textContent = baby.baby;

      // Clear previous details in the modal
      babyDetailsTable.innerHTML = '';

      // Create rows in the table for each detail
      for (let i = 0; i < baby.adult.length; i++) {
        const row = babyDetailsTable.insertRow(i);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.textContent = baby.adult[i];
        const img = document.createElement('img');
        img.src = baby.adult_pict[i];
        img.alt = baby.adult[i];
        cell2.appendChild(img);
        const food = document.createElement('img');
        food.src = baby.food[i];
        cell3.appendChild(food);
        cell4.textContent = `Probability: ${baby.Probability[i]}`;
      }

      modal.style.display = 'block';
    }

    // Event listener for closing the modal
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', function () {
      const modal = document.getElementById('babyModal');
      modal.style.display = 'none';
    });
  });
