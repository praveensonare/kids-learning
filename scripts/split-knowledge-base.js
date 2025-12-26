const fs = require('fs');
const path = require('path');

const knowledgebaseDir = path.join(__dirname, '../knowledgebase');

// Get all txt files
const files = fs.readdirSync(knowledgebaseDir).filter(f => f.endsWith('.txt'));

files.forEach(filename => {
  const filePath = path.join(knowledgebaseDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Extract subject info
  const baseFilename = filename.replace('.txt', '');
  const title = lines[0]?.trim() || '';

  // Find learning objectives
  const objectivesStart = lines.findIndex(line => line.includes('Learning Objectives:'));
  let learningObjectives = [];
  if (objectivesStart !== -1) {
    let i = objectivesStart + 1;
    while (i < lines.length && lines[i].trim().startsWith('-')) {
      learningObjectives.push(lines[i].trim());
      i++;
    }
  }

  // Extract topics
  const topicPattern = /^TOPIC (\d+):\s*(.+)$/;
  const topics = [];
  let currentTopicContent = [];
  let currentTopicNumber = null;
  let currentTopicTitle = '';
  let captureContent = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(topicPattern);

    if (match) {
      // Save previous topic
      if (currentTopicNumber !== null && currentTopicContent.length > 0) {
        topics.push({
          number: currentTopicNumber,
          title: currentTopicTitle,
          content: currentTopicContent.join('\n')
        });
      }

      // Start new topic
      currentTopicNumber = parseInt(match[1]);
      currentTopicTitle = match[2].trim();
      currentTopicContent = [line]; // Include the TOPIC line
      captureContent = true;
    } else if (captureContent) {
      // Check if we hit Sample Activities or Assessment Ideas
      if (line.includes('Sample Activities:') || line.includes('Assessment Ideas:')) {
        captureContent = false;
        // Save current topic
        if (currentTopicNumber !== null && currentTopicContent.length > 0) {
          topics.push({
            number: currentTopicNumber,
            title: currentTopicTitle,
            content: currentTopicContent.join('\n')
          });
          currentTopicNumber = null;
          currentTopicContent = [];
        }
      } else {
        currentTopicContent.push(line);
      }
    }
  }

  // Save last topic
  if (currentTopicNumber !== null && currentTopicContent.length > 0) {
    topics.push({
      number: currentTopicNumber,
      title: currentTopicTitle,
      content: currentTopicContent.join('\n')
    });
  }

  if (topics.length === 0) {
    console.log(`No topics found in ${filename}, skipping...`);
    return;
  }

  // Create index file
  let indexContent = `${title}\n\n`;
  indexContent += 'Learning Objectives:\n';
  indexContent += learningObjectives.join('\n') + '\n\n';
  indexContent += 'Topics:\n\n';

  topics.forEach(topic => {
    indexContent += `TOPIC ${topic.number}: ${topic.title}\n`;
  });

  fs.writeFileSync(filePath, indexContent, 'utf-8');
  console.log(`Created index: ${filename}`);

  // Create separate topic files
  topics.forEach(topic => {
    const topicFilename = `${baseFilename}_topic${topic.number}.txt`;
    const topicFilePath = path.join(knowledgebaseDir, topicFilename);

    let topicFileContent = `${title}\n`;
    topicFileContent += `TOPIC ${topic.number}: ${topic.title}\n\n`;
    topicFileContent += topic.content.split('\n').slice(1).join('\n'); // Remove first line (TOPIC header) since we added it above

    fs.writeFileSync(topicFilePath, topicFileContent, 'utf-8');
    console.log(`  Created topic file: ${topicFilename}`);
  });
});

console.log('\nKnowledge base restructuring complete!');
