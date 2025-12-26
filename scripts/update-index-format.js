const fs = require('fs');
const path = require('path');

const knowledgebaseDir = path.join(__dirname, '../knowledgebase');

// Get all index files (not topic files)
const files = fs.readdirSync(knowledgebaseDir)
  .filter(f => f.endsWith('.txt') && !f.includes('_topic'));

files.forEach(filename => {
  const filePath = path.join(knowledgebaseDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const baseFilename = filename.replace('.txt', '');
  const title = lines[0]?.trim() || '';

  // Extract learning objectives
  const objectivesStart = lines.findIndex(line => line.includes('Learning Objectives:'));
  let learningObjectives = [];
  if (objectivesStart !== -1) {
    let i = objectivesStart + 1;
    while (i < lines.length && lines[i].trim().startsWith('-')) {
      learningObjectives.push(lines[i].trim());
      i++;
    }
  }

  // Find existing topics
  const topicPattern = /^TOPIC (\d+):\s*(.+)$/;
  const topics = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(topicPattern);
    if (match) {
      const topicNumber = parseInt(match[1]);
      const topicTitle = match[2].trim();

      // Try to read the topic file to get a better description
      const topicFilename = `${baseFilename}_topic${topicNumber}.txt`;
      const topicFilePath = path.join(knowledgebaseDir, topicFilename);

      let description = `Learn about ${topicTitle.toLowerCase()}`;

      if (fs.existsSync(topicFilePath)) {
        const topicContent = fs.readFileSync(topicFilePath, 'utf-8');
        const topicLines = topicContent.split('\n');

        // Try to extract first theory line as description
        const theoryStart = topicLines.findIndex(l => l.trim() === 'Theory:' || l.startsWith('Theory:'));
        if (theoryStart !== -1 && theoryStart + 1 < topicLines.length) {
          let theoryLine = topicLines[theoryStart + 1].trim();
          // Clean up the theory line to make it a description
          if (theoryLine.length > 120) {
            theoryLine = theoryLine.substring(0, 120).trim();
            // Find last complete word
            const lastSpace = theoryLine.lastIndexOf(' ');
            if (lastSpace > 0) {
              theoryLine = theoryLine.substring(0, lastSpace);
            }
          }
          if (theoryLine) {
            description = theoryLine;
          }
        }
      }

      topics.push({
        number: topicNumber,
        title: topicTitle,
        description: description
      });
    }
  }

  // Skip if no topics found
  if (topics.length === 0) {
    console.log(`No topics found in ${filename}, skipping...`);
    return;
  }

  // Create new index content
  let newContent = `${title}\n\n`;
  newContent += 'Learning Objectives:\n';
  newContent += learningObjectives.join('\n') + '\n\n';
  newContent += 'Topics:\n\n';

  topics.forEach(topic => {
    newContent += `${topic.number}, ${topic.title}, ${topic.description}\n`;
  });

  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Updated: ${filename} (${topics.length} topics)`);
});

console.log('\nIndex files updated successfully!');
