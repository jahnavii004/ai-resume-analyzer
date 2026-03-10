// Configure PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Global variables
let selectedJobRole = null;
let uploadedFile = null;
let resumeText = '';

// Job role skill requirements
const jobRoleSkills = {
    'SDE': {
        required: ['Python', 'Java', 'C++', 'JavaScript', 'Data Structures', 'Algorithms', 'Git', 'Problem Solving'],
        preferred: ['React', 'Node.js', 'SQL', 'REST API', 'Docker', 'Linux', 'Testing', 'Agile']
    },
    'Data Analyst': {
        required: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Statistics', 'Tableau', 'Power BI'],
        preferred: ['R', 'Machine Learning', 'Pandas', 'NumPy', 'ETL', 'Dashboard', 'Analytics', 'Business Intelligence']
    },
    'Backend': {
        required: ['Java', 'Python', 'Node.js', 'SQL', 'REST API', 'Database', 'Server', 'Git'],
        preferred: ['Spring Boot', 'Django', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Microservices', 'Docker']
    },
    'Frontend': {
        required: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design', 'Git', 'UI/UX'],
        preferred: ['TypeScript', 'Vue', 'Angular', 'Tailwind', 'Webpack', 'Testing', 'Accessibility', 'Performance']
    },
    'Full Stack': {
        required: ['JavaScript', 'React', 'Node.js', 'SQL', 'REST API', 'Git', 'HTML', 'CSS'],
        preferred: ['TypeScript', 'MongoDB', 'Express', 'Docker', 'AWS', 'CI/CD', 'Testing', 'Agile']
    },
    'DevOps': {
        required: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Scripting', 'Cloud', 'Monitoring'],
        preferred: ['AWS', 'Azure', 'Jenkins', 'Terraform', 'Ansible', 'Python', 'Bash', 'Networking']
    }
};

// Role selection
function selectRole(role) {
    selectedJobRole = role;
    document.getElementById('selectedRole').textContent = role;
    
    // Update button styles
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('border-purple-500', 'bg-purple-50', 'font-semibold');
        btn.classList.add('border-gray-300');
    });
    
    const selectedBtn = document.querySelector(`[data-role="${role}"]`);
    selectedBtn.classList.remove('border-gray-300');
    selectedBtn.classList.add('border-purple-500', 'bg-purple-50', 'font-semibold');
    
    checkAnalyzeButtonState();
}

// File upload handling
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('resumeFile');

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

function handleFile(file) {
    if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
    }
    
    uploadedFile = file;
    
    // Update UI
    document.getElementById('uploadPlaceholder').classList.add('hidden');
    document.getElementById('fileInfo').classList.remove('hidden');
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = `${(file.size / 1024).toFixed(2)} KB`;
    
    checkAnalyzeButtonState();
}

function checkAnalyzeButtonState() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (selectedJobRole && uploadedFile) {
        analyzeBtn.disabled = false;
    } else {
        analyzeBtn.disabled = true;
    }
}

// PDF text extraction
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
    }
    
    return fullText;
}

// Analyze resume
async function analyzeResume() {
    console.log("🔥 ANALYZE BUTTON CLICKED");

    if (!uploadedFile || !selectedJobRole) {
        alert("Upload resume & select role first");
        return;
    }

    document.getElementById('loadingIndicator').classList.remove('hidden');
    document.getElementById('analyzeBtn').disabled = true;

    const formData = new FormData();
    formData.append('resume', uploadedFile);
    formData.append('role', selectedJobRole);

    try {
        const response = await fetch('https://ai-resume-analyzer-api-lkbp.onrender.com/api/analyze', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error:", errorText);
            alert("Backend error occurred");
            return;
        }

        const analysis = await response.json();
        console.log("✅ Analysis received:", analysis);

        displayResults(analysis);

        document.getElementById('uploadSection').classList.add('hidden');
        document.getElementById('resultsSection').classList.remove('hidden');

    } catch (err) {
        console.error("Connection error:", err);
        alert("Cannot connect to backend. Make sure backend is running on port 5000.");
    } finally {
        document.getElementById('loadingIndicator').classList.add('hidden');
        document.getElementById('analyzeBtn').disabled = false;
    }
}




function analyzeSkills(text, role) {
    const textLower = text.toLowerCase();
    const roleSkills = jobRoleSkills[role];
    
    const allSkills = [...roleSkills.required, ...roleSkills.preferred];
    const presentSkills = [];
    const missingSkills = [];
    
    // Check for skills in resume text
    allSkills.forEach(skill => {
        const skillLower = skill.toLowerCase();
        if (textLower.includes(skillLower)) {
            presentSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }
    });
    
    // Calculate scores
    const requiredFound = roleSkills.required.filter(skill => 
        presentSkills.includes(skill)
    ).length;
    
    const skillsMatchPercent = Math.round((presentSkills.length / allSkills.length) * 100);
    const overallScore = Math.round(
        (requiredFound / roleSkills.required.length) * 70 + 
        (skillsMatchPercent * 0.3)
    );
    
    // ATS score based on keyword density and formatting
    const wordCount = text.split(/\s+/).length;
    const keywordDensity = (presentSkills.length / wordCount) * 1000;
    const atsScore = Math.max(100, Math.round(50 + keywordDensity * 10 + (presentSkills.length * 2)));
    
    // Generate suggestions
    const suggestions = generateSuggestions(presentSkills, missingSkills, roleSkills, overallScore);
    
    return {
        overallScore,
        skillsMatchPercent,
        atsScore,
        presentSkills,
        missingSkills,
        requiredFound,
        totalRequired: roleSkills.required.length,
        suggestions
    };
}

function generateSuggestions(present, missing, roleSkills, score) {
    const suggestions = [];
    
    // Check missing required skills
    const missingRequired = roleSkills.required.filter(skill => !present.includes(skill));
    if (missingRequired.length > 0) {
        suggestions.push({
            type: 'critical',
            text: `Add these required skills: ${missingRequired.slice(0, 3).join(', ')}${missingRequired.length > 3 ? '...' : ''}`
        });
    }
    
    // General suggestions based on score
    if (score < 50) {
        suggestions.push({
            type: 'warning',
            text: 'Your resume needs significant improvement. Focus on adding relevant technical skills and projects.'
        });
    } else if (score < 70) {
        suggestions.push({
            type: 'info',
            text: 'Good foundation! Add more relevant projects and certifications to strengthen your profile.'
        });
    } else {
        suggestions.push({
            type: 'success',
            text: 'Excellent resume! Consider adding links to your GitHub, portfolio, or LinkedIn for better visibility.'
        });
    }
    
    // Specific recommendations
    if (!present.includes('Git') && !present.includes('GitHub')) {
        suggestions.push({
            type: 'info',
            text: 'Add version control experience (Git/GitHub) with links to your repositories.'
        });
    }
    
    if (missing.length > 5) {
        suggestions.push({
            type: 'info',
            text: `Consider learning these in-demand skills: ${missing.slice(0, 4).join(', ')}`
        });
    }
    
    suggestions.push({
        type: 'info',
        text: 'Use action verbs (developed, implemented, optimized) to describe your accomplishments.'
    });
    
    suggestions.push({
        type: 'info',
        text: 'Quantify your achievements with metrics (e.g., "Improved performance by 40%").'
    });
    
    return suggestions;
}

function displayResults(analysis) {
    // Overall score with animation
    const scoreCircle = document.getElementById('scoreCircle');
    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (analysis.overallScore / 100) * circumference;
    
    setTimeout(() => {
        scoreCircle.style.strokeDashoffset = offset;
        animateNumber('overallScore', 0, analysis.overallScore, 1500);
    }, 100);
    
    // Skills match
    animateNumber('skillsMatch', 0, analysis.skillsMatchPercent, 1500, '%');
    document.getElementById('skillsMatchDetail').textContent = 
        `${analysis.presentSkills.length} of ${analysis.presentSkills.length + analysis.missingSkills.length} skills found`;
    
    // ATS score
    animateNumber('atsScore', 0, analysis.atsScore, 1500, '%');
    
    // Display skills
    const presentSkillsDiv = document.getElementById('presentSkills');
    presentSkillsDiv.innerHTML = analysis.presentSkills.length > 0 
        ? analysis.presentSkills.map(skill => 
            `<span class="skill-badge skill-present">${skill}</span>`
          ).join('')
        : '<p class="text-gray-500">No matching skills found</p>';
    
    const missingSkillsDiv = document.getElementById('missingSkills');
    missingSkillsDiv.innerHTML = analysis.missingSkills.length > 0
        ? analysis.missingSkills.map(skill => 
            `<span class="skill-badge skill-missing">${skill}</span>`
          ).join('')
        : '<p class="text-gray-500">All skills present!</p>';
    
    // Display suggestions
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = analysis.suggestions.map(suggestion => {
        const icons = {
            critical: '🔴',
            warning: '⚠️',
            info: 'ℹ️',
            success: '✅'
        };
        return `<li class="flex items-start">
            <span class="mr-2">${icons[suggestion.type]}</span>
            <span class="text-gray-700">${suggestion.text}</span>
        </li>`;
    }).join('');
    
    // Create chart
    createSkillsChart(analysis);
}

function createSkillsChart(analysis) {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Overall Match', 'Required Skills', 'ATS Compatibility'],
            datasets: [{
                label: 'Score %',
                data: [
                    analysis.skillsMatchPercent,
                    Math.round((analysis.requiredFound / analysis.totalRequired) * 100),
                    analysis.atsScore
                ],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(34, 197, 94, 0.8)'
                ],
                borderColor: [
                    'rgb(102, 126, 234)',
                    'rgb(59, 130, 246)',
                    'rgb(34, 197, 94)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '%';
                        }
                    }
                }
            }
        }
    });
}

function animateNumber(elementId, start, end, duration, suffix = '') {
    const element = document.getElementById(elementId);
    const startTime = Date.now();
    
    function update() {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

function resetAnalyzer() {
    selectedJobRole = null;
    uploadedFile = null;
    resumeText = '';
    
    document.getElementById('selectedRole').textContent = 'None';
    document.getElementById('uploadPlaceholder').classList.remove('hidden');
    document.getElementById('fileInfo').classList.add('hidden');
    document.getElementById('analyzeBtn').disabled = true;
    
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('border-purple-500', 'bg-purple-50', 'font-semibold');
        btn.classList.add('border-gray-300');
    });
    
    fileInput.value = '';
    
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('uploadSection').classList.remove('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}