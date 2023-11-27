function openModal(src) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
  
    modal.style.display = "block";
    modalImg.src = src;
  
    var span = document.getElementsByClassName("close")[0];
  
    span.onclick = function() { 
      modal.style.display = "none";
    }
  }