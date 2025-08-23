// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe skill categories for staggered animation
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.animationDelay = `${index * 0.1}s`;
    observer.observe(category);
});

// Observe skill items for staggered animation
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Contact form handling
// const contactForm = document.querySelector('#contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         // Get form data
//         const formData = new FormData(this);
//         const name = formData.get('name');
//         const email = formData.get('email');
//         const subject = formData.get('subject');
//         const message = formData.get('message');
        
//         // Simple validation
//         if (!name || !email || !subject || !message) {
//             showNotification('Please fill in all fields', 'error');
//             return;
//         }
        
//         // Email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             showNotification('Please enter a valid email address', 'error');
//             return;
//         }
        
//         // Show loading state
//         const submitBtn = this.querySelector('button[type="submit"]');
//         const originalText = submitBtn.textContent;
//         submitBtn.textContent = 'Sending...';
//         submitBtn.disabled = true;
        
//         // Try to submit to Formspree first
//         fetch(this.action, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Accept': 'application/json'
//             }
//         })
//         .then(response => {
//             if (response.ok) {
//                 showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
//                 this.reset();
//             } else {
//                 throw new Error('Formspree failed');
//             }
//         })
//         .catch(error => {
//             console.error('Formspree Error:', error);
//             // Fallback to mailto method
//             const mailtoLink = `mailto:aabhishekk247@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`)}`;
//             window.location.href = mailtoLink;
//             showNotification('Email client opened! Please send the email to complete your message.', 'success');
//             this.reset();
//         })
//         .finally(() => {
//             // Reset button state
//             submitBtn.textContent = originalText;
//             submitBtn.disabled = false;
//         });
//     });
// }

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Skill tag hover effects
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const text = item.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text);
                    animateCounter(item, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Add loading animation to skill tags
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.05}s`;
});

// Smooth reveal animation for timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-content').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

console.log('Portfolio website loaded successfully! 🚀'); 

// Dark Mode Functionality
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Change theme immediately
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.transform = 'rotate(180deg)';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.transform = 'rotate(0deg)';
        }
    }
    
    // Check for system preference on first load
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        html.setAttribute('data-theme', defaultTheme);
        localStorage.setItem('theme', defaultTheme);
        updateThemeIcon(defaultTheme);
    }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);


const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Prepare data for Google Apps Script with static message
            const data = new URLSearchParams();
            data.append('name', name);
            data.append('email', email);
            data.append('subject', subject);
            data.append('message', message);
            
            // Add the static message to the data
            const staticMessage = `Dear friend,

Thank you for dropping your interest. I would get back to you soon.

Regards,
Abhishek Kumar
Data Engineer`;
            
            data.append('staticMessage', staticMessage);
            
            // Send to Google Apps Script
            const response = await fetch('https://script.google.com/macros/s/AKfycbznGGk0-qPRuU6SuyZvhjMS8GDp7_ZBVjW_-9zFJI_iDIxT5PaFYOdZ4ugAuqSDbbdP/exec', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Apps Script Error:', error);
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Scroll to Top Button Functionality
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// AI Chat Bot Functionality
function initAIChatBot() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input-field');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');
    
    let isChatOpen = false;
    let conversationHistory = [];
    let conversationMemory = new Map(); // Store context from previous messages
    
    // Portfolio data context for ChatGPT
    const portfolioContext = `
You are an AI assistant for Abhishek Kumar's portfolio website. Here's the key information about Abhishek:

**Personal Information:**
- Name: Abhishek Kumar
- Role: AWS-Certified Data Engineer
- Location: Bengaluru, India
- Email: aabhishekk247@gmail.com
- Phone: +91 84203 00729

**Professional Experience:**
- Current Position: Data Engineer at Infosys (Dec 2022 - Mar 2025)
- Client: Vanguard
- Key Achievements:
  * Designed and implemented cloud migration strategies, transferring on-prem Oracle data to PostgreSQL using AWS DMS
  * Managed real-time data replication via Attunity for secure cloud integration
  * Engineered AWS Lambda functions for data transformation and filtering
  * Reverse engineered complex legacy systems using IBM DataStage
  * Built and maintained ETL workflows
  * Partnered with data architects and analysts

**Technical Skills:**
- Programming: SQL, Python, PySpark
- Databases: Oracle, PostgreSQL, MS-SQL
- Cloud & DevOps: AWS DMS, AWS Lambda, Bamboo, Git, GitHub Copilot
- ETL Tools: IBM DataStage, Azure Synapse
- Visualization: Excel Charts, Power BI
- Others: VS Code, DBeaver, Agile Methodology

**Education:**
- Degree: Bachelor of Technology (B.Tech)
- Field: Electronics and Communication Engineering
- Institution: RCC Institute of Information Technology, West Bengal
- Graduation: 2019
- CGPA: 7.28/10.0

**Soft Skills:**
- Analytical Thinking
- Leadership
- Verbal & Written Communication
- Collaboration
- Problem Solving

**Certifications:**
- AWS Certified Cloud Practitioner

Always provide accurate, helpful information based on this portfolio data. Be conversational, professional, and specific when answering questions about Abhishek's skills, experience, and background.
`;
    
    // Toggle chat
    chatToggle.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatBody.classList.add('show');
            chatInput.focus();
            // Add welcome message if no messages exist
            if (chatMessages.children.length === 0) {
                addMessage("Hi! I'm Abhishek's AI assistant. I can help you learn about his skills, experience, and background. What would you like to know?", 'bot');
                // Add quick question buttons
                addQuickQuestions();
            }
        } else {
            chatBody.classList.remove('show');
        }
    });
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            sendMessage();
        }
    });
    
    // Send message on button click
    chatSendBtn.addEventListener('click', sendMessage);
    
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = addTypingIndicator();
        
        try {
            // Try to get AI response from ChatGPT API first
            const aiResponse = await getChatGPTResponse(message);
            removeTypingIndicator(typingIndicator);
            addMessage(aiResponse, 'bot');
        } catch (error) {
            console.log('API not available, using fallback responses:', error.message);
            removeTypingIndicator(typingIndicator);
            // Fallback to local responses when API fails
            const fallbackResponse = generateFallbackResponse(message);
            addMessage(fallbackResponse, 'bot');
        }
    }
    
    async function getChatGPTResponse(userMessage) {
        // Add user message to conversation history
        conversationHistory.push({ role: "user", content: userMessage });
        
        // Prepare the API request
        const requestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: portfolioContext
                },
                ...conversationHistory.slice(-10) // Keep last 10 messages for context
            ],
            max_tokens: 500,
            temperature: 0.7
        };
        
        try {
            // Try to call the API endpoint
            const response = await fetch('/api/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            const aiResponse = data.choices[0].message.content;
            
            // Add AI response to conversation history
            conversationHistory.push({ role: "assistant", content: aiResponse });
            
            return aiResponse;
        } catch (error) {
            console.error('ChatGPT API Error:', error);
            throw error; // Re-throw to trigger fallback
        }
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }
    
    function removeTypingIndicator(typingIndicator) {
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.remove();
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageDiv;
    }
    
    // Add quick question buttons for easy interaction
    function addQuickQuestions() {
        const quickQuestionsDiv = document.createElement('div');
        quickQuestionsDiv.className = 'quick-questions';
        
        const questions = [
            "What are Abhishek's skills?",
            "Tell me about his experience",
            "What's his education background?",
            "How can I contact him?",
            "What about AWS expertise?",
            "Tell me about data engineering"
        ];
        
        questions.forEach(question => {
            const button = document.createElement('button');
            button.className = 'quick-question-btn';
            button.textContent = question;
            button.addEventListener('click', () => {
                // Simulate user typing and sending the question
                chatInput.value = question;
                sendMessage();
            });
            quickQuestionsDiv.appendChild(button);
        });
        
        chatMessages.appendChild(quickQuestionsDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Enhanced fallback response generator (local responses when API fails)
    function generateFallbackResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Enhanced pattern matching with multiple keywords
        const patterns = [
            {
                keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
                response: "Hello! 👋 I'm Abhishek's AI assistant. I can tell you about his skills, experience, education, and more. What would you like to know?"
            },
            {
                keywords: ['help', 'what can you do', 'capabilities', 'assist'],
                response: "I can help you learn about Abhishek Kumar! I know about his:\n\n• **Skills** - SQL, Python, AWS, Data Engineering\n• **Experience** - Data Engineer at Infosys\n• **Education** - B.Tech in Electronics\n• **Projects** - Cloud migration, ETL pipelines\n• **Contact** - Email and phone details\n\nJust ask me anything!"
            },
            {
                keywords: ['skill', 'technology', 'tech', 'programming', 'language', 'tool'],
                response: "Abhishek has expertise in:\n\n**Programming:** SQL, Python, PySpark\n**Databases:** Oracle, PostgreSQL, MS-SQL\n**Cloud & DevOps:** AWS DMS, AWS Lambda, Git\n**ETL Tools:** IBM DataStage, Azure Synapse\n**Visualization:** Power BI, Excel Charts\n\nHe's particularly strong in data engineering and cloud technologies! 🚀"
            },
            {
                keywords: ['experience', 'work', 'job', 'career', 'position', 'role'],
                response: "Abhishek is currently a **Data Engineer at Infosys** (Dec 2022 - Mar 2025), working with **Vanguard** as a client.\n\n**Key achievements:**\n• Cloud migration from Oracle to PostgreSQL using AWS DMS\n• Real-time data replication with Attunity\n• AWS Lambda functions for data transformation\n• ETL workflow development\n• Legacy system reverse engineering\n\nHe has 2+ years of experience in data engineering! 💼"
            },
            {
                keywords: ['education', 'degree', 'university', 'college', 'graduation', 'b.tech'],
                response: "Abhishek completed his **Bachelor of Technology (B.Tech)** in **Electronics and Communication Engineering** from **RCC Institute of Information Technology, West Bengal** in 2019.\n\n**Graduation:** 2019\n**CGPA:** 7.28/10.0\n\nHis engineering background gives him strong analytical and problem-solving skills! 🎓"
            },
            {
                keywords: ['aws', 'amazon', 'cloud', 'amazon web services'],
                response: "Abhishek is **AWS Certified Cloud Practitioner** and has hands-on experience with:\n\n• **AWS DMS** - Database migration services\n• **AWS Lambda** - Serverless computing\n• **Cloud migration strategies**\n• **Data replication** in cloud environments\n\nHe's helped migrate on-premise Oracle databases to PostgreSQL in the cloud! ☁️"
            },
            {
                keywords: ['contact', 'email', 'phone', 'reach', 'get in touch', 'linkedin'],
                response: "You can reach Abhishek through:\n\n📧 **Email:** aabhishekk247@gmail.com\n📱 **Phone:** +91 84203 00729\n📍 **Location:** Bengaluru, India\n\nFeel free to send him a message or connect on LinkedIn! 📞"
            },
            {
                keywords: ['python', 'sql', 'database', 'oracle', 'postgresql'],
                response: "**Python:** Abhishek uses Python for data processing, automation, and building ETL pipelines. He's proficient in data manipulation and analysis.\n\n**SQL:** This is one of his core skills! He works extensively with Oracle, PostgreSQL, and MS-SQL for database management, data analysis, and query optimization.\n\n**Databases:** He has experience with both relational and cloud databases, including migration projects! 💻"
            },
            {
                keywords: ['data engineer', 'etl', 'pipeline', 'data migration', 'data replication'],
                response: "As a **Data Engineer**, Abhishek specializes in:\n\n• **ETL Pipeline Development** - Building data transformation workflows\n• **Cloud Migration** - Moving data from on-premise to cloud\n• **Data Replication** - Real-time data synchronization\n• **Database Design** - Optimizing data storage and retrieval\n• **Data Quality** - Ensuring data accuracy and consistency\n\nHe's worked on complex data migration projects for financial services! 🔄"
            },
            {
                keywords: ['infosys', 'vanguard', 'company', 'employer'],
                response: "Abhishek works at **Infosys** as a Data Engineer, with **Vanguard** as his client. This is a significant role where he:\n\n• Works on enterprise-level data projects\n• Collaborates with data architects and analysts\n• Handles large-scale data migration\n• Implements cloud solutions for financial services\n\nIt's a great opportunity to work with cutting-edge data technologies! 🏢"
            },
            {
                keywords: ['certification', 'certified', 'aws certified', 'cloud practitioner'],
                response: "Abhishek holds the **AWS Certified Cloud Practitioner** certification, which demonstrates his knowledge of:\n\n• AWS cloud concepts and services\n• Security and compliance\n• Pricing and support\n• Cloud architecture best practices\n\nThis certification shows his commitment to staying current with cloud technologies! 🏆"
            },
            {
                keywords: ['project', 'work', 'achievement', 'accomplishment'],
                response: "Abhishek has worked on several key projects:\n\n**Cloud Migration Project:**\n• Migrated Oracle databases to PostgreSQL using AWS DMS\n• Implemented real-time data replication with Attunity\n\n**ETL Pipeline Development:**\n• Built automated data transformation workflows\n• Optimized data processing performance\n\n**Legacy System Modernization:**\n• Reverse engineered IBM DataStage systems\n• Improved data schema and performance\n\nThese projects showcase his expertise in data engineering! 🚀"
            },
            {
                keywords: ['salary', 'compensation', 'pay', 'money', 'earnings'],
                response: "I don't have specific information about Abhishek's salary or compensation details. However, as an AWS-Certified Data Engineer with experience at Infosys working on enterprise projects, he likely receives competitive compensation commensurate with his skills and experience level in the Bengaluru market."
            },
            {
                keywords: ['future', 'plan', 'goal', 'aspiration', 'next step'],
                response: "Based on his current role and expertise, Abhishek is likely focused on:\n\n• **Career Growth:** Advancing to senior data engineering roles\n• **Skill Development:** Expanding cloud and big data technologies\n• **Project Leadership:** Taking on more complex data initiatives\n• **Industry Impact:** Contributing to innovative data solutions\n\nHis AWS certification and cloud expertise position him well for future opportunities! 🌟"
            }
        ];
        
        // Check for exact matches first
        for (const pattern of patterns) {
            if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return pattern.response;
            }
        }
        
        // Check for partial matches and context
        const contextKeywords = {
            'data': ['data engineering', 'data analysis', 'data processing'],
            'cloud': ['aws', 'azure', 'cloud computing', 'migration'],
            'database': ['sql', 'oracle', 'postgresql', 'database design'],
            'programming': ['python', 'coding', 'development', 'automation'],
            'business': ['project', 'client', 'enterprise', 'collaboration']
        };
        
        // Find the most relevant context
        let bestMatch = null;
        let highestScore = 0;
        
        for (const [context, keywords] of Object.entries(contextKeywords)) {
            const score = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
            if (score > highestScore) {
                highestScore = score;
                bestMatch = context;
            }
        }
        
        // Provide context-specific responses
        if (bestMatch === 'data') {
            return "Great question about data! Abhishek specializes in data engineering, including ETL pipelines, data migration, and data quality. He's worked extensively with SQL, Python, and cloud technologies to build robust data solutions. What specific aspect of data engineering interests you? 📊";
        } else if (bestMatch === 'cloud') {
            return "Excellent question about cloud technologies! Abhishek is AWS certified and has hands-on experience with cloud migration, AWS DMS, and Lambda functions. He's helped organizations move from on-premise to cloud-based data solutions. Would you like to know more about his cloud expertise? ☁️";
        } else if (bestMatch === 'database') {
            return "Great database question! Abhishek has extensive experience with Oracle, PostgreSQL, and MS-SQL. He's worked on database migration projects, optimization, and real-time replication. His database skills are fundamental to his data engineering work. What would you like to know about his database expertise? 🗄️";
        } else if (bestMatch === 'programming') {
            return "Excellent programming question! Abhishek is proficient in Python and SQL, using them for data processing, automation, and ETL pipeline development. He also works with PySpark for big data processing. His programming skills enable him to build efficient data solutions. What programming aspect interests you? 💻";
        } else if (bestMatch === 'business') {
            return "Great business question! Abhishek works at Infosys with Vanguard as a client, handling enterprise-level data projects. He collaborates with data architects and analysts to deliver scalable solutions. His role involves both technical implementation and business collaboration. What business aspect would you like to explore? 🤝";
        }
        
        // Check for question words to provide helpful guidance
        const questionWords = ['what', 'how', 'when', 'where', 'why', 'which', 'who'];
        const hasQuestionWord = questionWords.some(word => lowerMessage.includes(word));
        
        if (hasQuestionWord) {
            return "That's an interesting question! While I don't have specific details about that, I can tell you about Abhishek's:\n\n• **Technical Skills** - Programming, databases, cloud technologies\n• **Experience** - Data engineering projects and achievements\n• **Education** - Engineering background and certifications\n• **Projects** - Cloud migration and ETL development\n\nWhat would you like to know more about? 🤔";
        }
        
        // Check for greetings or casual conversation
        if (lowerMessage.length < 10 && /^[a-zA-Z\s]+$/.test(lowerMessage)) {
            return "Hi there! 👋 I'm here to help you learn about Abhishek Kumar's portfolio. I can tell you about his skills, experience, projects, and more. Just ask me anything!";
        }
        
        // Provide intelligent fallback based on message length and content
        if (lowerMessage.length < 20) {
            return "I'd be happy to help! Abhishek has expertise in data engineering, cloud technologies, and database management. What specific area would you like to learn about? 🚀";
        } else {
            // For longer messages, try to extract key topics
            const topics = ['skill', 'experience', 'education', 'project', 'contact', 'aws', 'python', 'sql'];
            const foundTopics = topics.filter(topic => lowerMessage.includes(topic));
            
            if (foundTopics.length > 0) {
                return `I see you're interested in ${foundTopics.join(', ')}! Abhishek has experience in all these areas. Let me know what specific information you'd like, and I'll provide detailed answers! 📚`;
            } else {
                return "That's an interesting question! Abhishek has a diverse background in data engineering, cloud technologies, and database management. I'd be happy to elaborate on any of these areas or answer specific questions you might have. What would you like to explore? 💡";
            }
        }
    }
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.ai-chat-bot') && isChatOpen) {
            isChatOpen = false;
            chatBody.classList.remove('show');
        }
    });
}

// Initialize new features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollToTop();
    initAIChatBot();
});