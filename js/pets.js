
        let pets = [
            { name: 'Buddy', breed: 'Labrador', age: 3, color: 'Golden', status: 'Available' },
            { name: 'Luna', breed: 'Beagle', age: 2, color: 'Brown/White', status: 'Adopted' }
        ];
        let editIndex = null;
        function renderTable() {
            const tbody = document.getElementById('petTableBody');
            tbody.innerHTML = '';
            pets.forEach((pet, idx) => {
                tbody.innerHTML += `
                <tr>
                    <td>${pet.name}</td>
                    <td>${pet.breed}</td>
                    <td>${pet.age}</td>
                    <td>${pet.color}</td>
                    <td>${pet.status}</td>
                    <td>
                        <button class='action-btn edit' onclick='openPopup("edit", ${idx})'>Edit</button>
                        <button class='action-btn' onclick='removePet(${idx})'>Remove</button>
                    </td>
                </tr>`;
            });
        }
        function openPopup(mode, idx) {
            document.getElementById('popupContainer').style.display = 'flex';
            if (mode === 'edit') {
                editIndex = idx;
                document.getElementById('popupTitle').innerText = 'Edit Pet';
                document.getElementById('petName').value = pets[idx].name;
                document.getElementById('breed').value = pets[idx].breed;
                document.getElementById('age').value = pets[idx].age;
                document.getElementById('color').value = pets[idx].color;
                document.getElementById('status').value = pets[idx].status;
            } else {
                editIndex = null;
                document.getElementById('popupTitle').innerText = 'Add Pet';
                document.getElementById('petForm').reset();
                document.getElementById('status').value = 'Available';
            }
            clearErrors();
        }
        function closePopup() {
            document.getElementById('popupContainer').style.display = 'none';
        }
        function validateForm() {
            let valid = true;
            const name = document.getElementById('petName').value.trim();
            const breed = document.getElementById('breed').value.trim();
            const age = document.getElementById('age').value.trim();
            const color = document.getElementById('color').value.trim();
            const status = document.getElementById('status').value;
            clearErrors();
            if (!name) {
                document.getElementById('nameError').textContent = 'Name is required.';
                valid = false;
            }
            if (!breed) {
                document.getElementById('breedError').textContent = 'Breed is required.';
                valid = false;
            }
            if (!age || isNaN(age) || age < 0) {
                document.getElementById('ageError').textContent = 'Valid age is required.';
                valid = false;
            }
            if (!color) {
                document.getElementById('colorError').textContent = 'Color is required.';
                valid = false;
            }
            if (!status) {
                document.getElementById('statusError').textContent = 'Status is required.';
                valid = false;
            }
            return valid;
        }
        function clearErrors() {
            document.getElementById('nameError').textContent = '';
            document.getElementById('breedError').textContent = '';
            document.getElementById('ageError').textContent = '';
            document.getElementById('colorError').textContent = '';
            document.getElementById('statusError').textContent = '';
        }
        function savePet(e) {
            e.preventDefault();
            if (!validateForm()) return;
            const name = document.getElementById('petName').value;
            const breed = document.getElementById('breed').value;
            const age = document.getElementById('age').value;
            const color = document.getElementById('color').value;
            const status = document.getElementById('status').value;
            if (editIndex !== null) {
                pets[editIndex] = { name, breed, age, color, status };
            } else {
                pets.push({ name, breed, age, color, status });
            }
            renderTable();
            closePopup();
        }
        function removePet(idx) {
            if (confirm('Are you sure you want to remove this pet?')) {
                pets.splice(idx, 1);
                renderTable();
            }
        }
        renderTable();
        let editingIndex = null;
        let petsedit = [];

        function openPopup(mode, index = null) {
            document.getElementById('popupContainer').style.display = 'block';
            document.getElementById('petForm').reset();
            document.getElementById('photoPreview').style.display = 'none';
            currentPhotoDataUrl = "";

            if (mode === 'edit' && index !== null) {
                editingIndex = index;
                const pet = petsedit[index];
                document.getElementById('popupTitle').innerText = 'Edit Pet';
                document.getElementById('petName').value = pet.name;
                document.getElementById('breed').value = pet.breed;
                document.getElementById('age').value = pet.age;
                document.getElementById('color').value = pet.color;
                document.getElementById('status').value = pet.status;
                currentPhotoDataUrl = pet.photo;
                if (pet.photo) {
                    document.getElementById('photoPreview').src = pet.photo;
                    document.getElementById('photoPreview').style.display = 'block';
                }
            } else {
                editingIndex = null;
                document.getElementById('popupTitle').innerText = 'Add Pet';
            }
        }

        function closePopup() {
            document.getElementById('popupContainer').style.display = 'none';
        }

        let currentPhotoDataUrl = "";

        function previewImage(event) {
            const file = event.target.files[0];
            const preview = document.getElementById("photoPreview");

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = "block";
                    currentPhotoDataUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }

        function expandImage(src) {
            const modal = document.getElementById("imageModal");
            const modalImg = document.getElementById("modalImage");
            modal.style.display = "block";
            modalImg.src = src;
        }

        function closeImageModal() {
            document.getElementById("imageModal").style.display = "none";
        }

        function savePet(event) {
            event.preventDefault();

            const name = document.getElementById('petName').value.trim();
            const breed = document.getElementById('breed').value.trim();
            const age = document.getElementById('age').value;
            const color = document.getElementById('color').value.trim();
            const status = document.getElementById('status').value;

            const pet = {
                name,
                breed,
                age,
                color,
                status,
                photo: currentPhotoDataUrl
            };

            if (editingIndex !== null) {
                pets[editingIndex] = pet;
            } else {
                pets.push(pet);
            }

            renderPets();
            closePopup();
        }

        function removePet(index) {
            pets.splice(index, 1);
            renderPets();
        }

        function renderPets() {
            const tbody = document.getElementById('petTableBody');
            tbody.innerHTML = '';

            pets.forEach((pet, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>
                        ${pet.photo ? `<img src="${pet.photo}" alt="${pet.name}" class="pet-thumb" onclick="expandImage('${pet.photo}')">` : ''}
                    </td>
                    <td>${pet.name}</td>
                    <td>${pet.breed}</td>
                    <td>${pet.age}</td>
                    <td>${pet.color}</td>
                    <td>${pet.status}</td>
                    <td>
                        <button class="action-btn edit" onclick="openPopup('edit', ${index})">Edit</button>
                        <button class="action-btn" onclick="removePet(${index})">Remove</button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        }

        // Optional: Seed some data initially
        pets = [
            {
                name: "Buddy",
                breed: "Labrador",
                age: 3,
                color: "Golden",
                status: "Available",
                photo: ""
            },
            {
                name: "Luna",
                breed: "Beagle",
                age: 2,
                color: "Brown/White",
                status: "Adopted",
                photo: ""
            }
        ];

        renderPets();