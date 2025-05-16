   let pets = [
            { name: 'Buddy', breed: 'Labrador', age: 3, color: 'Golden' },
            { name: 'Luna', breed: 'Beagle', age: 2, color: 'Brown/White' }
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
            } else {
                editIndex = null;
                document.getElementById('popupTitle').innerText = 'Add Pet';
                document.getElementById('petForm').reset();
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
            return valid;
        }
        function clearErrors() {
            document.getElementById('nameError').textContent = '';
            document.getElementById('breedError').textContent = '';
            document.getElementById('ageError').textContent = '';
            document.getElementById('colorError').textContent = '';
        }
        function savePet(e) {
            e.preventDefault();
            if (!validateForm()) return;
            const name = document.getElementById('petName').value;
            const breed = document.getElementById('breed').value;
            const age = document.getElementById('age').value;
            const color = document.getElementById('color').value;
            if (editIndex !== null) {
                pets[editIndex] = { name, breed, age, color };
            } else {
                pets.push({ name, breed, age, color });
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