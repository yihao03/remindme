const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = path.join(__dirname, '../assets/resources/education.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Split into lines for parsing
const lines = htmlContent.split('\n');

// Parse the HTML structure
const sections = [];
let currentSection = null;
let currentSubsection = null;
let currentParagraph = '';
let inList = false;
let listItems = [];

function cleanHtmlText(text) {
  return text
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp;
    .replace(/&rsquo;/g, "'") // Replace &rsquo;
    .replace(/&ndash;/g, "–") // Replace &ndash;
    .replace(/&mdash;/g, "—") // Replace &mdash;
    .replace(/&ldquo;/g, '"') // Replace &ldquo;
    .replace(/&rdquo;/g, '"') // Replace &rdquo;
    .trim();
}

function saveCurrentSubsection() {
  if (currentSubsection && currentSection) {
    currentSection.subsections.push(currentSubsection);
    currentSubsection = null;
  }
}

function saveCurrentSection() {
  saveCurrentSubsection();
  if (currentSection) {
    sections.push(currentSection);
    currentSection = null;
  }
}

for (let line of lines) {
  const trimmedLine = line.trim();

  // Skip empty lines
  if (!trimmedLine || trimmedLine === '<p>&nbsp;</p>') {
    continue;
  }

  // Check for section headers (h1)
  if (trimmedLine.startsWith('<h1>')) {
    saveCurrentSection();
    const title = cleanHtmlText(trimmedLine);
    currentSection = {
      title: title,
      subsections: []
    };
    continue;
  }

  // Check for subsection headers (h3 with <u>)
  if (trimmedLine.startsWith('<h3>') || (trimmedLine.startsWith('<p>') && trimmedLine.includes('<strong><u>'))) {
    saveCurrentSubsection();
    const title = cleanHtmlText(trimmedLine);
    if (title) {
      currentSubsection = {
        title: title,
        content: []
      };
    }
    continue;
  }

  // Check for bold headers within paragraphs
  if (trimmedLine.startsWith('<p><strong>') && !trimmedLine.includes('<u>')) {
    const text = cleanHtmlText(trimmedLine);
    if (text && currentSubsection) {
      // Check if it's a standalone header or has content
      if (trimmedLine.endsWith('</strong></p>')) {
        currentSubsection.content.push({
          type: 'header',
          text: text
        });
      } else {
        currentSubsection.content.push({
          type: 'paragraph',
          text: text
        });
      }
    } else if (text && currentSection) {
      if (!currentSubsection) {
        currentSubsection = {
          title: 'Introduction',
          content: []
        };
      }
      currentSubsection.content.push({
        type: 'paragraph',
        text: text
      });
    }
    continue;
  }

  // Check for list start
  if (trimmedLine.startsWith('<ul>') || trimmedLine.startsWith('<ol>')) {
    inList = true;
    listItems = [];
    continue;
  }

  // Check for list end
  if (trimmedLine.startsWith('</ul>') || trimmedLine.startsWith('</ol>')) {
    if (listItems.length > 0 && currentSubsection) {
      currentSubsection.content.push({
        type: 'list',
        items: listItems
      });
    }
    inList = false;
    listItems = [];
    continue;
  }

  // Check for list items
  if (trimmedLine.startsWith('<li>')) {
    const text = cleanHtmlText(trimmedLine);
    if (text) {
      listItems.push(text);
    }
    continue;
  }

  // Regular paragraphs
  if (trimmedLine.startsWith('<p>')) {
    const text = cleanHtmlText(trimmedLine);
    if (text && currentSubsection) {
      // Check if it's a link
      if (line.includes('<a href=')) {
        const urlMatch = line.match(/href="([^"]+)"/);
        if (urlMatch) {
          currentSubsection.content.push({
            type: 'link',
            url: urlMatch[1],
            text: text || urlMatch[1]
          });
        }
      } else {
        currentSubsection.content.push({
          type: 'paragraph',
          text: text
        });
      }
    } else if (text && currentSection) {
      if (!currentSubsection) {
        currentSubsection = {
          title: 'Introduction',
          content: []
        };
      }
      currentSubsection.content.push({
        type: 'paragraph',
        text: text
      });
    }
    continue;
  }

  // Check for tables
  if (trimmedLine.startsWith('<table>')) {
    // Simple table marker - you can enhance this to parse table contents
    if (currentSubsection) {
      currentSubsection.content.push({
        type: 'table',
        note: 'Table content - see HTML for details'
      });
    }
    continue;
  }
}

// Save the last section
saveCurrentSection();

// Create the final JSON structure
const output = {
  title: "Dementia Education and Caregiving Guide",
  description: "A comprehensive guide covering dementia types, caregiving essentials, and self-care for caregivers in Malaysia",
  lastUpdated: "2025-01-15",
  sections: sections
};

// Write to JSON file
const outputPath = path.join(__dirname, '../assets/resources/education.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

console.log('Successfully parsed HTML and generated education.json');
console.log(`Total sections: ${sections.length}`);
sections.forEach((section, idx) => {
  console.log(`  ${idx + 1}. ${section.title} (${section.subsections.length} subsections)`);
});
