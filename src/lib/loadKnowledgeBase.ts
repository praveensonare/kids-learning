import fs from 'fs';
import path from 'path';

export interface Topic {
  id: string;
  number: number;
  title: string;
  fullContent: string;
  theory?: string;
  examples?: string;
  worksheets?: string;
}

export interface KnowledgeBaseContent {
  title: string;
  learningObjectives: string[];
  keyTopics: string[];
  activities: string[];
  funFacts: string[];
  tips: string[];
  topics: Topic[];
}

export async function loadKnowledgeBase(
  classId: string,
  subjectId: string
): Promise<KnowledgeBaseContent | null> {
  try {
    // Map class IDs to file naming convention
    const classMap: Record<string, string> = {
      'nursery': 'nursery',
      'reception': 'reception',
      'year-1': 'year1',
      'year-2': 'year2',
      'year-3': 'year3',
      'year-4': 'year4',
      'year-5': 'year5',
      'year-6': 'year6',
    };

    // Map subject IDs to file naming convention
    const subjectMap: Record<string, string> = {
      'literacy': 'literacy',
      'numeracy': 'numeracy',
      'english': 'english',
      'maths': 'maths',
      'science': 'science',
      'art': 'art',
      'history': 'history',
      'geography': 'geography',
    };

    const className = classMap[classId];
    const subjectName = subjectMap[subjectId];

    if (!className || !subjectName) {
      return null;
    }

    const fileName = `${className}_${subjectName}.txt`;
    const filePath = path.join(process.cwd(), 'knowledgebase', fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse the content
    const lines = content.split('\n');
    const parsedContent: KnowledgeBaseContent = {
      title: '',
      learningObjectives: [],
      keyTopics: [],
      activities: [],
      funFacts: [],
      tips: [],
      topics: [],
    };

    // Extract title (first line)
    if (lines.length > 0) {
      parsedContent.title = lines[0].trim();
    }

    // Extract learning objectives
    const objectivesStart = lines.findIndex(line => line.includes('Learning Objectives:'));
    if (objectivesStart !== -1) {
      let i = objectivesStart + 1;
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        parsedContent.learningObjectives.push(lines[i].replace(/^-\s*/, '').trim());
        i++;
      }
    }

    // Extract topic list from index file
    const topicPattern = /^TOPIC (\d+):\s*(.+)$/;
    const topicsStart = lines.findIndex(line => line.includes('Topics:'));

    if (topicsStart !== -1) {
      for (let i = topicsStart + 1; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(topicPattern);

        if (match) {
          const topicNumber = parseInt(match[1]);
          const topicTitle = match[2].trim();
          const topicId = topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

          // Read individual topic file
          const topicFilename = `${className}_${subjectName}_topic${topicNumber}.txt`;
          const topicFilePath = path.join(process.cwd(), 'knowledgebase', topicFilename);

          let theory = '';
          let examples = '';
          let worksheets = '';

          if (fs.existsSync(topicFilePath)) {
            const topicContent = fs.readFileSync(topicFilePath, 'utf-8');
            const topicLines = topicContent.split('\n');

            // Parse topic content sections
            let currentSection = '';
            let sectionContent: string[] = [];

            for (const topicLine of topicLines) {
              if (topicLine.trim() === 'Theory:' || topicLine.startsWith('Theory:')) {
                if (currentSection && sectionContent.length > 0) {
                  if (currentSection === 'Theory') theory = sectionContent.join('\n');
                  else if (currentSection === 'Examples') examples = sectionContent.join('\n');
                  else if (currentSection === 'Worksheets') worksheets = sectionContent.join('\n');
                }
                currentSection = 'Theory';
                sectionContent = [];
              } else if (topicLine.trim() === 'Examples:' || topicLine.startsWith('Examples:') || topicLine.includes('Mental Strategies:') || topicLine.includes('Examples - ')) {
                if (currentSection && sectionContent.length > 0) {
                  if (currentSection === 'Theory') theory = sectionContent.join('\n');
                  else if (currentSection === 'Examples') examples = sectionContent.join('\n');
                  else if (currentSection === 'Worksheets') worksheets = sectionContent.join('\n');
                }
                currentSection = 'Examples';
                sectionContent = [];
              } else if (topicLine.trim() === 'Worksheets:' || topicLine.startsWith('Worksheets:')) {
                if (currentSection && sectionContent.length > 0) {
                  if (currentSection === 'Theory') theory = sectionContent.join('\n');
                  else if (currentSection === 'Examples') examples = sectionContent.join('\n');
                  else if (currentSection === 'Worksheets') worksheets = sectionContent.join('\n');
                }
                currentSection = 'Worksheets';
                sectionContent = [];
              } else if (currentSection && topicLine.trim()) {
                sectionContent.push(topicLine);
              }
            }

            // Save last section
            if (currentSection && sectionContent.length > 0) {
              if (currentSection === 'Theory') theory = sectionContent.join('\n');
              else if (currentSection === 'Examples') examples = sectionContent.join('\n');
              else if (currentSection === 'Worksheets') worksheets = sectionContent.join('\n');
            }
          }

          parsedContent.topics.push({
            id: topicId,
            number: topicNumber,
            title: topicTitle,
            fullContent: '',
            theory: theory.trim(),
            examples: examples.trim(),
            worksheets: worksheets.trim(),
          });
        }
      }
    }

    // Extract sample activities
    const activitiesStart = lines.findIndex(line => line.includes('Sample Activities:'));
    if (activitiesStart !== -1) {
      let i = activitiesStart + 1;
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        parsedContent.activities.push(lines[i].replace(/^-\s*/, '').trim());
        i++;
      }
    }

    // Generate fun facts and tips
    if (parsedContent.topics.length > 0) {
      parsedContent.funFacts.push(
        `Explore ${parsedContent.topics.length} exciting topics in this subject!`
      );
    }

    parsedContent.tips.push(
      'Take your time and practice regularly to master these concepts!'
    );

    return parsedContent;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return null;
  }
}
