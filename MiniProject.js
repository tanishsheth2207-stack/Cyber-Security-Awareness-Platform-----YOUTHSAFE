/* ══════════════════════════════════════════════════
           1.  SCROLL PROGRESS BAR
        ══════════════════════════════════════════════════ */
        const progressBar = document.getElementById('progress-bar');
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = progress + '%';
        });

        /* ══════════════════════════════════════════════════
           2.  DARK / LIGHT MODE TOGGLE
        ══════════════════════════════════════════════════ */
        const toggleBtn = document.getElementById('theme-toggle');
        const toggleIcon = toggleBtn.querySelector('.toggle-icon');
        const html = document.documentElement;

        // Load saved preference
        const savedTheme = localStorage.getItem('ys-theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        toggleIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

        toggleBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            toggleIcon.textContent = next === 'dark' ? '☀️' : '🌙';
            localStorage.setItem('ys-theme', next);
        });

        /* ══════════════════════════════════════════════════
           3.  SCROLL-REVEAL
        ══════════════════════════════════════════════════ */
        const fadeEls = document.querySelectorAll('.fade-up');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('visible'), i * 60);
                    revealObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        fadeEls.forEach(el => revealObserver.observe(el));

        /* ══════════════════════════════════════════════════
           4.  HEADER SHRINK ON SCROLL
        ══════════════════════════════════════════════════ */
        const header = document.getElementById('site-header');

        window.addEventListener('scroll', () => {
            const sy = window.scrollY;
            header.classList.toggle('scrolled', sy > 60);
        }, { passive: true });

        const navLinks = document.getElementById('nav-links');
        document.getElementById('hamburger').addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                if (link.id === 'nav-dashboard-link') {
                    updateDashboard();
                }
            });
        });

        /* ══════════════════════════════════════════════════
           6.  COUNT-UP STATS
        ══════════════════════════════════════════════════ */
        const counters = document.querySelectorAll('.stat-num');
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = +el.dataset.target;
                    let count = 0;
                    const step = Math.ceil(target / 40);
                    const timer = setInterval(() => {
                        count = Math.min(count + step, target);
                        el.textContent = count;
                        if (count >= target) clearInterval(timer);
                    }, 40);
                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => countObserver.observe(c));




        /* ══════════════════════════════════════════════════
           7.  GLOSSARY ACCORDION
        ══════════════════════════════════════════════════ */
        document.querySelectorAll('.gloss-trigger').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.gloss-item');
                const isOpen = item.classList.contains('open');
                // Close all
                document.querySelectorAll('.gloss-item.open').forEach(el => {
                    el.classList.remove('open');
                    el.querySelector('.gloss-trigger').setAttribute('aria-expanded', 'false');
                });
                // Open clicked (if it was closed)
                if (!isOpen) {
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });

        /* ══════════════════════════════════════════════════
           8.  CYBER SAFETY QUIZ
        ══════════════════════════════════════════════════ */
        const quizData = [
            // 1. PHISHING
            {
                category: "Phishing",
                q: "You receive an email saying 'Your account has been suspended! Click here to verify.' What should you do?",
                options: ["Click the link immediately", "Reply with your password", "Check the sender's real email address and go to official site", "Forward it to all friends"],
                correct: 2,
                explain: "✅ Always go directly to the official website — never click links in suspicious emails."
            },
            {
                category: "Phishing",
                q: "What is the main goal of a phishing attack?",
                options: ["To fix your computer", "To steal sensitive info like passwords", "To give you a free prize", "To update your software"],
                correct: 1,
                explain: "✅ Phishing is designed to trick you into giving away secrets like passwords or bank details."
            },
            {
                category: "Phishing",
                q: "A text message says 'You won a $1000 gift card! Click here.' This is likely:",
                options: ["A lucky day!", "A school notification", "A 'Smishing' (SMS Phishing) attack", "A system update"],
                correct: 2,
                explain: "✅ If it sounds too good to be true, it's usually a scam. SMS phishing is very common."
            },
            {
                category: "Phishing",
                q: "An email from 'Apple Support' has spelling errors and uses a gmail.com address. Is it real?",
                options: ["Yes, they are being casual", "No, professional companies use their own domains", "Yes, they use gmail for emergencies", "Maybe, I should click to find out"],
                correct: 1,
                explain: "✅ Spelling errors and unofficial sender addresses are major red flags for phishing."
            },
            {
                category: "Phishing",
                q: "What is 'Spear Phishing'?",
                options: ["Phishing that involves fishing gear", "A generic attack on millions of people", "A targeted attack using your personal info", "A way to speed up your internet"],
                correct: 2,
                explain: "✅ Spear phishing is when attackers use info they already know about you to make their scam more believable."
            },



            // 3. VPN
            {
                category: "VPN",
                q: "You're using a café's free Wi-Fi. Which of these is safe to do?",
                options: ["Log into your bank", "Change your password", "Browse a public news site", "Sync your school drive"],
                correct: 2,
                explain: "✅ Public Wi-Fi is unencrypted. Only use it for non-sensitive browsing unless you have a VPN."
            },
            {
                category: "VPN",
                q: "What does a VPN (Virtual Private Network) do?",
                options: ["Speeds up your internet", "Encrypts your traffic and hides your IP", "Deletes your browser history", "Prevents all viruses"],
                correct: 1,
                explain: "✅ A VPN creates a secure 'tunnel' for your data, making it hard for others to spy on what you're doing."
            },
            {
                category: "VPN",
                q: "Does a VPN make you 100% invisible to everyone online?",
                options: ["Yes, absolutely", "No, websites can still track you via cookies", "Only if you use it on a phone", "Only during the night"],
                correct: 1,
                explain: "✅ A VPN hides your IP, but websites can still identify you if you log in or if they use tracking cookies."
            },
            {
                category: "VPN",
                q: "What can your Internet Provider see if you use a VPN?",
                options: ["Every website you visit", "Nothing at all", "Only that you are connected to a VPN", "Your passwords"],
                correct: 2,
                explain: "✅ A VPN hides the destination of your traffic from your ISP, though they still see that data is moving."
            },
            {
                category: "VPN",
                q: "When is a VPN MOST useful?",
                options: ["When playing offline games", "When using your home Wi-Fi", "When using an untrusted or public network", "When your battery is low"],
                correct: 2,
                explain: "✅ Public Wi-Fi is the 'danger zone' where a VPN's encryption is most needed."
            },

            // 4. 2FA
            {
                category: "2FA",
                q: "What does 2FA (Two-Factor Authentication) protect against?",
                options: ["Viruses", "Someone logging in even if they have your password", "People reading messages", "Location tracking"],
                correct: 1,
                explain: "✅ 2FA requires a second proof of identity, stopping hackers who only have your password."
            },
            {
                category: "2FA",
                q: "What is a common 'Second Factor' in 2FA?",
                options: ["Your username", "A code sent to your phone", "Your favorite color", "Your profile picture"],
                correct: 1,
                explain: "✅ Codes via SMS, email, or apps like Google Authenticator are standard second factors."
            },
            {
                category: "2FA",
                q: "If you get a 2FA code you didn't ask for, what happened?",
                options: ["The system is glitching", "Someone likely knows your password and is trying to log in", "A friend is playing a prank", "You won a prize"],
                correct: 1,
                explain: "✅ This means your password was leaked! Change it immediately."
            },
            {
                category: "2FA",
                q: "Why is an Authenticator App safer than SMS for 2FA?",
                options: ["It uses more battery", "SMS can be intercepted via 'SIM Swapping'", "Authenticator apps are more colorful", "SMS only works on iPhones"],
                correct: 1,
                explain: "✅ Hackers can sometimes trick phone companies into porting your number to their SIM, but they can't easily steal your app tokens."
            },
            {
                category: "2FA",
                q: "Is a fingerprint scan a form of authentication?",
                options: ["Yes, 'Something you are' (Biometric)", "No, that's only for movies", "Yes, but only for unlocking the screen", "No, it's not digital"],
                correct: 0,
                explain: "✅ Authentication factors are: Something you Know (password), Something you Have (phone), or Something you Are (fingerprint)."
            },

            // 5. MALWARE
            {
                category: "Malware",
                q: "What is 'Malware' short for?",
                options: ["Malicious Hardware", "Mail Software", "Malicious Software", "Major Warehousing"],
                correct: 2,
                explain: "✅ Malware is any software designed to cause damage or steal data."
            },
            {
                category: "Malware",
                q: "Which type of malware 'holds your files hostage' for money?",
                options: ["Spyware", "Adware", "Ransomware", "Trojan"],
                correct: 2,
                explain: "✅ Ransomware encrypts your files and demands payment to get them back. Always keep backups!"
            },
            {
                category: "Malware",
                q: "A 'Trojan' virus is named after the Greek myth because:",
                options: ["It's very old", "It looks like something safe but hides a threat", "It only affects wooden computers", "It travels in a horse"],
                correct: 1,
                explain: "✅ Trojans trick you into installing them by pretending to be a useful tool or a game."
            },
            {
                category: "Malware",
                q: "How can you prevent most malware infections?",
                options: ["Never use the internet", "Only use a mouse, not a keyboard", "Keep your OS updated and use antivirus", "Only visit sites that have 'www'"],
                correct: 2,
                explain: "✅ Software updates fix 'vulnerabilities' that malware uses to get in."
            },
            {
                category: "Malware",
                q: "What does 'Spyware' do?",
                options: ["Spies on your neighbors", "Steals your credit card info and records your keystrokes", "Speeds up your browser", "Automatically updates your apps"],
                correct: 1,
                explain: "✅ Spyware runs silently in the background, watching everything you type and do."
            },



            // 7. ENCRYPTION
            {
                category: "Encryption",
                q: "Why is 'End-to-End Encryption' important?",
                options: ["Makes app faster", "Allows larger files", "Only sender and receiver can read messages", "Auto-deletes messages"],
                correct: 2,
                explain: "✅ Encryption ensures privacy — even the company running the app can't see your data."
            },
            {
                category: "Encryption",
                q: "What does HTTPS stand for?",
                options: ["Hyper Transfer Private Secret", "Hypertext Transfer Protocol Secure", "High Tech Privacy System", "Hidden Text Password System"],
                correct: 1,
                explain: "✅ The 'S' stands for Secure, meaning the website uses encryption to protect your data."
            },
            {
                category: "Encryption",
                q: "If a hacker steals an encrypted file without the 'key', they see:",
                options: ["The whole file", "Nothing, it disappears", "A bunch of random gibberish", "A list of passwords"],
                correct: 2,
                explain: "✅ Without the decryption key, the data is just a meaningless jumble of characters."
            },
            {
                category: "Encryption",
                q: "Which of these usually uses encryption?",
                options: ["Online banking", "Standard SMS texts", "A public blog post", "A printed newspaper"],
                correct: 0,
                explain: "✅ Banks use high-level encryption to keep your money and account details safe from hackers."
            },
            {
                category: "Encryption",
                q: "Is it safe to enter credit card info on a site with 'http' (not 'https')?",
                options: ["Yes, if the site looks professional", "No, your data is sent in clear text for hackers to see", "Yes, http is faster", "Only if you use a credit card, not debit"],
                correct: 1,
                explain: "✅ Without HTTPS, anyone on the same network could 'sniff' your card details."
            },



            // 9. SOCIAL ENGINEERING
            {
                category: "Social Engineering",
                q: "What is 'Social Engineering' primarily about?",
                options: ["Hacking a computer's hardware", "Manipulating people into giving up secrets", "Building social media apps", "Improving your social life"],
                correct: 1,
                explain: "✅ Social Engineering hacks the *person*, not the machine, by using trust or fear."
            },
            {
                category: "Social Engineering",
                q: "Someone calls claiming to be 'IT Support' and asks for your password to 'fix a bug'. What is this?",
                options: ["Helpful service", "A common social engineering tactic", "A mandatory update", "A random coincidence"],
                correct: 1,
                explain: "✅ Real support will NEVER ask for your password over the phone."
            },
            {
                category: "Social Engineering",
                q: "Which of these is a social engineering technique?",
                options: ["Baiting (leaving a free USB for someone to find)", "Writing clean code", "Installing an antivirus", "Buying a new laptop"],
                correct: 0,
                explain: "✅ Baiting relies on curiosity to trick someone into plugging in a malware-infected device."
            },
            {
                category: "Social Engineering",
                q: "Why do attackers use 'Urgency' (e.g., 'Act now or lose access!')?",
                options: ["To save you time", "To make you panic and stop thinking clearly", "Because they are in a hurry", "To show they care"],
                correct: 1,
                explain: "✅ Panic is an attacker's best friend. Always slow down and verify before acting."
            },
            {
                category: "Social Engineering",
                q: "An online 'friend' you've never met asks for your school name to 'send a gift'. Should you give it?",
                options: ["Yes, if they seem nice", "No, this is grooming/information gathering", "Yes, gifts are good", "Only if they send a photo first"],
                correct: 1,
                explain: "✅ Never share personal details with strangers online, no matter how friendly they seem."
            }
        ];

        let filteredQuiz = [];
        let currentQ = 0;
        let score = 0;
        let answered = false;

        // Quiz Setup Logic
        document.getElementById('start-quiz-btn').addEventListener('click', function (e) {
            e.preventDefault();
            const selectedTopics = Array.from(document.querySelectorAll('input[name="topic"]:checked')).map(cb => cb.value);

            if (selectedTopics.length === 0) {
                alert("Please select at least one topic to start the quiz!");
                return;
            }

            filteredQuiz = quizData.filter(q => selectedTopics.includes(q.category));

            if (filteredQuiz.length === 0) {
                alert("No questions found for the selected topics.");
                return;
            }

            // Hide setup, show quiz
            document.getElementById('quiz-setup').style.display = 'none';
            document.getElementById('quiz-card').style.display = 'block';
            document.getElementById('quiz-result').style.display = 'none';

            currentQ = 0;
            score = 0;
            loadQuestion();
        });

        function loadQuestion() {
            answered = false;
            const data = filteredQuiz[currentQ];
            document.getElementById('quiz-counter').textContent = `Question ${currentQ + 1} of ${filteredQuiz.length}`;
            document.getElementById('quiz-progress-fill').style.width = ((currentQ) / filteredQuiz.length * 100) + '%';
            document.getElementById('quiz-question').textContent = data.q;
            document.getElementById('quiz-feedback').innerHTML = '';
            document.getElementById('quiz-next').style.display = 'none';

            const optWrap = document.getElementById('quiz-options');
            optWrap.innerHTML = '';
            data.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.textContent = opt;
                btn.addEventListener('click', () => handleAnswer(i));
                optWrap.appendChild(btn);
            });
        }

        function handleAnswer(selected) {
            if (answered) return;
            answered = true;
            const data = filteredQuiz[currentQ];
            const opts = document.querySelectorAll('.quiz-option');

            opts.forEach((btn, i) => {
                btn.disabled = true;
                if (i === data.correct) btn.classList.add('correct');
                else if (i === selected) btn.classList.add('wrong');
            });

            const fb = document.getElementById('quiz-feedback');
            
            if (selected === data.correct) {
                score++;
                fb.innerHTML = `<div class="fb-correct">🎉 Correct! ${data.explain}</div>`;
            } else {
                fb.innerHTML = `<div class="fb-wrong">❌ Not quite. ${data.explain}</div>`;
            }

            const nextBtn = document.getElementById('quiz-next');
            nextBtn.style.display = 'block';
            nextBtn.textContent = currentQ < filteredQuiz.length - 1 ? 'Next Question →' : 'See My Results 🏆';
        }

        document.getElementById('quiz-next').addEventListener('click', () => {
            currentQ++;
            if (currentQ < filteredQuiz.length) {
                loadQuestion();
            } else {
                showResult();
            }
        });

        function showResult() {
            document.getElementById('quiz-card').style.display = 'none';
            const result = document.getElementById('quiz-result');
            result.style.display = 'flex';

            const total = filteredQuiz.length;
            const pct = Math.round((score / total) * 100);
            document.getElementById('result-score').textContent = `You scored ${score} out of ${total} (${pct}%)`;
            document.getElementById('quiz-progress-fill').style.width = '100%';

            // Save score to user profile
            const email = sessionStorage.getItem('ys-user-email');
            if (email) {
                const stored = localStorage.getItem('ys-user-' + email);
                if (stored) {
                    const user = JSON.parse(stored);
                    user.lastScore = score;
                    user.lastTotal = total;
                    user.lastPct = pct;
                    localStorage.setItem('ys-user-' + email, JSON.stringify(user));
                    updateDashboard();
                }
            }

            let emoji, title, msg;
            if (pct === 100) {
                emoji = '🏆'; title = 'Cyber Safety Expert!';
                msg = 'Perfect score! You clearly know how to protect yourself online. Share this quiz with a friend!';
            } else if (pct >= 80) {
                emoji = '🛡️'; title = 'Digitally Aware!';
                msg = 'Great job! You have solid cyber safety knowledge. Review the tips below to sharpen the gaps.';
            } else if (pct >= 50) {
                emoji = '⚠️'; title = 'Getting There!';
                msg = 'You know some basics, but there\'s room to improve. Explore our Awareness and Tips sections!';
            } else {
                emoji = '🚨'; title = 'Stay Alert!';
                msg = 'Your online safety needs attention. Start with our Awareness modules and Safety Tips!';
            }
            document.getElementById('result-emoji').textContent = emoji;
            document.getElementById('result-title').textContent = title;
            document.getElementById('result-msg').textContent = msg;
        }

        document.getElementById('quiz-go-dashboard').addEventListener('click', () => {
            updateDashboard();
            smoothScrollTo('Dashboard');
        });





        document.getElementById('quiz-restart').addEventListener('click', () => {
            document.getElementById('quiz-result').style.display = 'none';
            document.getElementById('quiz-card').style.display = 'none';
            document.getElementById('quiz-setup').style.display = 'block';
            document.getElementById('quiz-progress-fill').style.width = '0%';
        });


        /* ══════════════════════════════════════════════════
           9.  AUTH SYSTEM + QUIZ GUARD
        ══════════════════════════════════════════════════ */

        /* ── Helpers ── */
        function showMsg(id, type, text) {
            const el = document.getElementById(id);
            el.className = 'form-msg ' + type;
            el.textContent = text;
        }
        function smoothScrollTo(id) {
            const el = document.getElementById(id) || document.querySelector(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        /* ── Quiz Guard: show/hide based on login ── */
        function updateQuizGuard() {
            const loggedIn = !!sessionStorage.getItem('ys-session');
            document.getElementById('quiz-guard').style.display = loggedIn ? 'none' : 'flex';
            document.getElementById('quiz-wrap').style.display = loggedIn ? 'block' : 'none';
            
            // Dashboard Visibility
            const dashSection = document.getElementById('Dashboard');
            const dashNav = document.getElementById('nav-dashboard-item');
            if (dashSection) dashSection.style.display = loggedIn ? 'block' : 'none';
            if (dashNav) dashNav.style.display = loggedIn ? 'block' : 'none';

            // Nav user chip
            const chip = document.getElementById('nav-user-chip');
            const nameSpan = document.getElementById('nav-username');
            const regLink = document.getElementById('nav-register-link');
            const loginLink = document.getElementById('nav-login-link');
            if (loggedIn) {
                nameSpan.textContent = sessionStorage.getItem('ys-user-name') || 'Student';
                chip.classList.add('show');
                if (regLink) regLink.parentElement.style.display = 'none';
                if (loginLink) loginLink.parentElement.style.display = 'none';
                updateDashboard();
            } else {
                chip.classList.remove('show');
                if (regLink) regLink.parentElement.style.display = '';
                if (loginLink) loginLink.parentElement.style.display = '';
            }
        }

        function updateDashboard() {
            const email = sessionStorage.getItem('ys-user-email');
            if (!email) {
                console.log("No email in session");
                return;
            }

            const stored = localStorage.getItem('ys-user-' + email);
            if (!stored) {
                console.log("No user found in local storage for: " + email);
                return;
            }

            const user = JSON.parse(stored);
            
            // Set values with fallbacks
            const dashName = document.getElementById('dash-name');
            const dashEmail = document.getElementById('dash-email');
            const dashSchool = document.getElementById('dash-school');
            
            if (dashName) dashName.textContent = user.name || 'Student';
            if (dashEmail) dashEmail.textContent = user.email || email;
            if (dashSchool) dashSchool.textContent = user.school || 'Not specified';

            // Update stats
            const scorePct = user.lastPct !== undefined ? user.lastPct : 0;
            const scoreText = user.lastScore !== undefined ? `You scored ${user.lastScore} out of ${user.lastTotal} (${user.lastPct}%)` : 'No quiz attempted yet.';
            
            const dashScorePct = document.getElementById('dash-score-pct');
            const dashScoreText = document.getElementById('dash-score-text');
            
            if (dashScorePct) dashScorePct.textContent = scorePct + '%';
            if (dashScoreText) dashScoreText.textContent = scoreText;

            // Update badge
            const badgeIcon = document.querySelector('.badge-icon');
            const badgeText = document.querySelector('.badge-text');
            
            if (badgeIcon && badgeText) {
                if (user.lastPct === 100) {
                    badgeIcon.textContent = '🏆';
                    badgeText.textContent = 'Cyber Safety Expert';
                } else if (user.lastPct >= 80) {
                    badgeIcon.textContent = '🛡️';
                    badgeText.textContent = 'Digitally Aware';
                } else if (user.lastPct >= 50) {
                    badgeIcon.textContent = '⚠️';
                    badgeText.textContent = 'Getting There';
                } else if (user.lastPct !== undefined) {
                    badgeIcon.textContent = '🚨';
                    badgeText.textContent = 'Stay Alert';
                } else {
                    badgeIcon.textContent = '❓';
                    badgeText.textContent = 'Take a quiz to earn a badge';
                }
            }
        }
        updateQuizGuard();

        /* ── Boot quiz only if logged in ── */
        // Removed auto-load to prevent crash before topic selection

        /* ── Logout ── */
        const logoutBtn = document.getElementById('nav-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                const origText = logoutBtn.textContent;
                logoutBtn.textContent = '...';
                logoutBtn.disabled = true;

                setTimeout(() => {
                    sessionStorage.removeItem('ys-session');
                    sessionStorage.removeItem('ys-user-name');
                    sessionStorage.removeItem('ys-user-email');
                    updateQuizGuard();
                    currentQ = 0; score = 0;
                    document.getElementById('quiz-result').style.display = 'none';
                    document.getElementById('quiz-card').style.display = 'none';
                    document.getElementById('quiz-setup').style.display = 'block';

                    logoutBtn.textContent = origText;
                    logoutBtn.disabled = false;
                    smoothScrollTo('site-header');
                    alert('Logged out successfully. See you soon! 👋');
                }, 600);
            });
        }

        /* ── Register Form ── */
        document.getElementById('register-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const school = document.getElementById('school').value.trim();
            const pass = document.getElementById('createPass').value;
            const conf = document.getElementById('confirmPass').value;

            if (!name) { showMsg('reg-msg', 'error', '⚠ Please enter your full name.'); return; }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showMsg('reg-msg', 'error', '⚠ Please enter a valid email address.'); return; }
            if (!school) { showMsg('reg-msg', 'error', '⚠ Please enter your school name.'); return; }
            if (pass.length < 8) { showMsg('reg-msg', 'error', '⚠ Password must be at least 8 characters.'); return; }
            if (pass !== conf) { showMsg('reg-msg', 'error', '⚠ Passwords do not match.'); return; }
            if (localStorage.getItem('ys-user-' + email)) { showMsg('reg-msg', 'error', '⚠ This email is already registered. Please login.'); return; }

            // Save credentials
            localStorage.setItem('ys-user-' + email, JSON.stringify({ name, email, school, pass }));
            showMsg('reg-msg', 'success', '✅ Account created! Redirecting you to login…');
            this.reset();
            setTimeout(() => {
                showMsg('reg-msg', '', '');
                document.getElementById('reg-msg').className = 'form-msg';
                document.querySelectorAll('.auth-toggle-btn')[1].click();
                smoothScrollTo('Register');
                document.getElementById('loginEmail').value = email;
                document.getElementById('loginEmail').focus();
            }, 1800);
        });

        /* ── Login Form ── */
        document.getElementById('login-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const pass = document.getElementById('loginPass').value;
            const remember = document.getElementById('rememberMe').checked;

            if (!email) { showMsg('login-msg', 'error', '⚠ Please enter your email.'); return; }
            if (!pass) { showMsg('login-msg', 'error', '⚠ Please enter your password.'); return; }

            const stored = localStorage.getItem('ys-user-' + email);
            if (!stored) { showMsg('login-msg', 'error', '⚠ No account found with this email. Please register first.'); return; }
            const user = JSON.parse(stored);
            if (user.pass !== pass) { showMsg('login-msg', 'error', '⚠ Incorrect password. Please try again.'); return; }

            // Set session
            sessionStorage.setItem('ys-session', '1');
            sessionStorage.setItem('ys-user-name', user.name);
            sessionStorage.setItem('ys-user-email', user.email);
            if (remember) localStorage.setItem('ys-remember', email);

            showMsg('login-msg', 'success', '✅ Login successful! Taking you to the Quiz…');
            this.reset();
            setTimeout(() => {
                showMsg('login-msg', '', '');
                document.getElementById('login-msg').className = 'form-msg';
                updateQuizGuard();
                smoothScrollTo('Quiz');
            }, 1500);
        });

        /* ── Contact Form ── */
        document.getElementById('contact-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = '✔ Message Sent!';
            btn.disabled = true;
            setTimeout(() => { btn.textContent = orig; btn.disabled = false; this.reset(); }, 3000);
        });

        /* ══════════════════════════════════════════════════
           10.  TOGGLES
        ══════════════════════════════════════════════════ */
        // Plans Toggle
        const planToggleBtns = document.querySelectorAll('#Plans .toggle-btn');
        const gridIndiv = document.getElementById('plans-individuals');
        const gridInst = document.getElementById('plans-institutions');
        const planPill = document.querySelector('#Plans .toggle-pill');

        if (planToggleBtns.length > 0) {
            planToggleBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    planToggleBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    if (index === 0) {
                        planPill.style.transform = 'translateX(0)';
                        gridInst.style.display = 'none';
                        gridIndiv.style.display = 'grid';
                        gridIndiv.querySelectorAll('.plan-card').forEach(c => {
                            c.classList.remove('visible');
                            setTimeout(() => c.classList.add('visible'), 50);
                        });
                    } else {
                        planPill.style.transform = 'translateX(100%)';
                        gridIndiv.style.display = 'none';
                        gridInst.style.display = 'grid';
                        gridInst.querySelectorAll('.plan-card').forEach(c => {
                            c.classList.remove('visible');
                            setTimeout(() => c.classList.add('visible'), 50);
                        });
                    }
                });
            });
        }

        // Auth Toggle
        const authToggleBtns = document.querySelectorAll('.auth-toggle-btn');
        const authRegWrap = document.getElementById('auth-register-wrap');
        const authLogWrap = document.getElementById('auth-login-wrap');
        const authPill = document.querySelector('.auth-pill');

        if (authToggleBtns.length > 0) {
            authToggleBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    authToggleBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    if (index === 0) {
                        authPill.style.transform = 'translateX(0)';
                        authLogWrap.style.display = 'none';
                        authRegWrap.style.display = 'block';
                    } else {
                        authPill.style.transform = 'translateX(100%)';
                        authRegWrap.style.display = 'none';
                        authLogWrap.style.display = 'block';
                    }
                });
            });

            // Handle links pointing to Login/Register to switch tabs automatically
            document.querySelectorAll('a[href="#Login"]').forEach(link => {
                link.addEventListener('click', () => {
                    authToggleBtns[1].click();
                });
            });

            document.querySelectorAll('a[href="#Register"]').forEach(link => {
                link.addEventListener('click', () => {
                    authToggleBtns[0].click();
                });
            });
        }