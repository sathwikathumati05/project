document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate phone number (only numbers allowed)
    const isValidPhone = (phone) => {
        const phoneRegex = /^\d*$/;
        return phoneRegex.test(phone);
    };

    // Function to show error message
    const showError = (field, message) => {
        const errorElement = document.getElementById(`${field.id}Error`);
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    };

    // Function to clear error message
    const clearError = (field) => {
        const errorElement = document.getElementById(`${field.id}Error`);
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    };

    // Add input event listeners to clear errors when user starts typing
    const fields = ['firstName', 'lastName', 'email', 'phone', 'subject', 'message'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', () => clearError(field));
        }
    });

    // Function to validate form
    const validateForm = () => {
        let isValid = true;
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Clear all previous error messages
        [firstName, lastName, email, phone, subject, message].forEach(field => clearError(field));

        // Validate First Name
        if (!firstName.value.trim()) {
            showError(firstName, 'First Name is required');
            isValid = false;
        }

        // Validate Last Name
        if (!lastName.value.trim()) {
            showError(lastName, 'Last Name is required');
            isValid = false;
        }

        // Validate Email
        if (!email.value.trim()) {
            showError(email, 'Email Address is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Phone (optional)
        if (phone.value && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter only numbers');
            isValid = false;
        }

        // Validate Subject
        if (!subject.value) {
            showError(subject, 'Please select a subject');
            isValid = false;
        }

        // Validate Message
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        }

        return isValid;
    };

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Show success message with animation
            successMessage.style.display = 'block';
            // Force reflow
            successMessage.offsetHeight;
            successMessage.classList.add('show');
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 300); // Wait for fade out animation
            }, 5000);
        }
    });
});
