const jobRoles = {
    SDE: {
        required: ['Python', 'Java', 'C++', 'JavaScript', 'Data Structures', 'Algorithms', 'Git', 'Problem Solving'],
        preferred: ['React', 'Node.js', 'SQL', 'REST API', 'Docker', 'Linux', 'Testing', 'Agile']
    },
    'Data Analyst': {
        required: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Statistics', 'Tableau', 'Power BI'],
        preferred: ['R', 'Machine Learning', 'Pandas', 'NumPy', 'ETL', 'Dashboard', 'Analytics', 'Business Intelligence']
    },
    Backend: {
        required: ['Java', 'Python', 'Node.js', 'SQL', 'REST API', 'Database', 'Server', 'Git'],
        preferred: ['Spring Boot', 'Django', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Microservices', 'Docker']
    },
    Frontend: {
        required: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design', 'Git', 'UI/UX'],
        preferred: ['TypeScript', 'Vue', 'Angular', 'Tailwind', 'Webpack', 'Testing', 'Accessibility', 'Performance']
    },
    'Full Stack': {
        required: ['JavaScript', 'React', 'Node.js', 'SQL', 'REST API', 'Git', 'HTML', 'CSS'],
        preferred: ['TypeScript', 'MongoDB', 'Express', 'Docker', 'AWS', 'CI/CD', 'Testing', 'Agile']
    },
    DevOps: {
        required: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Scripting', 'Cloud', 'Monitoring'],
        preferred: ['AWS', 'Azure', 'Jenkins', 'Terraform', 'Ansible', 'Python', 'Bash', 'Networking']
    }
};

module.exports = jobRoles;


