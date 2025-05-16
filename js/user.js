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