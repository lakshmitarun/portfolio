import html2pdf from 'html2pdf.js'
import { convertImageToPDF } from './convertImageToPDF'

export const generateResumePDF = (portfolioData) => {
  const element = document.createElement('div')
  element.innerHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
            color: #333;
            background: white;
          }
          
          .container {
            width: 210mm;
            height: 297mm;
            padding: 15mm;
            background: white;
            margin: 0;
            font-size: 10px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 8px;
            padding-bottom: 6px;
            border-bottom: 2px solid #333;
          }
          
          .header h1 {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin-bottom: 4px;
          }
          
          .contact-info {
            font-size: 9px;
            color: #555;
            line-height: 1.3;
            margin-bottom: 2px;
          }
          
          .section {
            margin-bottom: 6px;
          }
          
          .section-title {
            font-size: 11px;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            margin-bottom: 3px;
            border-bottom: 1px solid #999;
            padding-bottom: 2px;
          }
          
          .section-content {
            font-size: 9px;
            margin-left: 0;
          }
          
          .summary {
            font-size: 9px;
            color: #333;
            line-height: 1.4;
            margin-bottom: 0;
            text-align: justify;
          }
          
          .skill-list {
            columns: 2;
            column-gap: 15px;
            margin-bottom: 0;
          }
          
          .skill-item {
            font-size: 9px;
            margin-bottom: 2px;
            break-inside: avoid;
          }
          
          .skill-item:before {
            content: "● ";
            margin-right: 4px;
          }
          
          .achievement-item {
            font-size: 9px;
            margin-bottom: 2px;
            break-inside: avoid;
          }
          
          .achievement-item:before {
            content: "● ";
            margin-right: 4px;
          }
          
          .project-item {
            font-size: 9px;
            margin-bottom: 2px;
            break-inside: avoid;
          }
          
          .project-item:before {
            content: "● ";
            margin-right: 4px;
          }
          
          .education-item {
            font-size: 9px;
            margin-bottom: 2px;
            break-inside: avoid;
          }
          
          .education-item:before {
            content: "● ";
            margin-right: 4px;
          }
          
          .declaration {
            font-size: 9px;
            text-align: center;
            margin-top: 4px;
            font-style: italic;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .container {
              margin: 0;
              padding: 15mm;
              height: auto;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header Section -->
          <div class="header">
            <h1>${portfolioData.name}</h1>
            <div class="contact-info">
              📧 ${portfolioData.email} | 📱 ${portfolioData.phone} | 📍 Kandulpalem village, Ramachandrapuram mandel, Konaseema<br>
              🔗 LinkedIn: <a href="${portfolioData.linkedin}" style="color: #0066cc;">${portfolioData.name}</a>
            </div>
          </div>
          
          <!-- Professional Summary -->
          <div class="section">
            <div class="section-title">PROFESSIONAL SUMMARY:</div>
            <div class="section-content">
              <p class="summary">${portfolioData.summary}</p>
            </div>
          </div>
          
          <!-- Skills Section -->
          <div class="section">
            <div class="section-title">TECHNIQUES SKILLS:</div>
            <div class="section-content">
              <div class="skill-list">
                ${portfolioData.skills.map(skillCategory => `
                  ${skillCategory.items.map(skill => `
                    <div class="skill-item">${skill}</div>
                  `).join('')}
                `).join('')}
              </div>
            </div>
          </div>
          
          <!-- Achievements & Certifications -->
          <div class="section">
            <div class="section-title">ACHIEVEMENTS&CERTIFICATION:</div>
            <div class="section-content">
              ${portfolioData.achievements.slice(0, 4).map(achievement => `
                <div class="achievement-item">${achievement.title}${achievement.year ? ' (' + achievement.year + ')' : ''}</div>
              `).join('')}
            </div>
          </div>
          
          <!-- Projects Section -->
          <div class="section">
            <div class="section-title">PROJECTS:</div>
            <div class="section-content">
              ${portfolioData.projects.map(project => `
                <div class="project-item">${project.title} (${project.tech.join(', ')})</div>
              `).join('')}
            </div>
          </div>
          
          <!-- Education Section -->
          <div class="section">
            <div class="section-title">EDUCATION:</div>
            <div class="section-content">
              ${portfolioData.education.map(edu => `
                <div class="education-item">${edu.degree} - ${edu.school}${edu.details ? ',' + edu.details : ''}</div>
              `).join('')}
            </div>
          </div>
          
          <!-- Declaration -->
          <div class="declaration">
            I hereby declare that the above information is true and accurate to the best of my knowledge.
          </div>
        </div>
      </body>
    </html>
  `

  const opt = {
    margin: [0, 0, 0, 0],
    filename: 'Lakshmi_Tarun_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  }

  html2pdf().set(opt).from(element).save()
  
  // Also download resume image as PDF after a short delay
  setTimeout(() => {
    convertImageToPDF('/resume-image.jpeg', 'Lakshmi_Tarun_Resume_Image.pdf')
  }, 1000)
}
