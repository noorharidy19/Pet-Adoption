
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const petName = urlParams.get("name");
  const petNameField = document.getElementById("pet-name");

  if (petName && petNameField) {
    petNameField.value = petName;
  }

  document.getElementById("adoption-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Simulate sending data
    document.getElementById("success-message").style.display = "block";
    this.reset();
    petNameField.value = petName;
  });
});