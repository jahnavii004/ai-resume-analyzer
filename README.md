# 📄 Smart Resume Analyzer for Students

An intelligent web application that analyzes student resumes and provides instant feedback based on job role requirements.

## ✨ Features

### Frontend Features
- **Clean, Modern UI** - Built with Tailwind CSS for responsive design
- **PDF Upload** - Drag & drop or click to upload resume
- **Multiple Job Roles** - Support for 6 different tech roles:
  - Software Engineer (SDE)
  - Data Analyst
  - Backend Developer
  - Frontend Developer
  - Full Stack Developer
  - DevOps Engineer

### Analysis Features
- **Overall Score** - Comprehensive resume rating (0-100)
- **Skills Match Percentage** - How well your skills align with job requirements
- **ATS Compatibility Score** - Resume parser friendliness
- **Skills Breakdown** - Visual chart showing different metrics
- **Present vs Missing Skills** - Clear categorization with badges
- **Actionable Recommendations** - Personalized suggestions to improve

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **Vanilla JavaScript** - No heavy frameworks
- **Chart.js** - Interactive data visualization
- **PDF.js** - Client-side PDF parsing

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup needed - runs completely client-side!

### Installation

1. **Download the files**
   - Save `index.html` and `app.js` to the same folder

2. **Open the application**
   - Double-click `index.html` or
   - Open it in your browser

That's it! The app runs entirely in your browser.

## 📖 How to Use

1. **Select Your Target Job Role**
   - Click on one of the 6 job role buttons
   - Each role has specific skill requirements

2. **Upload Your Resume**
   - Click the upload area or drag & drop your PDF resume
   - Maximum file size: 5MB
   - Only PDF format supported

3. **Analyze**
   - Click "Analyze Resume" button
   - Wait 1-2 seconds for processing

4. **Review Results**
   - Check your overall score
   - See which skills you have
   - Note missing skills to add
   - Read personalized recommendations
   - View visual breakdown chart

5. **Start Over**
   - Click "New Analysis" to analyze another resume

## 🎯 How It Works

### PDF Text Extraction
- Uses PDF.js to extract text from uploaded resume
- Parses all pages and combines content

### Skill Matching Algorithm
```javascript
1. Extract text from PDF
2. Convert to lowercase for matching
3. Search for required skills (weighted 70%)
4. Search for preferred skills (weighted 30%)
5. Calculate match percentage
6. Generate ATS score based on:
   - Keyword density
   - Number of relevant skills
   - Resume formatting
```

### Scoring System
- **Overall Score**: Weighted combination of required skills (70%) + all skills (30%)
- **Skills Match**: Percentage of total skills found
- **ATS Score**: Automated resume parser compatibility

## 📊 Job Role Skill Requirements

### Software Engineer (SDE)
**Required**: Python, Java, C++, JavaScript, Data Structures, Algorithms, Git, Problem Solving  
**Preferred**: React, Node.js, SQL, REST API, Docker, Linux, Testing, Agile

### Data Analyst
**Required**: Python, SQL, Excel, Data Visualization, Statistics, Tableau, Power BI  
**Preferred**: R, Machine Learning, Pandas, NumPy, ETL, Dashboard, Analytics, Business Intelligence

### Backend Developer
**Required**: Java, Python, Node.js, SQL, REST API, Database, Server, Git  
**Preferred**: Spring Boot, Django, Express, PostgreSQL, MongoDB, Redis, Microservices, Docker

### Frontend Developer
**Required**: HTML, CSS, JavaScript, React, Responsive Design, Git, UI/UX  
**Preferred**: TypeScript, Vue, Angular, Tailwind, Webpack, Testing, Accessibility, Performance

### Full Stack Developer
**Required**: JavaScript, React, Node.js, SQL, REST API, Git, HTML, CSS  
**Preferred**: TypeScript, MongoDB, Express, Docker, AWS, CI/CD, Testing, Agile

### DevOps Engineer
**Required**: Linux, Docker, Kubernetes, CI/CD, Git, Scripting, Cloud, Monitoring  
**Preferred**: AWS, Azure, Jenkins, Terraform, Ansible, Python, Bash, Networking

## 🎨 UI Components

- **Gradient Header** - Purple gradient design
- **Role Selection Cards** - Interactive hover effects
- **Upload Area** - Drag & drop with visual feedback
- **Circular Progress** - Animated score display
- **Skill Badges** - Color-coded (green = present, red = missing)
- **Bar Chart** - Visual comparison of scores
- **Recommendation Cards** - Icon-based suggestions

## 🔧 Customization

### Adding New Job Roles
Edit `app.js` and add to `jobRoleSkills` object:
```javascript
'Your Role': {
    required: ['Skill1', 'Skill2', ...],
    preferred: ['Skill3', 'Skill4', ...]
}
```

### Changing Colors
Modify Tailwind classes in `index.html`:
- Primary color: `purple-*` classes
- Success: `green-*`
- Warning: `red-*`

### Adjusting Scoring Weights
In `analyzeSkills()` function:
```javascript
const overallScore = Math.round(
    (requiredFound / roleSkills.required.length) * 70 +  // Change 70
    (skillsMatchPercent * 0.3)  // Change 0.3
);
```

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔒 Privacy

- **100% Client-Side** - All processing happens in your browser
- **No Data Upload** - Your resume never leaves your device
- **No Server Required** - No backend, no database
- **No Tracking** - Zero analytics or data collection

## 🚧 Limitations

- PDF parsing accuracy depends on PDF structure
- Text-based matching (doesn't understand context)
- Skills must match exact keywords (case-insensitive)
- Image-based PDFs won't work (needs text layer)

## 🎓 For Students

### Tips for Better Scores
1. Use keywords from job descriptions
2. Include specific technologies and tools
3. Quantify achievements with numbers
4. Use action verbs (developed, implemented, designed)
5. Keep formatting clean and ATS-friendly
6. Add relevant certifications and courses

### Recommended Resume Structure
- Contact Information
- Summary/Objective
- Education
- Technical Skills (list format)
- Projects (with tech stack)
- Experience (if any)
- Certifications

## 🤝 Contributing

Feel free to customize and extend this project:
- Add more job roles
- Improve skill detection algorithm
- Add synonym matching
- Include section-specific analysis
- Add export/print functionality

## 📄 License

Free to use for educational purposes.

## 🙏 Acknowledgments

- Tailwind CSS for styling
- Chart.js for visualizations
- PDF.js from Mozilla for PDF parsing
- Students everywhere trying to land their dream jobs!

---

**Made with ❤️ for students by students**