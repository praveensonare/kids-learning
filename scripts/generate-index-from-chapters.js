const fs = require('fs');
const path = require('path');

const knowledgeBasePath = path.join(__dirname, '..', 'knowledgebase');

// Function to extract chapter info from a chapter file
function extractChapterInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Extract chapter number and title from first line
    // Format: "Subject - Chapter N: Chapter Title"
    const firstLine = lines[0].trim();
    const chapterMatch = firstLine.match(/Chapter (\d+):\s*(.+)$/);

    if (!chapterMatch) {
      return null;
    }

    const chapterNumber = parseInt(chapterMatch[1]);
    const chapterTitle = chapterMatch[2].trim();

    // Extract all topic titles
    const topics = [];
    const topicPattern = /^TOPIC \d+:\s*(.+)$/;

    for (const line of lines) {
      const topicMatch = line.match(topicPattern);
      if (topicMatch) {
        topics.push(topicMatch[1].trim());
      }
    }

    return {
      number: chapterNumber,
      title: chapterTitle,
      topics: topics
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Function to extract learning objectives from existing index file if it exists
function extractLearningObjectives(indexPath) {
  if (!fs.existsSync(indexPath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(indexPath, 'utf-8');
    const lines = content.split('\n');
    const objectives = [];

    const objectivesStart = lines.findIndex(line => line.includes('Learning Objectives:'));
    if (objectivesStart !== -1) {
      let i = objectivesStart + 1;
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        objectives.push(lines[i].replace(/^-\s*/, '').trim());
        i++;
      }
    }

    return objectives;
  } catch (error) {
    return [];
  }
}

// Function to extract subject title from existing index or first chapter file
function extractSubjectTitle(subjectKey, firstChapterPath) {
  // Try to get from existing index file first
  const indexPath = path.join(knowledgeBasePath, `${subjectKey}.txt`);

  if (fs.existsSync(indexPath)) {
    try {
      const content = fs.readFileSync(indexPath, 'utf-8');
      const lines = content.split('\n');
      if (lines.length > 0 && lines[0].trim()) {
        return lines[0].trim();
      }
    } catch (error) {
      // Continue to extract from chapter file
    }
  }

  // Extract from first chapter file
  if (firstChapterPath && fs.existsSync(firstChapterPath)) {
    try {
      const content = fs.readFileSync(firstChapterPath, 'utf-8');
      const lines = content.split('\n');
      if (lines.length > 0) {
        // Format: "Subject - Chapter N: Title"
        const match = lines[0].match(/^(.+?)\s*-\s*Chapter/);
        if (match) {
          return match[1].trim() + ' - Cambridge Primary Curriculum';
        }
      }
    } catch (error) {
      // Will use default
    }
  }

  // Default fallback
  const parts = subjectKey.split('_');
  const className = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const subjectName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
  return `${className} ${subjectName} - Cambridge Primary Curriculum`;
}

// Scan all chapter files and group by subject
function scanChapterFiles() {
  const files = fs.readdirSync(knowledgeBasePath);
  const subjectData = {};

  // Pattern: {class}_{subject}_chapter{N}.txt
  const chapterPattern = /^(.+)_chapter(\d+)\.txt$/;

  for (const file of files) {
    const match = file.match(chapterPattern);
    if (match) {
      const subjectKey = match[1]; // e.g., "nursery_literacy"
      const chapterNum = parseInt(match[2]);
      const filePath = path.join(knowledgeBasePath, file);

      // Extract chapter information
      const chapterInfo = extractChapterInfo(filePath);

      if (chapterInfo) {
        if (!subjectData[subjectKey]) {
          subjectData[subjectKey] = {
            chapters: [],
            firstChapterPath: filePath
          };
        }

        subjectData[subjectKey].chapters.push(chapterInfo);
      }
    }
  }

  // Sort chapters by number for each subject
  for (const subjectKey in subjectData) {
    subjectData[subjectKey].chapters.sort((a, b) => a.number - b.number);
  }

  return subjectData;
}

// Generate index file content
function generateIndexFile(subjectKey, data) {
  const indexPath = path.join(knowledgeBasePath, `${subjectKey}.txt`);

  // Get title
  const title = extractSubjectTitle(subjectKey, data.firstChapterPath);

  // Get learning objectives (preserve from existing or use defaults)
  let objectives = extractLearningObjectives(indexPath);

  if (objectives.length === 0) {
    // Use generic objectives if none exist
    objectives = [
      'Develop understanding of key concepts',
      'Build foundational skills',
      'Apply knowledge through practice',
      'Demonstrate mastery of learning objectives'
    ];
  }

  // Build content
  let content = `${title}\n\n`;

  content += 'Learning Objectives:\n';
  objectives.forEach(obj => {
    content += `- ${obj}\n`;
  });

  content += '\nChapters:\n\n';

  data.chapters.forEach(chapter => {
    content += `chapter no: ${chapter.number}\n`;
    content += `name: ${chapter.title}\n`;

    // Create description from topics
    const description = chapter.topics.join(', ');
    content += `description: ${description}\n\n`;
  });

  return content;
}

// Main execution
console.log('Scanning chapter files in knowledgebase...\n');

const subjectData = scanChapterFiles();
const subjectCount = Object.keys(subjectData).length;

console.log(`Found ${subjectCount} subjects with chapter files\n`);

let generatedCount = 0;

for (const subjectKey in subjectData) {
  const data = subjectData[subjectKey];
  const indexPath = path.join(knowledgeBasePath, `${subjectKey}.txt`);

  console.log(`Generating ${subjectKey}.txt`);
  console.log(`  - ${data.chapters.length} chapters found`);

  data.chapters.forEach(chapter => {
    console.log(`    Chapter ${chapter.number}: ${chapter.title} (${chapter.topics.length} topics)`);
  });

  const indexContent = generateIndexFile(subjectKey, data);
  fs.writeFileSync(indexPath, indexContent);

  generatedCount++;
  console.log(`  ✓ Generated\n`);
}

console.log(`\n✅ Successfully generated ${generatedCount} index files from chapter content!`);
console.log('\nIndex files now reflect actual content from chapter files.');
