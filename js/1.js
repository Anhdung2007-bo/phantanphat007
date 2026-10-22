document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navbar Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-xmark');
    });

    // Tự đóng menu khi click vào link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-xmark');
        });
    });

    // --- 2. Dark / Light Mode (LocalStorage) ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    });

    // --- 3. Scroll Events (Scroll-To-Top & Active Nav Highlight) ---
    const scrollTopBtn = document.getElementById('scroll-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Nút Lên đầu trang
        scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';

        // Đánh dấu menu tương ứng khi cuộn
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 4. Project Filter (Bộ lọc dự án) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetFilter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (targetFilter === 'all' || card.dataset.category === targetFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 5. Form Validation (Kiểm tra dữ liệu Liên hệ) ---
    const contactForm = document.getElementById('contact-form');
    const fields = {
        fullname: document.getElementById('fullname'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    const formAlert = document.getElementById('form-alert');

    const setError = (input, msg) => {
        const parent = input.parentElement;
        parent.classList.add('has-error');
        parent.querySelector('.error-text').textContent = msg;
    };

    const clearError = (input) => {
        const parent = input.parentElement;
        parent.classList.remove('has-error');
        parent.querySelector('.error-text').textContent = '';
    };

    const isValidEmail = (emailStr) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+\$/.test(emailStr);
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        if (!fields.fullname.value.trim()) {
            setError(fields.fullname, 'Vui lòng nhập họ tên của bạn');
            isFormValid = false;
        } else {
            clearError(fields.fullname);
        }

        if (!fields.email.value.trim()) {
            setError(fields.email, 'Vui lòng nhập địa chỉ email');
            isFormValid = false;
        } else if (!isValidEmail(fields.email.value.trim())) {
            setError(fields.email, 'Email không đúng định dạng');
            isFormValid = false;
        } else {
            clearError(fields.email);
        }

        if (!fields.subject.value.trim()) {
            setError(fields.subject, 'Vui lòng nhập tiêu đề');
            isFormValid = false;
        } else {
            clearError(fields.subject);
        }

        if (!fields.message.value.trim()) {
            setError(fields.message, 'Vui lòng nhập nội dung tin nhắn');
            isFormValid = false;
        } else {
            clearError(fields.message);
        }

        if (isFormValid) {
            formAlert.textContent = 'Cảm ơn bạn! Tin nhắn đã được gửi thành công.';
            contactForm.reset();
            setTimeout(() => {
                formAlert.textContent = '';
            }, 4000);
        }
    });
});