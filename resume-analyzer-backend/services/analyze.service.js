function analyzeSkills(text, role) {

    const jobRoleSkills = {
        'SDE': {
            required: ['Python', 'Java', 'C++', 'JavaScript', 'Data Structures', 'Algorithms', 'Git', 'Problem Solving'],
            preferred: ['React', 'Node.js', 'SQL', 'REST API', 'Docker', 'Linux', 'Testing', 'Agile']
        },
        'Data Analyst': {
            required: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Statistics', 'Tableau', 'Power BI'],
            preferred: ['R', 'Machine Learning', 'Pandas', 'NumPy']
        },
        'Backend': {
            required: ['Java', 'Python', 'Node.js', 'SQL', 'REST API', 'Database', 'Server', 'Git'],
            preferred: ['Spring Boot', 'Django', 'Express', 'MongoDB']
        },
        "Frontend": {
      required: ['HTML','CSS','JavaScript','React','Responsive Design','Git','UI/UX'],
      preferred: ['TypeScript','Vue','Angular','Tailwind','Webpack','Testing','Accessibility','Performance']
  },

  "Full Stack": {
      required: ['JavaScript','React','Node.js','SQL','REST API','Git','HTML','CSS'],
      preferred: ['TypeScript','MongoDB','Express','Docker','AWS','CI/CD','Testing','Agile']
  },

  "DevOps": {
      required: ['Linux','Docker','Kubernetes','CI/CD','Git','Scripting','Cloud','Monitoring'],
      preferred: ['AWS','Azure','Jenkins','Terraform','Ansible','Python','Bash','Networking']
  }
    };

    const textLower = text.toLowerCase();
    const roleSkills = jobRoleSkills[role];

    if (!roleSkills) {
        return { error: "Invalid role selected" };
    }

    const allSkills = [...roleSkills.required, ...roleSkills.preferred];
    const presentSkills = [];
    const missingSkills = [];

    allSkills.forEach(skill => {
        if (textLower.includes(skill.toLowerCase())) {
            presentSkills.push(skill);
        } else {
            missingSkills.push(skill);
        }
    });

    const requiredFound = roleSkills.required.filter(skill =>
        presentSkills.includes(skill)
    ).length;

    const skillsMatchPercent = Math.round((presentSkills.length / allSkills.length) * 100);

    const overallScore = Math.round(
        (requiredFound / roleSkills.required.length) * 70 +
        (skillsMatchPercent * 0.3)
    );

    const atsScore = Math.min(100, overallScore + 10);

    return {
        overallScore,
        skillsMatchPercent,
        atsScore,
        presentSkills,
        missingSkills,
        requiredFound,
        totalRequired: roleSkills.required.length,
        suggestions: []
    };
}

module.exports = { analyzeSkills };