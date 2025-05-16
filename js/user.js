    // Example users array
        let users = [
            { name: 'Jane Doe', email: 'jane@example.com', role: 'Admin' },
            { name: 'John Smith', email: 'john@example.com', role: 'Staff' }
        ];
        let editIndex = null;

        function renderTable() {
            const tbody = document.getElementById('userTableBody');
            tbody.innerHTML = '';
            users.forEach((user, idx) => {
                tbody.innerHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="action-btn edit" onclick="openPopup('edit', ${idx})">Edit</button>
                        <button class="action-btn" onclick="removeUser(${idx})">Remove</button>
                    </td>
                </tr>`;
            });
        }

        function openPopup(mode, idx) {
            document.getElementById('popupContainer').style.display = 'flex';
            if (mode === 'edit') {
                editIndex = idx;
                document.getElementById('popupTitle').innerText = 'Edit User';
                document.getElementById('name').value = users[idx].name;
                document.getElementById('email').value = users[idx].email;
                document.getElementById('role').value = users[idx].role;
            } else {
                editIndex = null;
                document.getElementById('popupTitle').innerText = 'Add User';
                document.getElementById('userForm').reset();
            }
        }

        function closePopup() {
            document.getElementById('popupContainer').style.display = 'none';
        }

        function saveUser(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;
            if (editIndex !== null) {
                users[editIndex] = { name, email, role };
            } else {
                users.push({ name, email, role });
            }
            renderTable();
            closePopup();
        }

        function removeUser(idx) {
            if (confirm('Are you sure you want to remove this user?')) {
                users.splice(idx, 1);
                renderTable();
            }
        }

        // Initial render
        renderTable();
           // Validation and error message logic
        function validateForm() {
            let valid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const role = document.getElementById('role').value.trim();
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('roleError').textContent = '';
            if (!name) {
                document.getElementById('nameError').textContent = 'Name is required.';
                valid = false;
            }
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required.';
                valid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                document.getElementById('emailError').textContent = 'Enter a valid email address.';
                valid = false;
            }
            if (!role) {
                document.getElementById('roleError').textContent = 'Role is required.';
                valid = false;
            }
            return valid;
        }
        // Override saveUser to use validation
        const oldSaveUser = window.saveUser;
        window.saveUser = function(e) {
            e.preventDefault();
            if (!validateForm()) return;
            oldSaveUser(e);
        };

    function saveProfile(event) {
        event.preventDefault();

        // Get form inputs
        var username = document.getElementById("editUsername");
        var email = document.getElementById("editEmail");
        var phone = document.getElementById("editPhone");
        var password = document.getElementById("editPassword");
        var successMsg = document.getElementById("successMsg");

        // Remove previous error messages
        document.querySelectorAll('.error-message').forEach(e => e.textContent = '');
        successMsg.textContent = '';

        let isValid = true;

        // Username validation
        if (username.value.trim().length < 3) {
            showError(username, "Username must be at least 3 characters.");
            isValid = false;
        }

        // Email validation
        if (!email.value.includes("@")) {
            showError(email, "Email must include '@'.");
            isValid = false;
        }

        // Phone validation (must start with 0 and be 11 digits)
        var phonePattern = /^0\d{10}$/;
        if (!phonePattern.test(phone.value.trim())) {
            showError(phone, "Phone must start with 0 and be 11 digits.");
            isValid = false;
        }

        // Password validation (if not empty, must be at least 4 chars)
        if (password.value && password.value.length < 4) {
            showError(password, "Password must be at least 4 characters.");
            isValid = false;
        }

        if (isValid) {
            successMsg.textContent = "Profile updated successfully!";
            // Here you would typically send the updated data to the server
        }
    }

    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
    }